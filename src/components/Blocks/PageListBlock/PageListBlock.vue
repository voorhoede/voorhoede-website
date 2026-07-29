<template>
  <section
    v-if="showSection"
    :id="sectionId"
    class="pages-list grid block"
  >
    <h2
      v-if="data.title"
      class="pages-list__title h1"
    >
      {{ data.title }}
    </h2>

    <div
      v-if="data.body"
      class="pages-list__body"
    >
      <StructuredText :data="data.body" />
    </div>

    <ul
      v-if="displayPages.length"
      class="pages-list__grid"
      :style="{ '--max-columns': columns }"
    >
      <li
        v-for="page in displayPages"
        :key="page.id"
      >
        <LinkCard
          :internal-link="pageListInternalLink(page)"
          :image="page.image"
          :title="page.title"
          :body="page.subtitle"
          :sizes="sizes"
        />
      </li>
    </ul>

    <pagination-nav
      v-if="totalItems > PER_PAGE"
      :total-items="totalItems"
      :current-page="currentPage"
      :per-page="PER_PAGE"
      :get-paginated-route="getPaginatedRoute"
      class="pages-list__pagination"
    />
  </section>
</template>

<script setup lang="ts">
import type { RouteLocation } from "vue-router";
import type { PageListBlockFragment } from "./PageListBlock.query";
import { PageListBlockPagesQuery } from "./PageListBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import { useFetchDatocmsContent } from "~/composables/useFetchDatocmsContent";
import StructuredText from "~/components/Core/StructuredText/StructuredText.vue";

const PER_PAGE = 20;

type PageCard = {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  image: {
    url: string;
    alt: string;
    width: number;
    height: number;
  } | null;
};

const props = defineProps<{
  data: FragmentOf<typeof PageListBlockFragment>;
  hostPageId?: string | null;
}>();

const data = readFragment<typeof PageListBlockFragment>(props.data);
const route = useRoute();
const router = useRouter();
const { $localeUrl } = useNuxtApp();

function pageListInternalLink(page: PageCard) {
  // Catch-all [...slug] needs path segments. Passing "a/b" as one string encodes
  // "/" as %2F, which prerender crawls into paths that blow Cloudflare's 100-char
  // _routes.json rule limit (Error 8000057).
  const slugParam = page.slug.includes("/")
    ? page.slug.split("/").filter(Boolean)
    : page.slug;
  return $localeUrl({ name: "slug", params: { slug: slugParam } });
}

const queryParamKey = computed(() => `pageList-${data.id}`);
const sectionId = computed(() => `page-list-${data.id}`);

const currentPage = computed(() => {
  const raw = route.query[queryParamKey.value];
  const value = Array.isArray(raw) ? raw[0] : raw;
  const parsed = value ? Number.parseInt(String(value), 10) : 1;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
});

function toPageCard(page: {
  id: string;
  title: string;
  slug: string;
  subtitle?: string | null;
  previewImage?: {
    url: string;
    alt?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
}): PageCard | null {
  if (!page.slug) return null;
  return {
    id: page.id,
    title: page.title,
    slug: page.slug,
    subtitle: page.subtitle ?? "",
    image: page.previewImage?.url
      ? {
          url: page.previewImage.url,
          alt: page.previewImage.alt ?? "",
          width: page.previewImage.width ?? 1,
          height: page.previewImage.height ?? 1,
        }
      : null,
  };
}

const pinnedPages = computed((): PageCard[] =>
  (data.pinned ?? [])
    .map(toPageCard)
    .filter((page): page is PageCard => page !== null),
);

const pinnedIds = computed(() => pinnedPages.value.map((page) => page.id));

const excludeIds = computed(() => {
  const ids = [...pinnedIds.value];
  if (props.hostPageId) ids.push(props.hostPageId);
  return [...new Set(ids)];
});

const excludeIdSet = computed(() => new Set(excludeIds.value));

const columns = computed(() => data.columns ?? 3);

const sizes = computed(() => {
  const columnWidth = Math.round(1200 / columns.value);
  const vwWidth = Math.round(100 / Math.max(1, columns.value - 1));
  return `(min-width: 1200px) ${columnWidth}px, (min-width: 800px) ${vwWidth}vw, 90vw`;
});

const fragmentTaggedPages = computed((): PageCard[] =>
  (data.tagFilter?._allReferencingPages ?? [])
    .map(toPageCard)
    .filter(
      (page): page is PageCard =>
        page !== null && !excludeIdSet.value.has(page.id),
    ),
);

const { data: pagedData } = await useAsyncData(
  () =>
    `page-list-${data.id}-${currentPage.value}-${excludeIds.value.join(",")}`,
  async () => {
    if (!data.tagFilter?.id) {
      return null;
    }

    // Page 1 uses fragment data; later pages need a follow-up with skip + excludeIds
    if (currentPage.value <= 1) {
      return null;
    }

    const result = await useFetchDatocmsContent({
      query: PageListBlockPagesQuery,
      variables: {
        tagId: data.tagFilter.id,
        locale: route.params.language as "nl" | "en",
        first: PER_PAGE,
        skip: (currentPage.value - 1) * PER_PAGE,
        excludeIds: excludeIds.value,
      },
    });

    return result.data?.tag ?? null;
  },
  { watch: [currentPage, excludeIds] },
);

const { data: filteredMeta } = await useAsyncData(
  () => `page-list-meta-${data.id}-${excludeIds.value.join(",")}`,
  async () => {
    if (!data.tagFilter?.id || excludeIds.value.length === 0) {
      return null;
    }

    const result = await useFetchDatocmsContent({
      query: PageListBlockPagesQuery,
      variables: {
        tagId: data.tagFilter.id,
        locale: route.params.language as "nl" | "en",
        first: 1,
        skip: 0,
        excludeIds: excludeIds.value,
      },
    });

    return result.data?.tag?._allReferencingPagesMeta ?? null;
  },
  { watch: [excludeIds] },
);

const taggedPages = computed((): PageCard[] => {
  if (currentPage.value > 1) {
    return (pagedData.value?._allReferencingPages ?? [])
      .map(toPageCard)
      .filter((page): page is PageCard => page !== null);
  }
  return fragmentTaggedPages.value;
});

const totalItems = computed(() => {
  if (currentPage.value > 1 && pagedData.value?._allReferencingPagesMeta) {
    return pagedData.value._allReferencingPagesMeta.count;
  }
  if (filteredMeta.value) {
    return filteredMeta.value.count;
  }
  if (data.tagFilter) {
    const total = data.tagFilter._allReferencingPagesMeta?.count ?? 0;
    return Math.max(0, total - excludeIds.value.length);
  }
  return pinnedPages.value.length;
});

const displayPages = computed((): PageCard[] => {
  if (currentPage.value === 1) {
    return [...pinnedPages.value, ...taggedPages.value];
  }
  return taggedPages.value;
});

const showSection = computed(
  () =>
    Boolean(data.title) ||
    Boolean(data.body) ||
    displayPages.value.length > 0 ||
    totalItems.value > PER_PAGE,
);

function getPaginatedRoute(pageNumber: number): RouteLocation {
  const query = { ...route.query };
  if (pageNumber >= 1) {
    query[queryParamKey.value] = String(pageNumber);
  }

  return router.resolve({
    path: route.path,
    query,
    hash: `#${sectionId.value}`,
  });
}
</script>

<style scoped>
.pages-list {
  grid-column: var(--grid-page);
}

.pages-list__grid {
  --grid-gap: var(--spacing-medium);
  --grid-item--min-width: 16rem;

  --gap-count: calc(var(--max-columns) - 1);
  --total-gap-width: calc(var(--gap-count) * var(--grid-gap));
  --grid-item--max-width: calc(
    (100% - var(--total-gap-width)) / var(--max-columns)
  );

  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr)
  );
  grid-gap: var(--grid-gap);
}

.pages-list__title {
  margin-bottom: var(--spacing-medium);
  text-align: center;
}

.pages-list__body {
  margin-bottom: var(--spacing-larger);
  margin-inline: auto;
  text-align: center;
  max-width: 40rem;
}

.pages-list .link-card {
  height: 100%;
}

.pages-list__pagination {
  margin-top: var(--spacing-larger);
  display: flex;
  justify-content: center;
}
</style>
