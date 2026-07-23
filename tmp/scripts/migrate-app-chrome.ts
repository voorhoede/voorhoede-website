import type { Client } from 'datocms/lib/cma-client-node';
import { buildBlockRecord } from '@datocms/cma-client';

const BLOCK = {
  menuItemInternal: 'Gmt9CYf7TZGB8SdBQF5PtQ',
  menuItemExternal: 'AsdSlbiUTlqZqGBehW0Ixw',
  menuItemGroup: 'NI6SMMD4RaiWpqZTp5Pk7A',
  menuItemContact: 'Mjd__50LT-yjpFxote2YNw',
  emailLink: 'TAcLhURzReOmXoCzBBJIVw',
  phoneLink: 'PzxBO0r6Q96tjYZUbDFQZw',
  social: 'fPh4hElTTAq8ct8EdxMVTg',
  iconBlock: 'B5m5y2NfSASVJ6CIBm3F5A',
  externalLink: '2034503',
  variableBlock: 'UlmN1uACR0KcQEmO_TP3oA',
} as const;

const VARIABLE_TYPE = 'L6a2Mj5KS_qRdydb0Z2Xvg';
const APP_ID = '626071';
const MASTODON_URL = 'https://fosstodon.org/@devoorhoede';

type Locale = 'en' | 'nl';

function ref(id: string) {
  return { type: 'item_type' as const, id };
}

function internalLink(title: string, pageId: string, style: 'link' | 'button') {
  return buildBlockRecord({
    item_type: ref(BLOCK.menuItemInternal),
    title,
    link: pageId,
    style,
  });
}

function externalMenuItem(
  title: string,
  link: string,
  style: 'link' | 'button' | 'text',
  imageUploadId?: string,
) {
  return buildBlockRecord({
    item_type: ref(BLOCK.menuItemExternal),
    title,
    link,
    style,
    ...(imageUploadId
      ? {
          image: {
            upload_id: imageUploadId,
            alt: null,
            title: null,
            custom_data: {},
            focal_point: null,
          },
        }
      : {}),
  });
}

function contactItem(
  style: 'link' | 'text',
  contact: ReturnType<typeof buildBlockRecord>,
) {
  return buildBlockRecord({
    item_type: ref(BLOCK.menuItemContact),
    title: '',
    style,
    contact,
  });
}

function phoneLink(phoneNumber: string) {
  return buildBlockRecord({
    item_type: ref(BLOCK.phoneLink),
    title: phoneNumber,
    phone_number: phoneNumber,
    action: 'call',
    style: 'link',
  });
}

function emailLink(email: string, title = 'Email') {
  return buildBlockRecord({
    item_type: ref(BLOCK.emailLink),
    title,
    email_address: email,
    style: 'link',
  });
}

function group(title: string, items: ReturnType<typeof buildBlockRecord>[]) {
  return buildBlockRecord({
    item_type: ref(BLOCK.menuItemGroup),
    title,
    items,
  });
}

function social(url: string, iconName: string, iconTitle: string) {
  return buildBlockRecord({
    item_type: ref(BLOCK.social),
    url,
    icon: buildBlockRecord({
      item_type: ref(BLOCK.iconBlock),
      name: iconName,
      title: iconTitle,
    }),
  });
}

function externalLink(title: string, url: string) {
  return buildBlockRecord({
    item_type: ref(BLOCK.externalLink),
    title,
    url,
    open_in_new_tab: true,
  });
}

function variableBlock(variableId: string) {
  return buildBlockRecord({
    item_type: ref(BLOCK.variableBlock),
    variable: variableId,
  });
}

export default async function (client: Client): Promise<void> {
  // Resolve TAR pages by slug
  const neededSlugs = [
    'impact',
    'services',
    'cases',
    'about-us',
    'work-at',
    'contact',
    'blog',
    'faq',
    'impact/digitale-producten-privacy-by-design',
  ];
  const slugToId: Record<string, string> = {};
  for await (const page of client.items.listPagedIterator({
    filter: { type: 'page' },
    version: 'current',
  })) {
    const slug = page.slug as string;
    if (neededSlugs.includes(slug)) {
      slugToId[slug] = page.id;
    }
  }
  const missing = neededSlugs.filter((s) => !slugToId[s]);
  if (missing.length) {
    throw new Error(`Missing TAR page slugs: ${missing.join(', ')}`);
  }

  // Upsert legal variables
  const legalDefs = [
    { title: 'KvK', value: '56017235' },
    { title: 'BTW', value: 'NL851944620B01' },
    { title: 'IBAN', value: 'NL14TRIO0320142078' },
  ];
  const existingVars: Array<{ id: string; title: string }> = [];
  for await (const v of client.items.listPagedIterator({
    filter: { type: 'variable' },
    version: 'current',
  })) {
    existingVars.push({ id: v.id, title: String(v.title) });
  }
  const variableIds: string[] = [];
  for (const def of legalDefs) {
    let found = existingVars.find((v) => v.title === def.title);
    if (!found) {
      const created = await client.items.create({
        item_type: ref(VARIABLE_TYPE),
        title: def.title,
        value: def.value,
        display_title: def.title,
      });
      await client.items.publish(created.id);
      found = { id: created.id, title: def.title };
    } else {
      await client.items.update(found.id, {
        value: def.value,
        display_title: def.title,
      });
      await client.items.publish(found.id);
    }
    variableIds.push(found.id);
  }

  const phone = '+31 20 2610 954';
  const email = 'post@voorhoede.nl';
  const addresses = [
    {
      line1: 'Koivistokade 70',
      line2: '1013 BB Amsterdam',
      url: 'https://www.google.com/maps/place/De+Voorhoede+%7C+Front-end+Development/@52.396847,4.8700823,17z/data=!3m1!4b1!4m5!3m4!1s0x47c5e21d502d2d59:0xbf570944a96ebf45!8m2!3d52.347647!4d4.8502154',
    },
    {
      line1: 'Koornmarkt 22',
      line2: '2611 EG Delft',
      url: 'https://www.google.nl/maps/place/Koornmarkt+22,+2611+EG+Delft/@52.0093477,4.3573054,17z/',
    },
  ];

  const groupTitles: Record<Locale, { sayHello: string; visitUs: string }> = {
    en: { sayHello: 'Say hello', visitUs: 'Visit us' },
    nl: { sayHello: 'Neem contact op', visitUs: 'Kom langs' },
  };

  const menuByLocale: Record<Locale, ReturnType<typeof buildBlockRecord>[]> = {
    en: [
      internalLink('Impact', slugToId.impact, 'link'),
      internalLink('Services', slugToId.services, 'link'),
      internalLink('Cases', slugToId.cases, 'link'),
      internalLink('About us', slugToId['about-us'], 'link'),
      internalLink('Work at', slugToId['work-at'], 'link'),
      internalLink('Contact', slugToId.contact, 'button'),
    ],
    nl: [
      internalLink('Impact', slugToId.impact, 'link'),
      internalLink('Services', slugToId.services, 'link'),
      internalLink('Cases', slugToId.cases, 'link'),
      internalLink('Over ons', slugToId['about-us'], 'link'),
      internalLink('Werken bij', slugToId['work-at'], 'link'),
      internalLink('Contact', slugToId.contact, 'button'),
    ],
  };

  function footerItems(locale: Locale) {
    const titles = groupTitles[locale];
    const explore =
      locale === 'en'
        ? [
            internalLink('Impact', slugToId.impact, 'link'),
            internalLink('Services', slugToId.services, 'link'),
            internalLink('Cases', slugToId.cases, 'link'),
            internalLink('Blog', slugToId.blog, 'link'),
            internalLink('About us', slugToId['about-us'], 'link'),
            internalLink('Contact', slugToId.contact, 'link'),
            internalLink('FAQ', slugToId.faq, 'link'),
          ]
        : [
            internalLink('Impact', slugToId.impact, 'link'),
            internalLink('Services', slugToId.services, 'link'),
            internalLink('Cases', slugToId.cases, 'link'),
            internalLink('Blog', slugToId.blog, 'link'),
            internalLink('Over ons', slugToId['about-us'], 'link'),
            internalLink('Contact', slugToId.contact, 'link'),
            internalLink('FAQ', slugToId.faq, 'link'),
          ];

    return [
      ...explore,
      group(titles.sayHello, [
        contactItem('link', phoneLink(phone)),
        contactItem('link', emailLink(email, email)),
      ]),
      group(
        titles.visitUs,
        addresses.map((a) =>
          externalMenuItem(`${a.line1}\n${a.line2}`, a.url, 'text'),
        ),
      ),
    ];
  }

  const socials = [
    social('https://github.com/voorhoede/', 'github', 'GitHub'),
    social(MASTODON_URL, 'mastodon', 'Mastodon'),
    social(
      'https://www.youtube.com/channel/UCzHuhQVYFRixtQN2-swcuGg',
      'youtube',
      'YouTube',
    ),
    social(
      'https://www.linkedin.com/company/de-voorhoede',
      'linkedin',
      'LinkedIn',
    ),
  ];

  const certificates = [
    externalMenuItem(
      'B Corp',
      'https://www.bcorporation.net/en-us/find-a-b-corp/company/de-voorhoede/',
      'link',
      '56432243',
    ),
    externalMenuItem(
      'Dutch Digital Agencies',
      'https://dutchdigitalagencies.com/leden/de-voorhoede/',
      'link',
      '56432242',
    ),
    buildBlockRecord({
      item_type: ref(BLOCK.menuItemInternal),
      title: 'DNV',
      link: slugToId['impact/digitale-producten-privacy-by-design'],
      style: 'link',
      image: {
        upload_id: 'CFp8PkUuTimcBO2729ju5Q',
        alt: null,
        title: null,
        custom_data: {},
        focal_point: null,
      },
    }),
  ];

  const legalItems = variableIds.map((id) => variableBlock(id));

  const privacyByLocale: Record<Locale, ReturnType<typeof buildBlockRecord>[]> =
    {
      en: [
        externalLink('CC BY 4.0', 'https://creativecommons.org/licenses/by/4.0/'),
        externalLink(
          'Privacy statement',
          'https://www.datocms-assets.com/6524/1780323242-vh-isms-006-privacy-statement-de-voorhoede.pdf',
        ),
      ],
      nl: [
        externalLink('CC BY 4.0', 'https://creativecommons.org/licenses/by/4.0/'),
        externalLink(
          'Privacy statement',
          'https://www.datocms-assets.com/6524/1780323242-vh-isms-006-privacy-statement-de-voorhoede.pdf',
        ),
      ],
    };

  const contactEmail = {
    en: emailLink(email, 'Email'),
    nl: emailLink(email, 'Email'),
  };

  await client.items.update(APP_ID, {
    menu_items: menuByLocale,
    footer_items: {
      en: footerItems('en'),
      nl: footerItems('nl'),
    },
    socials: {
      en: socials,
      nl: socials,
    },
    certificates: {
      en: certificates,
      nl: certificates,
    },
    legal_items: {
      en: legalItems,
      nl: legalItems,
    },
    privacy: privacyByLocale,
    contact_email: contactEmail,
  });

  await client.items.publish(APP_ID);

  console.log(
    JSON.stringify(
      {
        ok: true,
        slugToId,
        variableIds,
        appId: APP_ID,
      },
      null,
      2,
    ),
  );
}
