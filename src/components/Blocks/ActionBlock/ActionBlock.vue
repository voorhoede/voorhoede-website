<template>
  <div
    v-if="actions.length"
    class="action-block"
  >
    <template
      v-for="action in actions"
      :key="action.id"
    >
      <a
        v-if="action.external"
        v-bind="$attrs"
        :class="linkClasses(action.variant)"
        :href="action.href"
        :target="action.openInNewTab ? '_blank' : undefined"
        :rel="action.openInNewTab ? 'noopener noreferrer' : undefined"
        @click="trackAction(action.href)"
      >
        <span v-if="action.variant !== 'text'">{{ action.label }}</span>
        <template v-else>{{ action.label }}</template>
      </a>
      <LinkWithTrailingSlash
        v-else
        v-bind="$attrs"
        :class="linkClasses(action.variant)"
        :to="action.href"
      >
        <span v-if="action.variant !== 'text'">{{ action.label }}</span>
        <template v-else>{{ action.label }}</template>
      </LinkWithTrailingSlash>
    </template>
  </div>
</template>

<script setup lang="ts">
import { type FragmentOf, readFragment } from "~/utils/graphql";
import type { ActionBlockFragment } from "./ActionBlock.query";

defineOptions({ inheritAttrs: false });

export type ActionVariant = "primary" | "secondary" | "text";

const props = defineProps<{
  data: FragmentOf<typeof ActionBlockFragment>;
  /** Overrides CMS style on every item when set. */
  variant?: ActionVariant | null;
}>();

const data = readFragment<typeof ActionBlockFragment>(props.data);

const LinkWithTrailingSlash = defineNuxtLink({ trailingSlash: "append" });

type ResolvedAction = {
  id: string;
  label: string;
  href: string;
  external: boolean;
  openInNewTab: boolean;
  variant: ActionVariant;
};

function normalizeVariant(
  style: string | null | undefined,
): ActionVariant {
  if (style === "secondary" || style === "link") return "secondary";
  if (style === "text") return "text";
  return "primary";
}

function resolveVariant(style: string | null | undefined): ActionVariant {
  return props.variant ?? normalizeVariant(style);
}

function formatPhoneNumber(phoneNumber: string) {
  return phoneNumber.replace(/\s/g, "");
}

function emailHref(
  emailAddress: string,
  emailSubject?: string | null,
  emailBody?: string | null,
) {
  const url = new URL(`mailto:${emailAddress}`);
  const params = [
    ...(emailSubject ? [`subject=${encodeURIComponent(emailSubject)}`] : []),
    ...(emailBody ? [`body=${encodeURIComponent(emailBody)}`] : []),
  ];
  if (params.length) url.search = params.join("&");
  return url.href;
}

function phoneHref(
  action: string,
  phoneNumber: string,
  text?: string | null,
) {
  const number = formatPhoneNumber(phoneNumber);
  if (action === "sms") {
    return text
      ? `sms:${number}?body=${encodeURIComponent(text)}`
      : `sms:${number}`;
  }
  return `tel:${number}`;
}

const actions = computed((): ResolvedAction[] => {
  const resolved: ResolvedAction[] = [];

  for (const item of data.items ?? []) {
    if (item.__typename === "InternalLinkRecord") {
      resolved.push({
        id: item.id,
        label: item.title,
        href: useDatoNuxtRoute(item.link) ?? "/",
        external: false,
        openInNewTab: false,
        variant: resolveVariant(item.internalStyle),
      });
      continue;
    }

    if (item.__typename === "ExternalLinkRecord") {
      resolved.push({
        id: item.id,
        label: item.title,
        href: item.url,
        external: true,
        openInNewTab: Boolean(item.openInNewTab),
        variant: resolveVariant(item.externalStyle),
      });
      continue;
    }

    if (item.__typename === "EmailLinkRecord") {
      resolved.push({
        id: item.id,
        label: item.title,
        href: emailHref(item.emailAddress, item.emailSubject, item.emailBody),
        external: true,
        openInNewTab: false,
        variant: resolveVariant(item.emailStyle),
      });
      continue;
    }

    if (item.__typename === "PhoneLinkRecord") {
      resolved.push({
        id: item.id,
        label: item.title,
        href: phoneHref(item.action, item.phoneNumber, item.text),
        external: true,
        openInNewTab: false,
        variant: resolveVariant(item.phoneStyle),
      });
    }
  }

  return resolved;
});

function linkClasses(variant: ActionVariant) {
  if (variant === "text") return ["action-block__link", "body"];
  if (variant === "secondary") {
    return ["app-button", "body", "app-button--secondary"];
  }
  return ["app-button", "body", "app-button--primary", "font-bold"];
}

function trackAction(href: string) {
  if (href.startsWith("tel:")) {
    useTrackEvent("Click on phone number");
  }
}
</script>

<style scoped>
.action-block {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-small);
}

.action-block__link {
  text-decoration: underline;
}
</style>

<style>
.app-button--secondary > span::after {
  content: "\00a0\2192";
}
</style>
