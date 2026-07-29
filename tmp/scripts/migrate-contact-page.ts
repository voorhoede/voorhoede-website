/**
 * Migrate REF contact (slugs-and-blocks) → TAR page contact (new-data-models).
 * REF payload embedded; source 340359 → TAR cuV2B4i9TAmnkCR9akJcCg.
 */
import type { Client } from '@datocms/cma-client-node';
import { buildBlockRecord } from '@datocms/cma-client';

const PAGE_ID = 'cuV2B4i9TAmnkCR9akJcCg';
const LOCATIONS = ['51793399', '51793404'] as const;
const EMAIL = 'post@voorhoede.nl';
const PHONE = '+31 20 2610954';
const EMAIL_IMAGE = '40411877';
const CALL_IMAGE = '40411880';

const BLOCK = {
  pageHeader: '2037668',
  textBlock: 'BSet0e3fTeWC8-a8odR7VA',
  reachOutBlock: 'ZoimmZOiR0mkjwIEXN-9Ag',
  imageGridBlock: 'VjlVydOmSp-kj5GVXeVG4g',
  imageGridItem: 'YMMwC_xjQ6qxjCepnLpPug',
  actionBlock: 'RdEUS5_JT0yu3cYRxaPVqw',
  emailLink: 'TAcLhURzReOmXoCzBBJIVw',
  phoneLink: 'PzxBO0r6Q96tjYZUbDFQZw',
  locationsList: 'YGGNy1QFS7yVRpoeaBxYTg',
} as const;

type Locale = 'en' | 'nl';

type FileValue = {
  upload_id: string;
  alt: string | null;
  title: string | null;
  custom_data: Record<string, string>;
  focal_point: { x: number; y: number } | null;
};

type StDocument = {
  schema: 'dast';
  document: {
    type: 'root';
    children: Array<{
      type: string;
      level?: number;
      children: Array<{ type: string; value?: string }>;
    }>;
  };
};

const REF = {
  title: { en: 'Contact us!', nl: 'Neem contact op!' },
  subtitle: {
    en: 'Do you have a question? Or do you like to meet us or talk about a project?',
    nl: 'Heb je een vraag? Of wil je een keer kennismaken of sparren over een project?',
  },
  social: {
    en: {
      image: null,
      title: 'Need a webapp or site? Contact us | De Voorhoede',
      no_index: false,
      description:
        'Would you like to discuss a project or meet our team in Delft or Amsterdam? Call +31 (0)20 2610 954 or send an email to post@voorhoede.nl.',
      twitter_card: 'summary' as const,
    },
    nl: {
      image: null,
      title: 'Website of applicatie nodig? Neem contact op | De Voorhoede',
      no_index: false,
      description:
        'Wil je sparren over een project of kennismaken met ons team in Delft & Amsterdam? Bel (0)20 2610 954 of stuur een mail naar post@voorhoede.nl.',
      twitter_card: 'summary' as const,
    },
  },
  intro_title: { en: 'Hi there!', nl: 'Hey!' },
  intro_body: {
    en: 'You can also use our form to ask your question, whatever works for you!',
    nl: 'Je vraag via ons formulier stellen, dat mag ook!',
  },
  email_label: { en: 'E-mail us at', nl: 'E-mail ons via' },
  phone_label: { en: 'Call us at', nl: 'Bel ons via' },
  location_title: {
    en: 'Send mail or want to stop by?',
    nl: 'Post versturen of langskomen?',
  },
  location_body: {
    en: "We love computers a lot, but absolutely don't want to miss out on meeting each other in real life! That's why we have two nice offices. You are always welcome!",
    nl: 'We houden veel van computers, maar absoluut ook van elkaar in het echt ontmoeten. Daarom hebben we twee fijne kantoren. Je bent altijd welkom!',
  },
  locations_list_title: {
    en: 'Visit us at',
    nl: 'Bezoek ons op',
  },
};

function itemTypeRef(id: string) {
  return { type: 'item_type' as const, id };
}

function file(uploadId: string, alt: string): FileValue {
  return {
    upload_id: uploadId,
    alt,
    title: null,
    custom_data: {},
    focal_point: null,
  };
}

function headingParagraph(title: string, body: string): StDocument {
  return {
    schema: 'dast',
    document: {
      type: 'root',
      children: [
        {
          type: 'heading',
          level: 2,
          children: [{ type: 'span', value: title }],
        },
        {
          type: 'paragraph',
          children: [{ type: 'span', value: body }],
        },
      ],
    },
  };
}

function buildBodyBlocks(locale: Locale) {
  return [
    buildBlockRecord({
      item_type: itemTypeRef(BLOCK.pageHeader),
      layout: 'compact',
      style: 'static',
      title: REF.title[locale],
      subtitle: REF.subtitle[locale],
      illustration: null,
      body: '',
    }),
    buildBlockRecord({
      item_type: itemTypeRef(BLOCK.textBlock),
      text: headingParagraph(REF.intro_title[locale], REF.intro_body[locale]),
    }),
    buildBlockRecord({
      item_type: itemTypeRef(BLOCK.reachOutBlock),
      title: '',
      body: '',
      form_type: 'contact',
      cta: null,
      contact_person: null,
    }),
    buildBlockRecord({
      item_type: itemTypeRef(BLOCK.imageGridBlock),
      title: '',
      layout: 'cards',
      card_orientation: 'vertical',
      items: [
        buildBlockRecord({
          item_type: itemTypeRef(BLOCK.imageGridItem),
          title: REF.email_label[locale],
          image: file(EMAIL_IMAGE, 'Email'),
          body: null,
          is_full_width: false,
          cta: buildBlockRecord({
            item_type: itemTypeRef(BLOCK.actionBlock),
            items: [
              buildBlockRecord({
                item_type: itemTypeRef(BLOCK.emailLink),
                title: EMAIL,
                email_address: EMAIL,
                email_subject: '',
                email_body: '',
                style: 'button',
              }),
            ],
          }),
        }),
        buildBlockRecord({
          item_type: itemTypeRef(BLOCK.imageGridItem),
          title: REF.phone_label[locale],
          image: file(CALL_IMAGE, 'Phone'),
          body: null,
          is_full_width: false,
          cta: buildBlockRecord({
            item_type: itemTypeRef(BLOCK.actionBlock),
            items: [
              buildBlockRecord({
                item_type: itemTypeRef(BLOCK.phoneLink),
                title: PHONE,
                phone_number: PHONE,
                action: 'call',
                text: '',
                style: 'button',
              }),
            ],
          }),
        }),
      ],
    }),
    buildBlockRecord({
      item_type: itemTypeRef(BLOCK.textBlock),
      text: headingParagraph(
        REF.location_title[locale],
        REF.location_body[locale],
      ),
    }),
    buildBlockRecord({
      item_type: itemTypeRef(BLOCK.locationsList),
      title: REF.locations_list_title[locale],
      items: [...LOCATIONS],
    }),
  ];
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function updatePageWithRetry(
  client: Client,
  pageId: string,
  payload: {
    body_blocks: Record<Locale, ReturnType<typeof buildBlockRecord>[]>;
    seo: typeof REF.social;
  },
  maxAttempts = 8,
) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await client.items.update(pageId, payload);
      return;
    } catch {
      if (attempt === maxAttempts) {
        throw new Error(`Failed to update page after ${maxAttempts} attempts`);
      }
      const delayMs = attempt * 3000;
      console.log(
        `Page update failed (attempt ${attempt}/${maxAttempts}), retrying in ${delayMs}ms...`,
      );
      await sleep(delayMs);
    }
  }
}

export default async function (client: Client): Promise<void> {
  const bodyBlocks = {
    en: buildBodyBlocks('en'),
    nl: buildBodyBlocks('nl'),
  };

  const tarPage = await client.items.find(PAGE_ID, { version: 'current' });
  const wasPublished = tarPage.meta.status === 'published';

  await updatePageWithRetry(client, PAGE_ID, {
    body_blocks: bodyBlocks,
    seo: REF.social,
  });

  if (wasPublished) {
    await client.items.publish(PAGE_ID);
  }

  const updated = await client.items.find(PAGE_ID, {
    nested: true,
    version: 'current',
  });

  const blocks = updated.body_blocks as {
    en?: Array<{ id?: string; item_type?: { id?: string }; title?: string; form_type?: string; layout?: string }>;
    nl?: Array<{ id?: string; item_type?: { id?: string }; title?: string; form_type?: string; layout?: string }>;
  };

  const summarize = (
    list:
      | Array<{
          id?: string;
          item_type?: { id?: string };
          title?: string;
          form_type?: string;
          layout?: string;
        }>
      | undefined,
  ) =>
    (list ?? []).map((b) => ({
      id: b.id ?? null,
      typeId: b.item_type?.id ?? null,
      title: b.title ?? null,
      form_type: b.form_type ?? null,
      layout: b.layout ?? null,
    }));

  console.log(
    JSON.stringify(
      {
        pageId: PAGE_ID,
        published: wasPublished,
        blockCount: { en: blocks.en?.length ?? 0, nl: blocks.nl?.length ?? 0 },
        body_blocks: { en: summarize(blocks.en), nl: summarize(blocks.nl) },
      },
      null,
      2,
    ),
  );
}
