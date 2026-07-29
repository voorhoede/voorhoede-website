/**
 * Migrate REF case_overview (slugs-and-blocks) → TAR page cases (new-data-models).
 * Run via DatoCMS CMA against environment `new-data-models`.
 * REF payload is embedded (cross-env); source record: 340361.
 */
import type { Client } from '@datocms/lib/cma-client-node';
import { buildBlockRecord } from '@datocms/cma-client';

const PAGE_ID = 'TPh1RXzNSwSGmw-ohDl83g';
const CONTACT_PAGE_ID = 'cuV2B4i9TAmnkCR9akJcCg';
const LOGOS_PARTIAL_ID = 'fBKRjrUET_KbEx_Hfjboaw';
const CONTACT_PERSON_ID = 'cYDjXl3ZShamH64SdPtBDw';

const BLUE_TEXT_TYPE = '2040400';

const BLOCK = {
  pageHeader: '2037668',
  textBlock: 'BSet0e3fTeWC8-a8odR7VA',
  textImageBlock: 'CL2tcnR9TimpzQxNR2RKCg',
  actionBlock: 'RdEUS5_JT0yu3cYRxaPVqw',
  internalLink: '2037919',
  caseListBlock: '2486431',
  pagePartialBlock: 'G8-kViMTTG62MbHNzPc7PQ',
  reachOutBlock: 'ZoimmZOiR0mkjwIEXN-9Ag',
} as const;

const PROJECT_IDS = [
  'OJDUnOePSHmsjeuTsGJAyw',
  'Hc3qk0rbR7e-7TB6lhBtUw',
  '1337899',
  '65027291',
  '340387',
  '1073292',
  '121577448',
  '48633006',
  'Q0eUVYjURkO5v4t4zG2I-w',
] as const;

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
  meta?: { id: string; value: string }[];
  item?: {
    id?: string;
    __itemTypeId?: string;
    attributes?: Record<string, string | boolean | FileValue | StDocument | null>;
    relationships?: { item_type?: { data?: { id?: string } } };
  };
};

type StDocument = {
  schema: 'dast';
  document: {
    type: 'root';
    children: StNode[];
  };
};

const REF = {
  title: { en: 'Cases', nl: 'Cases' },
  subtitle: {
    en: 'From landing page to complex web applications for tech startups, SMEs, e-commerce and multinationals.',
    nl: 'Van landingspagina tot complexe webapplicaties voor tech startups, MKB, e-commerce en multinationals.',
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
      title: 'Webdevelopment projects by De Voorhoede',
      no_index: false,
      description:
        'At De Voorhoede we built web sites and apps for innovative start-ups, small businesses and large enterprises. Have a look at our web development projects.',
      twitter_card: 'summary' as const,
    },
    nl: {
      image: null,
      title: 'Webdevelopment projecten | Werk van De Voorhoede',
      no_index: false,
      description:
        "Bij De Voorhoede werken we aan verschillende soorten webdevelopment projecten voor innovatieve start-up’s, mkb’ers en grote concerns. Bekijk ons werk.",
      twitter_card: 'summary' as const,
    },
  },
  intro_title: {
    en: 'We use cutting edge web technology',
    nl: 'We zetten webtechnologie in op het scherpst van de snede',
  },
  intro_body: {
    en: {
      schema: 'dast' as const,
      document: {
        type: 'root' as const,
        children: [
          {
            type: 'block',
            item: {
              id: '157490277',
              __itemTypeId: BLUE_TEXT_TYPE,
              attributes: {
                body: {
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
                              'We’re on top of the latest developments in our field. We use this knowledge to choose the best technology for your product, based on your requirements. This is how we make high quality ',
                          },
                          {
                            type: 'link',
                            url: 'https://www.voorhoede.nl/en/services/web-application-development/',
                            children: [{ type: 'span', value: 'web applications' }],
                          },
                          {
                            type: 'span',
                            value:
                              " for happy end users. We also like to make our clients happy and satisfied. That's why we ask for feedback after every project. In 2021 our clients rated us with a 4,5 out of 5!",
                          },
                        ],
                      },
                    ],
                  },
                },
                variant: 'default',
                text_alignment: 'left',
              },
            },
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
            type: 'block',
            item: {
              id: '157490278',
              __itemTypeId: BLUE_TEXT_TYPE,
              attributes: {
                body: {
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
                              'Elke dag zijn we bezig met de laatste ontwikkelingen binnen ons vakgebied. Met deze kennis op zak kiezen we de beste techniek voor jouw product, gebaseerd op jouw wensen. Zo maken we hoogwaardige ',
                          },
                          {
                            type: 'link',
                            url: 'https://www.voorhoede.nl/nl/services/webapplicaties-ontwikkelen/',
                            children: [{ type: 'span', value: 'webapplicaties' }],
                          },
                          {
                            type: 'span',
                            value:
                              ' voor gelukkige eindgebruikers. Daarnaast maken we onze opdrachtgevers ook graag blij. We vragen dan ook om feedback na elk project. In 2021 beoordeelden klanten ons met een 4,5 uit 5!',
                          },
                        ],
                      },
                    ],
                  },
                },
                variant: 'default',
                text_alignment: 'left',
              },
            },
          },
        ],
      },
    },
  } satisfies Record<Locale, StDocument>,
  intro_image: {
    upload_id: '1980812',
    alt: null as string | null,
    title: null as string | null,
    custom_data: {} as Record<string, string>,
    focal_point: null as { x: number; y: number } | null,
  },
  contact_body: {
    en: 'Are you convinced? Or do you want to talk to somebody instead of reading a web page?',
    nl: "Ben je al overtuigd? Of praat je liever met een echt mens dan dat je webpagina's leest?",
  },
  pivot_title: {
    en: "Let's discuss what we can do",
    nl: 'Laten we bespreken wat we kunnen doen',
  },
  case_list_title: {
    en: 'All cases',
    nl: 'Alle cases',
  },
  contact_cta_label: {
    en: 'Get in touch',
    nl: 'Neem contact op',
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

function addBlueMarks(nodes: StNode[]): StNode[] {
  return nodes.map((node) => {
    if (node.type === 'span' && node.value) {
      const marks = node.marks ?? [];
      return { ...node, marks: marks.includes('blue') ? marks : [...marks, 'blue'] };
    }
    if (node.children) {
      return { ...node, children: addBlueMarks(node.children) };
    }
    return node;
  });
}

function itemTypeId(item: NonNullable<StNode['item']>): string {
  return item.__itemTypeId ?? item.relationships?.item_type?.data?.id ?? '';
}

function convertStructuredTextBody(body: StDocument): StDocument {
  const walk = (nodes: StNode[]): StNode[] => {
    const result: StNode[] = [];

    for (const node of nodes) {
      if (node.type === 'block' && node.item) {
        const typeId = itemTypeId(node.item);

        if (typeId === BLUE_TEXT_TYPE && node.item.attributes?.body) {
          const inner = node.item.attributes.body as StDocument;
          result.push(...walk(addBlueMarks(inner.document.children)));
          continue;
        }
      }

      if (node.children) {
        result.push({ ...node, children: walk(node.children) });
        continue;
      }

      result.push(node);
    }

    return result;
  };

  return {
    schema: 'dast',
    document: {
      type: 'root',
      children: walk(body.document.children),
    },
  };
}

function buildTextImageStructuredText(title: string, body: StDocument): StDocument {
  const converted = convertStructuredTextBody(body);
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
        ...converted.document.children,
      ],
    },
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

function buildBodyBlocks(locale: Locale): ReturnType<typeof buildBlockRecord>[] {
  const introTitle = REF.intro_title[locale];
  const introImage = normalizeFile(REF.intro_image, introTitle);

  return [
    buildBlockRecord({
      item_type: ref(BLOCK.pageHeader),
      layout: 'compact',
      style: 'static',
      title: REF.title[locale],
      subtitle: REF.subtitle[locale],
      illustration: normalizeFile(REF.header_illustration, 'Cases'),
      body: '',
    }),
    buildBlockRecord({
      item_type: ref(BLOCK.textImageBlock),
      text: buildTextImageStructuredText(introTitle, REF.intro_body[locale]),
      image: introImage,
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
      item_type: ref(BLOCK.caseListBlock),
      title: REF.case_list_title[locale],
      cases: [...PROJECT_IDS],
      columns: 3,
    }),
    buildBlockRecord({
      item_type: ref(BLOCK.pagePartialBlock),
      item: LOGOS_PARTIAL_ID,
      layout: 'default',
      theme: 'none',
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

  const summarize = (blocks: Array<{ item_type?: { id?: string }; __itemTypeId?: string; id?: string; title?: string; layout?: string; style?: string; form_type?: string }>) =>
    (blocks ?? []).map((b) => ({
      id: b.id,
      typeId: b.item_type?.id ?? b.__itemTypeId,
      title: b.title ?? null,
      layout: b.layout ?? null,
      style: b.style ?? null,
      form_type: b.form_type ?? null,
    }));

  const blocks = updated.body_blocks as Record<Locale, typeof updated.body_blocks>;

  console.log(
    JSON.stringify(
      {
        pageId: PAGE_ID,
        refEnvironment: 'slugs-and-blocks',
        tarEnvironment: 'new-data-models',
        updatedLocales: ['en', 'nl'],
        blockCount: {
          en: Array.isArray(blocks.en) ? blocks.en.length : 0,
          nl: Array.isArray(blocks.nl) ? blocks.nl.length : 0,
        },
        body_blocks: {
          en: summarize((blocks.en ?? []) as Parameters<typeof summarize>[0]),
          nl: summarize((blocks.nl ?? []) as Parameters<typeof summarize>[0]),
        },
        seo: updated.seo,
        published: wasPublished,
      },
      null,
      2,
    ),
  );
}
