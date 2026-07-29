/**
 * Migrate REF service_overview (slugs-and-blocks) → TAR page services (new-data-models).
 * REF payload embedded; source record: 363596 → TAR fWyrMwVpQQiH25UoDD-H-g.
 */
import type { Client } from '@datocms/cma-client-node';
import { buildBlockRecord } from '@datocms/cma-client';

const PAGE_ID = 'fWyrMwVpQQiH25UoDD-H-g';
const CONTACT_PAGE_ID = 'cuV2B4i9TAmnkCR9akJcCg';
const CONTACT_PERSON_ID = 'cYDjXl3ZShamH64SdPtBDw';
const SERVICE_TAG_ID = 'Us5mSW48QBeHh6AV3Yrruw';

const BLOCK = {
  pageHeader: '2037668',
  textBlock: 'BSet0e3fTeWC8-a8odR7VA',
  textImageBlock: 'CL2tcnR9TimpzQxNR2RKCg',
  actionBlock: 'RdEUS5_JT0yu3cYRxaPVqw',
  internalLink: '2037919',
  pageList: '1466128',
  reachOutBlock: 'ZoimmZOiR0mkjwIEXN-9Ag',
} as const;

type Locale = 'en' | 'nl';

type FileValue = {
  upload_id: string;
  alt: string | null;
  title: string | null;
  custom_data: Record<string, string>;
  focal_point: { x: number; y: number } | null;
};

type StNode = {
  type: string;
  children?: StNode[];
  value?: string;
  marks?: string[];
  level?: number;
  url?: string;
};

type StDocument = {
  schema: 'dast';
  document: {
    type: 'root';
    children: StNode[];
  };
};

const REF = {
  title: { en: 'Services', nl: 'Services' },
  subtitle: {
    en: 'Web development for complex digital products',
    nl: 'Webdevelopment voor complexe digitale producten',
  },
  header_illustration: {
    upload_id: '410598',
    alt: null as string | null,
    title: null as string | null,
    custom_data: {} as Record<string, string>,
    focal_point: null as { x: number; y: number } | null,
  },
  social: {
    en: {
      image: null,
      title: 'Web Development by De Voorhoede | Web Applications and Sites',
      no_index: false,
      description:
        'Web development by experienced web developers. We help you validate, launch, improve, strengthen your digital product. Check out our web development services.',
      twitter_card: 'summary' as const,
    },
    nl: {
      image: null,
      title: 'Webdevelopment Bureau De Voorhoede | Webapplicaties en Sites',
      no_index: false,
      description:
        'Webdevelopment bureau met ervaren webdevelopers. Wij valideren, lanceren en verbeteren jouw digitale product. Bekijk onze services in Delft en Amsterdam.',
      twitter_card: 'summary' as const,
    },
  },
  intro_title: {
    en: 'Superfast en userfriendly digital products',
    nl: 'Razendsnelle & gebruiksvriendelijke digitale producten',
  },
  intro_body: {
    en: {
      schema: 'dast' as const,
      document: {
        type: 'root' as const,
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'span',
                value:
                  'We approach our web development projects one step at a time. We start small, conduct user test and investigate feasibility. Then, we start the actual development of your ',
              },
              {
                type: 'link',
                url: 'https://www.voorhoede.nl/en/services/web-application-development/',
                children: [{ type: 'span', value: 'web application' }],
              },
              { type: 'span', value: ', ' },
              {
                type: 'link',
                url: 'https://www.voorhoede.nl/en/services/custom-website-development/',
                children: [{ type: 'span', value: 'site' }],
              },
              { type: 'span', value: ' or ' },
              {
                type: 'link',
                url: 'https://www.voorhoede.nl/en/services/design-system/',
                children: [{ type: 'span', value: 'design system' }],
              },
              {
                type: 'span',
                value:
                  '. This way we always fulfill an actual need of the end user and you keep a clear view on the status of the product. Want to kick-off a new project? ',
              },
              {
                type: 'link',
                url: 'https://www.voorhoede.nl/en/services/collaboration/',
                children: [
                  {
                    type: 'span',
                    value: 'Read more about how we working during our projects.',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    nl: {
      schema: 'dast' as const,
      document: {
        type: 'root' as const,
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'span',
                value:
                  'Onze webdevelopment projecten pakken we stap voor stap aan. We beginnen klein, testen met gebruikers en onderzoeken de haalbaarheid. Daarna ontwikkelen we jouw ',
              },
              {
                type: 'link',
                url: 'https://www.voorhoede.nl/nl/services/webapplicaties-ontwikkelen/',
                children: [{ type: 'span', value: 'webapplicatie' }],
              },
              { type: 'span', value: ', ' },
              {
                type: 'link',
                url: 'https://www.voorhoede.nl/nl/services/maatwerk-website-ontwikkelen/',
                children: [{ type: 'span', value: 'website' }],
              },
              { type: 'span', value: ' of ' },
              {
                type: 'link',
                url: 'https://www.voorhoede.nl/nl/services/design-system/',
                children: [{ type: 'span', value: 'design system' }],
              },
              {
                type: 'span',
                value:
                  '. Zo vervullen we altijd een daadwerkelijke behoefte van de eindgebruiker en weet jij op ieder moment waar je aan toe bent. Wil je samen aan de slag? ',
              },
              {
                type: 'link',
                url: 'https://www.voorhoede.nl/nl/services/samenwerking/',
                children: [
                  {
                    type: 'span',
                    value:
                      'Lees meer over hoe wij een nieuwe projectsamenwerking inrichten.',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  } satisfies Record<Locale, StDocument>,
  intro_image: {
    upload_id: 'bxxv7BJcQ3yDZFcjS8G_uA',
    alt: null as string | null,
    title: null as string | null,
    custom_data: {} as Record<string, string>,
    focal_point: null as { x: number; y: number } | null,
  },
  contact_body: {
    en: 'Curious what we can do for your digital product?',
    nl: 'Benieuwd wat wij voor jouw digitale product kunnen betekenen?',
  },
  services_title: {
    en: 'How can we help?',
    nl: 'Hoe kunnen we helpen?',
  },
  contact_cta_label: {
    en: 'Get in touch',
    nl: 'Neem contact op',
  },
  pivot_title: {
    en: "Let's discuss what we can do",
    nl: 'Laten we bespreken wat we kunnen doen',
  },
};

function ref(id: string) {
  return { type: 'item_type' as const, id };
}

function normalizeFile(file: FileValue, fallbackAlt: string): FileValue {
  return {
    upload_id: file.upload_id,
    alt: file.alt ?? fallbackAlt,
    title: file.title ?? null,
    custom_data: file.custom_data ?? {},
    focal_point: file.focal_point ?? null,
  };
}

function paragraphDocument(text: string): StDocument {
  return {
    schema: 'dast',
    document: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [{ type: 'span', value: text }],
        },
      ],
    },
  };
}

function buildTextImageStructuredText(title: string, body: StDocument): StDocument {
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
        ...body.document.children,
      ],
    },
  };
}

function buildBodyBlocks(locale: Locale): ReturnType<typeof buildBlockRecord>[] {
  const introTitle = REF.intro_title[locale];

  return [
    buildBlockRecord({
      item_type: ref(BLOCK.pageHeader),
      layout: 'compact',
      style: 'static',
      title: REF.title[locale],
      subtitle: REF.subtitle[locale],
      illustration: normalizeFile(REF.header_illustration, 'Services'),
      body: '',
    }),
    buildBlockRecord({
      item_type: ref(BLOCK.textImageBlock),
      text: buildTextImageStructuredText(introTitle, REF.intro_body[locale]),
      image: normalizeFile(REF.intro_image, introTitle),
      layout: 'image-text',
      style: 'text-background',
    }),
    buildBlockRecord({
      item_type: ref(BLOCK.textBlock),
      text: paragraphDocument(REF.contact_body[locale]),
    }),
    buildBlockRecord({
      item_type: ref(BLOCK.actionBlock),
      items: [
        buildBlockRecord({
          item_type: ref(BLOCK.internalLink),
          title: REF.contact_cta_label[locale],
          link: CONTACT_PAGE_ID,
          style: 'primary',
        }),
      ],
    }),
    buildBlockRecord({
      item_type: ref(BLOCK.pageList),
      title: REF.services_title[locale],
      tag_filter: SERVICE_TAG_ID,
      pinned: [],
      jobs: [],
      columns: 3,
    }),
    buildBlockRecord({
      item_type: ref(BLOCK.reachOutBlock),
      title: REF.pivot_title[locale],
      body: '',
      form_type: 'contact',
      cta: null,
      contact_person: CONTACT_PERSON_ID,
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

  const summarize = (
    blocks: Array<{
      item_type?: { id?: string };
      __itemTypeId?: string;
      id?: string;
      title?: string;
      form_type?: string;
      columns?: number;
    }>,
  ) =>
    (blocks ?? []).map((b) => ({
      id: b.id,
      typeId: b.item_type?.id ?? b.__itemTypeId,
      title: b.title ?? null,
      form_type: b.form_type ?? null,
      columns: b.columns ?? null,
    }));

  const blocks = updated.body_blocks as Record<Locale, typeof updated.body_blocks>;

  console.log(
    JSON.stringify(
      {
        pageId: PAGE_ID,
        published: wasPublished,
        blockCount: {
          en: Array.isArray(blocks.en) ? blocks.en.length : 0,
          nl: Array.isArray(blocks.nl) ? blocks.nl.length : 0,
        },
        body_blocks: {
          en: summarize((blocks.en ?? []) as Parameters<typeof summarize>[0]),
          nl: summarize((blocks.nl ?? []) as Parameters<typeof summarize>[0]),
        },
      },
      null,
      2,
    ),
  );
}
