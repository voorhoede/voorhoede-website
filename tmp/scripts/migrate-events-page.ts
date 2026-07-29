/**
 * Create/migrate TAR events page from REF event_overview 362285.
 * Environments: REF slugs-and-blocks → TAR new-data-models.
 */
import type { Client } from '@datocms/cma-client-node';
import { buildBlockRecord } from '@datocms/cma-client';
import { parse } from 'parse5';
import { parse5ToStructuredText } from 'datocms-html-to-structured-text';

const PAGE_TYPE_ID = '2035421';
const BLOCK = {
  pageHeader: '2037668',
  textBlock: 'BSet0e3fTeWC8-a8odR7VA',
  eventsList: '1517179',
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

type StDocument = {
  schema: 'dast';
  document: {
    type: 'root';
    children: unknown[];
  };
};

const REF = {
  title: { en: 'Events', nl: 'Academy' },
  subtitle: {
    en: 'Invest in your future',
    nl: 'Investeer in jouw toekomst',
  },
  social: {
    en: {
      image: '48468727',
      title: 'Web Development Meetups | De Voorhoede',
      no_index: false,
      description:
        'Meetups about front-end, back-end and web development in general.  We host meetups in Amsterdam & Delft area. Check out our calendar and join for free.',
      twitter_card: 'summary' as const,
    },
    nl: {
      image: '48468727',
      title: 'Web Development Meetups | De Voorhoede',
      no_index: false,
      description:
        'Meetups over front-end, back-end en web development in het algemeen. Wij organiseren meetups in Amsterdam & Delft. Bekijk onze kalender en meld je gratis aan. ',
      twitter_card: 'summary' as const,
    },
  },
  header_illustration: {
    upload_id: '16932138',
    alt: null as string | null,
    title: null as string | null,
    custom_data: {} as Record<string, string>,
    focal_point: null as { x: number; y: number } | null,
  },
  introduction_text: `<p>We tell and present with love about everything that has to do with the front-end!</p>
<p>We regularly speak at meetups, events or conferences and we organize meetups ourselves. Below an overview. if you like our talk, do not hesitate to contact us for your own meetup, technical pitch or lunch lecture!</p>`,
  upcoming_title: {
    en: 'Upcoming events',
    nl: 'Upcoming events',
  },
  past_title: {
    en: 'Past events',
    nl: 'Past events',
  },
  newsletter_title: {
    en: 'Stay in the loop',
    nl: 'Blijf op de hoogte',
  },
};

function itemTypeRef(id: string) {
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

async function htmlToDast(html: string): Promise<StDocument> {
  const result = await parse5ToStructuredText(
    parse(html, {
      sourceCodeLocationInfo: true,
    }),
  );
  if (!result) {
    return {
      schema: 'dast',
      document: { type: 'root', children: [] },
    };
  }
  return result as StDocument;
}

function buildBodyBlocks(
  locale: Locale,
  intro: StDocument,
  eventIds: string[],
) {
  return [
    buildBlockRecord({
      item_type: itemTypeRef(BLOCK.pageHeader),
      layout: 'compact',
      style: 'static',
      title: REF.title[locale],
      subtitle: REF.subtitle[locale],
      illustration: normalizeFile(REF.header_illustration, 'Events'),
      body: '',
    }),
    buildBlockRecord({
      item_type: itemTypeRef(BLOCK.textBlock),
      text: intro,
    }),
    buildBlockRecord({
      item_type: itemTypeRef(BLOCK.eventsList),
      title: REF.upcoming_title[locale],
      items: [],
    }),
    buildBlockRecord({
      item_type: itemTypeRef(BLOCK.eventsList),
      title: REF.past_title[locale],
      items: eventIds,
    }),
    buildBlockRecord({
      item_type: itemTypeRef(BLOCK.reachOutBlock),
      title: REF.newsletter_title[locale],
      body: '',
      form_type: 'newsletter',
      cta: null,
      contact_person: null,
    }),
  ];
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function updatePageWithRetry(
  client: Client,
  pageId: string,
  payload: Record<string, unknown>,
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
  const events = await client.items.list({
    filter: { type: 'event' },
    version: 'current',
    page: { limit: 100 },
  });
  const eventIds = events.map((e) => e.id);

  const intro = await htmlToDast(REF.introduction_text);

  const existing = await client.items.list({
    filter: { type: 'page', fields: { slug: { eq: 'events' } } },
    version: 'current',
    page: { limit: 5 },
  });

  let pageId = existing[0]?.id;
  let wasPublished = existing[0]?.meta.status === 'published';

  if (!pageId) {
    const created = await client.items.create({
      item_type: itemTypeRef(PAGE_TYPE_ID),
      title: REF.title,
      slug: 'events',
      seo: REF.social,
      body_blocks: {
        en: [],
        nl: [],
      },
    });
    pageId = created.id;
    wasPublished = false;
  }

  const bodyBlocks = {
    en: buildBodyBlocks('en', intro, eventIds),
    nl: buildBodyBlocks('nl', intro, eventIds),
  };

  await updatePageWithRetry(client, pageId, {
    title: REF.title,
    seo: REF.social,
    body_blocks: bodyBlocks,
  });

  if (wasPublished || !existing[0]) {
    await client.items.publish(pageId);
  }

  const updated = await client.items.find(pageId, {
    nested: true,
    version: 'current',
  });

  const blocks = updated.body_blocks as {
    en?: Array<{ id?: string; item_type?: { id?: string }; title?: string; form_type?: string }>;
    nl?: Array<{ id?: string; item_type?: { id?: string }; title?: string; form_type?: string }>;
  };

  const summarize = (
    list:
      | Array<{
          id?: string;
          item_type?: { id?: string };
          title?: string;
          form_type?: string;
        }>
      | undefined,
  ) =>
    (list ?? []).map((b) => ({
      id: b.id ?? null,
      typeId: b.item_type?.id ?? null,
      title: b.title ?? null,
      form_type: b.form_type ?? null,
    }));

  console.log(
    JSON.stringify(
      {
        pageId,
        created: !existing[0],
        eventCount: eventIds.length,
        published: true,
        blockCount: { en: blocks.en?.length ?? 0, nl: blocks.nl?.length ?? 0 },
        body_blocks: { en: summarize(blocks.en), nl: summarize(blocks.nl) },
      },
      null,
      2,
    ),
  );
}
