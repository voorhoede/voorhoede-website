import type { ItemTypeDefinition } from '@datocms/cma-client';

type EnvironmentSettings = {
  locales: 'en' | 'nl';
};

export type ImageGridBlock = ItemTypeDefinition<
  EnvironmentSettings,
  'VjlVydOmSp-kj5GVXeVG4g',
  {
    title: {
      type: 'string';
    };
    layout: {
      type: 'string';
    };
    card_orientation: {
      type: 'string';
    };
    items: {
      type: 'rich_text';
      blocks: ImageGridItem;
    };
  }
>;
export const ImageGridBlock = {
  ID: 'VjlVydOmSp-kj5GVXeVG4g',
  REF: { type: 'item_type', id: 'VjlVydOmSp-kj5GVXeVG4g' },
} as const;

export type CaseItem = ItemTypeDefinition<
  EnvironmentSettings,
  '38240',
  {
    title: {
      type: 'string';
      localized: true;
    };
    subtitle: {
      type: 'string';
      localized: true;
    };
    hero_illustration: {
      type: 'file';
    };
    slug: {
      type: 'slug';
      localized: true;
    };
    seo: {
      type: 'seo';
      localized: true;
    };
    body_blocks: {
      type: 'rich_text';
      blocks:
        | ImageGridBlock
        | TextBlock
        | ImageBlock
        | CodeBlock
        | PageListBlock
        | TeamGallery
        | BlogListBlock
        | EventsList
        | EmbedBlock
        | GalleryBlock
        | PagePartialBlock
        | VideoEmbedBlock
        | ReachOutBlock
        | GroupingBlock
        | CaseListBlock
        | GlossaryList
        | ActionBlock
        | LogoGrid
        | VideoBlock
        | TextImageBlock
        | PageHeader
        | TestimonialBlock;
      localized: true;
    };
    quote: {
      type: 'string';
      localized: true;
    };
    author: {
      type: 'string';
      localized: true;
    };
    preview_links: {
      type: 'json';
      localized: true;
    };
    tags: {
      type: 'links';
    };
    position: {
      type: 'integer';
    };
  }
>;
export const CaseItem = {
  ID: '38240',
  REF: { type: 'item_type', id: '38240' },
} as const;

export type TextBlock = ItemTypeDefinition<
  EnvironmentSettings,
  'BSet0e3fTeWC8-a8odR7VA',
  {
    text: {
      type: 'structured_text';
      blocks: ImageBlock | ActionBlock | VideoBlock | VideoEmbedBlock;
      inline_blocks: IconBlock | VariableBlock;
    };
  }
>;
export const TextBlock = {
  ID: 'BSet0e3fTeWC8-a8odR7VA',
  REF: { type: 'item_type', id: 'BSet0e3fTeWC8-a8odR7VA' },
} as const;

export type MenuItemContact = ItemTypeDefinition<
  EnvironmentSettings,
  'Mjd__50LT-yjpFxote2YNw',
  {
    title: {
      type: 'string';
    };
    contact: {
      type: 'single_block';
      blocks: PhoneLink | EmailLink;
    };
    style: {
      type: 'string';
    };
    image: {
      type: 'file';
    };
    items: {
      type: 'rich_text';
      blocks:
        | MenuItemExternal
        | MenuItemInternal
        | MenuItemContact
        | MenuItemGroup;
    };
  }
>;
export const MenuItemContact = {
  ID: 'Mjd__50LT-yjpFxote2YNw',
  REF: { type: 'item_type', id: 'Mjd__50LT-yjpFxote2YNw' },
} as const;

export type Social = ItemTypeDefinition<
  EnvironmentSettings,
  'fPh4hElTTAq8ct8EdxMVTg',
  {
    url: {
      type: 'string';
    };
    icon: {
      type: 'single_block';
      blocks: IconBlock;
    };
  }
>;
export const Social = {
  ID: 'fPh4hElTTAq8ct8EdxMVTg',
  REF: { type: 'item_type', id: 'fPh4hElTTAq8ct8EdxMVTg' },
} as const;

export type PagePartial = ItemTypeDefinition<
  EnvironmentSettings,
  'XPo_c_5wTB2S8UWF1q2HoA',
  {
    title: {
      type: 'string';
      localized: true;
    };
    blocks: {
      type: 'rich_text';
      blocks:
        | ImageGridBlock
        | TextBlock
        | ImageBlock
        | CodeBlock
        | PageListBlock
        | TeamGallery
        | BlogListBlock
        | EventsList
        | EmbedBlock
        | GalleryBlock
        | PagePartialBlock
        | VideoEmbedBlock
        | ReachOutBlock
        | GroupingBlock
        | CaseListBlock
        | GlossaryList
        | ActionBlock
        | LogoGrid
        | VideoBlock
        | TextImageBlock
        | PageHeader
        | TestimonialBlock;
      localized: true;
    };
  }
>;
export const PagePartial = {
  ID: 'XPo_c_5wTB2S8UWF1q2HoA',
  REF: { type: 'item_type', id: 'XPo_c_5wTB2S8UWF1q2HoA' },
} as const;

export type BlogPost = ItemTypeDefinition<
  EnvironmentSettings,
  '38241',
  {
    on_mounted_script: {
      type: 'text';
    };
    slug: {
      type: 'slug';
      localized: true;
    };
    is_archived: {
      type: 'boolean';
    };
    on_unmounted_script: {
      type: 'text';
    };
    title: {
      type: 'string';
      localized: true;
    };
    seo: {
      type: 'seo';
      localized: true;
    };
    subtitle: {
      type: 'string';
      localized: true;
    };
    header_illustration: {
      type: 'file';
    };
    authors: {
      type: 'links';
    };
    date: {
      type: 'date_time';
    };
    intro_title: {
      type: 'string';
      localized: true;
    };
    body_blocks: {
      type: 'rich_text';
      blocks:
        | ImageGridBlock
        | TextBlock
        | ImageBlock
        | CodeBlock
        | PageListBlock
        | TeamGallery
        | BlogListBlock
        | EventsList
        | EmbedBlock
        | GalleryBlock
        | PagePartialBlock
        | VideoEmbedBlock
        | ReachOutBlock
        | GroupingBlock
        | CaseListBlock
        | GlossaryList
        | ActionBlock
        | LogoGrid
        | VideoBlock
        | TextImageBlock
        | PageHeader
        | TestimonialBlock;
      localized: true;
    };
    tags: {
      type: 'links';
      localized: true;
    };
    related_blog_posts: {
      type: 'links';
      localized: true;
    };
  }
>;
export const BlogPost = {
  ID: '38241',
  REF: { type: 'item_type', id: '38241' },
} as const;

export type Event = ItemTypeDefinition<
  EnvironmentSettings,
  'B8TFed2BRpm0UNT-SbXX4w',
  {
    title: {
      type: 'string';
    };
    slug: {
      type: 'slug';
    };
    seo: {
      type: 'seo';
    };
    header_illustration: {
      type: 'file';
    };
    date: {
      type: 'date_time';
    };
    image: {
      type: 'file';
    };
    event_is_online: {
      type: 'boolean';
    };
    online_event_url: {
      type: 'string';
    };
    location: {
      type: 'link';
    };
    price: {
      type: 'string';
    };
    url: {
      type: 'string';
    };
    call_to_action_label: {
      type: 'string';
    };
    tags: {
      type: 'links';
    };
    body_blocks: {
      type: 'rich_text';
      blocks:
        | ImageGridBlock
        | TextBlock
        | ImageBlock
        | CodeBlock
        | PageListBlock
        | TeamGallery
        | BlogListBlock
        | EventsList
        | EmbedBlock
        | GalleryBlock
        | PagePartialBlock
        | VideoEmbedBlock
        | ReachOutBlock
        | GroupingBlock
        | CaseListBlock
        | GlossaryList
        | ActionBlock
        | LogoGrid
        | VideoBlock
        | TextImageBlock
        | PageHeader
        | TestimonialBlock;
    };
    preview: {
      type: 'json';
    };
  }
>;
export const Event = {
  ID: 'B8TFed2BRpm0UNT-SbXX4w',
  REF: { type: 'item_type', id: 'B8TFed2BRpm0UNT-SbXX4w' },
} as const;

export type ImageBlock = ItemTypeDefinition<
  EnvironmentSettings,
  '41672',
  {
    image: {
      type: 'file';
    };
    caption: {
      type: 'string';
    };
    full_width: {
      type: 'boolean';
    };
    caption_position: {
      type: 'string';
    };
  }
>;
export const ImageBlock = {
  ID: '41672',
  REF: { type: 'item_type', id: '41672' },
} as const;

export type CodeBlock = ItemTypeDefinition<
  EnvironmentSettings,
  '44961',
  {
    language: {
      type: 'string';
    };
    body: {
      type: 'text';
    };
  }
>;
export const CodeBlock = {
  ID: '44961',
  REF: { type: 'item_type', id: '44961' },
} as const;

export type TeamGallery = ItemTypeDefinition<
  EnvironmentSettings,
  '1646744',
  {
    persons: {
      type: 'links';
    };
  }
>;
export const TeamGallery = {
  ID: '1646744',
  REF: { type: 'item_type', id: '1646744' },
} as const;

export type BlogListBlock = ItemTypeDefinition<
  EnvironmentSettings,
  '1514671',
  {
    title: {
      type: 'string';
    };
    items: {
      type: 'links';
    };
    pinned_items: {
      type: 'links';
    };
    item_size: {
      type: 'string';
    };
    description: {
      type: 'text';
    };
    tag_filter: {
      type: 'link';
    };
  }
>;
export const BlogListBlock = {
  ID: '1514671',
  REF: { type: 'item_type', id: '1514671' },
} as const;

export type EventsList = ItemTypeDefinition<
  EnvironmentSettings,
  '1517179',
  {
    title: {
      type: 'string';
    };
    items: {
      type: 'links';
    };
  }
>;
export const EventsList = {
  ID: '1517179',
  REF: { type: 'item_type', id: '1517179' },
} as const;

export type EmbedBlock = ItemTypeDefinition<
  EnvironmentSettings,
  '1854913',
  {
    title: {
      type: 'string';
    };
    url: {
      type: 'string';
    };
    caption: {
      type: 'string';
    };
    preview_type: {
      type: 'string';
    };
    data: {
      type: 'json';
    };
  }
>;
export const EmbedBlock = {
  ID: '1854913',
  REF: { type: 'item_type', id: '1854913' },
} as const;

export type GalleryBlock = ItemTypeDefinition<
  EnvironmentSettings,
  '1992764',
  {
    gallery: {
      type: 'link';
    };
    title: {
      type: 'string';
    };
    images: {
      type: 'gallery';
    };
  }
>;
export const GalleryBlock = {
  ID: '1992764',
  REF: { type: 'item_type', id: '1992764' },
} as const;

export type ExternalLink = ItemTypeDefinition<
  EnvironmentSettings,
  '2034503',
  {
    title: {
      type: 'string';
    };
    url: {
      type: 'string';
    };
    style: {
      type: 'string';
    };
    open_in_new_tab: {
      type: 'boolean';
    };
  }
>;
export const ExternalLink = {
  ID: '2034503',
  REF: { type: 'item_type', id: '2034503' },
} as const;

export type InternalLink = ItemTypeDefinition<
  EnvironmentSettings,
  '2037919',
  {
    title: {
      type: 'string';
    };
    link: {
      type: 'link';
    };
    style: {
      type: 'string';
    };
  }
>;
export const InternalLink = {
  ID: '2037919',
  REF: { type: 'item_type', id: '2037919' },
} as const;

export type PagePartialBlock = ItemTypeDefinition<
  EnvironmentSettings,
  'G8-kViMTTG62MbHNzPc7PQ',
  {
    item: {
      type: 'link';
    };
    layout: {
      type: 'string';
    };
    theme: {
      type: 'string';
    };
  }
>;
export const PagePartialBlock = {
  ID: 'G8-kViMTTG62MbHNzPc7PQ',
  REF: { type: 'item_type', id: 'G8-kViMTTG62MbHNzPc7PQ' },
} as const;

export type VideoEmbedBlock = ItemTypeDefinition<
  EnvironmentSettings,
  'Y2qM8sXMR0-lwk-NZ0YZNg',
  {
    video: {
      type: 'video';
    };
    mute: {
      type: 'boolean';
    };
    autoplay: {
      type: 'boolean';
    };
    loop: {
      type: 'boolean';
    };
    caption: {
      type: 'string';
    };
  }
>;
export const VideoEmbedBlock = {
  ID: 'Y2qM8sXMR0-lwk-NZ0YZNg',
  REF: { type: 'item_type', id: 'Y2qM8sXMR0-lwk-NZ0YZNg' },
} as const;

export type ReachOutBlock = ItemTypeDefinition<
  EnvironmentSettings,
  'ZoimmZOiR0mkjwIEXN-9Ag',
  {
    title: {
      type: 'string';
    };
    body: {
      type: 'text';
    };
    form_type: {
      type: 'string';
    };
    cta: {
      type: 'single_block';
      blocks: ActionBlock;
    };
    contact_person: {
      type: 'link';
    };
  }
>;
export const ReachOutBlock = {
  ID: 'ZoimmZOiR0mkjwIEXN-9Ag',
  REF: { type: 'item_type', id: 'ZoimmZOiR0mkjwIEXN-9Ag' },
} as const;

export type GroupingItem = ItemTypeDefinition<
  EnvironmentSettings,
  'X-p4BCeGTZW3byYyovSV2g',
  {
    title: {
      type: 'string';
    };
    sections: {
      type: 'rich_text';
      blocks:
        | ImageGridBlock
        | TextBlock
        | ImageBlock
        | CodeBlock
        | TeamGallery
        | BlogListBlock
        | EventsList
        | EmbedBlock
        | GalleryBlock
        | VideoEmbedBlock
        | ReachOutBlock
        | CaseListBlock
        | ActionBlock
        | LogoGrid
        | VideoBlock
        | TextImageBlock
        | TestimonialBlock;
    };
  }
>;
export const GroupingItem = {
  ID: 'X-p4BCeGTZW3byYyovSV2g',
  REF: { type: 'item_type', id: 'X-p4BCeGTZW3byYyovSV2g' },
} as const;

export type GroupingBlock = ItemTypeDefinition<
  EnvironmentSettings,
  'CrAZK2ukS-Cev0D-CSbA2g',
  {
    theme: {
      type: 'string';
    };
    accent_position: {
      type: 'string';
    };
    items: {
      type: 'rich_text';
      blocks: GroupingItem;
    };
  }
>;
export const GroupingBlock = {
  ID: 'CrAZK2ukS-Cev0D-CSbA2g',
  REF: { type: 'item_type', id: 'CrAZK2ukS-Cev0D-CSbA2g' },
} as const;

export type CaseListBlock = ItemTypeDefinition<
  EnvironmentSettings,
  '2486431',
  {
    title: {
      type: 'string';
    };
    cases: {
      type: 'links';
    };
    columns: {
      type: 'integer';
    };
    text: {
      type: 'structured_text';
      blocks: ExternalLink | InternalLink;
    };
  }
>;
export const CaseListBlock = {
  ID: '2486431',
  REF: { type: 'item_type', id: '2486431' },
} as const;

export type GlossaryList = ItemTypeDefinition<
  EnvironmentSettings,
  'AjYd96IgQYuBzefFaL5VBA',
  {
    title: {
      type: 'string';
    };
  }
>;
export const GlossaryList = {
  ID: 'AjYd96IgQYuBzefFaL5VBA',
  REF: { type: 'item_type', id: 'AjYd96IgQYuBzefFaL5VBA' },
} as const;

export type Person = ItemTypeDefinition<
  EnvironmentSettings,
  '38233',
  {
    name: {
      type: 'string';
    };
    last_name: {
      type: 'string';
    };
    biography: {
      type: 'text';
      localized: true;
    };
    slug: {
      type: 'slug';
    };
    image: {
      type: 'file';
    };
    job_title: {
      type: 'string';
      localized: true;
    };
    employment_status: {
      type: 'string';
    };
    meet: {
      type: 'link';
    };
    links: {
      type: 'rich_text';
      blocks: ExternalLink;
    };
    meet_url: {
      type: 'string';
    };
  }
>;
export const Person = {
  ID: '38233',
  REF: { type: 'item_type', id: '38233' },
} as const;

export type Tag = ItemTypeDefinition<
  EnvironmentSettings,
  'ZCFTBhXpQAG6_zAdrRb7Sw',
  {
    title: {
      type: 'string';
      localized: true;
    };
    slug: {
      type: 'slug';
      localized: true;
    };
    seo: {
      type: 'seo';
      localized: true;
    };
    description: {
      type: 'string';
      localized: true;
    };
    category: {
      type: 'string';
    };
  }
>;
export const Tag = {
  ID: 'ZCFTBhXpQAG6_zAdrRb7Sw',
  REF: { type: 'item_type', id: 'ZCFTBhXpQAG6_zAdrRb7Sw' },
} as const;

export type GlossaryTerm = ItemTypeDefinition<
  EnvironmentSettings,
  'IsaADh7aRxGueq_pxmIIQg',
  {
    term: {
      type: 'string';
      localized: true;
    };
    question: {
      type: 'string';
      localized: true;
    };
    definition: {
      type: 'text';
      localized: true;
    };
    slug: {
      type: 'slug';
      localized: true;
    };
  }
>;
export const GlossaryTerm = {
  ID: 'IsaADh7aRxGueq_pxmIIQg',
  REF: { type: 'item_type', id: 'IsaADh7aRxGueq_pxmIIQg' },
} as const;

export type Translation = ItemTypeDefinition<
  EnvironmentSettings,
  '55443',
  {
    key: {
      type: 'string';
    };
    value: {
      type: 'string';
      localized: true;
    };
  }
>;
export const Translation = {
  ID: '55443',
  REF: { type: 'item_type', id: '55443' },
} as const;

export type Variable = ItemTypeDefinition<
  EnvironmentSettings,
  'L6a2Mj5KS_qRdydb0Z2Xvg',
  {
    title: {
      type: 'string';
    };
    value: {
      type: 'string';
    };
    display_title: {
      type: 'string';
    };
  }
>;
export const Variable = {
  ID: 'L6a2Mj5KS_qRdydb0Z2Xvg',
  REF: { type: 'item_type', id: 'L6a2Mj5KS_qRdydb0Z2Xvg' },
} as const;

export type File = ItemTypeDefinition<
  EnvironmentSettings,
  'W_zSJuzrSSuzn0SnVT_JMQ',
  {
    file: {
      type: 'file';
    };
    title: {
      type: 'string';
    };
    locale: {
      type: 'string';
    };
    path: {
      type: 'string';
    };
  }
>;
export const File = {
  ID: 'W_zSJuzrSSuzn0SnVT_JMQ',
  REF: { type: 'item_type', id: 'W_zSJuzrSSuzn0SnVT_JMQ' },
} as const;

export type VideoTextTrack = ItemTypeDefinition<
  EnvironmentSettings,
  'OhsH2XDJS2qEzac6_EB-og',
  {
    title: {
      type: 'string';
    };
    locale: {
      type: 'string';
    };
    kind: {
      type: 'string';
    };
    file: {
      type: 'file';
    };
  }
>;
export const VideoTextTrack = {
  ID: 'OhsH2XDJS2qEzac6_EB-og',
  REF: { type: 'item_type', id: 'OhsH2XDJS2qEzac6_EB-og' },
} as const;

export type PhoneLink = ItemTypeDefinition<
  EnvironmentSettings,
  'PzxBO0r6Q96tjYZUbDFQZw',
  {
    title: {
      type: 'string';
    };
    phone_number: {
      type: 'string';
    };
    action: {
      type: 'string';
    };
    text: {
      type: 'text';
    };
    style: {
      type: 'string';
    };
  }
>;
export const PhoneLink = {
  ID: 'PzxBO0r6Q96tjYZUbDFQZw',
  REF: { type: 'item_type', id: 'PzxBO0r6Q96tjYZUbDFQZw' },
} as const;

export type EmailLink = ItemTypeDefinition<
  EnvironmentSettings,
  'TAcLhURzReOmXoCzBBJIVw',
  {
    title: {
      type: 'string';
    };
    email_address: {
      type: 'string';
    };
    email_subject: {
      type: 'string';
    };
    email_body: {
      type: 'text';
    };
    style: {
      type: 'string';
    };
  }
>;
export const EmailLink = {
  ID: 'TAcLhURzReOmXoCzBBJIVw',
  REF: { type: 'item_type', id: 'TAcLhURzReOmXoCzBBJIVw' },
} as const;

export type MenuItemExternal = ItemTypeDefinition<
  EnvironmentSettings,
  'AsdSlbiUTlqZqGBehW0Ixw',
  {
    title: {
      type: 'string';
    };
    link: {
      type: 'string';
    };
    style: {
      type: 'string';
    };
    image: {
      type: 'file';
    };
    items: {
      type: 'rich_text';
      blocks:
        | MenuItemExternal
        | MenuItemInternal
        | MenuItemContact
        | MenuItemGroup;
    };
  }
>;
export const MenuItemExternal = {
  ID: 'AsdSlbiUTlqZqGBehW0Ixw',
  REF: { type: 'item_type', id: 'AsdSlbiUTlqZqGBehW0Ixw' },
} as const;

export type MenuItemGroup = ItemTypeDefinition<
  EnvironmentSettings,
  'NI6SMMD4RaiWpqZTp5Pk7A',
  {
    title: {
      type: 'string';
    };
    items: {
      type: 'rich_text';
      blocks:
        | MenuItemExternal
        | MenuItemInternal
        | MenuItemContact
        | MenuItemGroup;
    };
  }
>;
export const MenuItemGroup = {
  ID: 'NI6SMMD4RaiWpqZTp5Pk7A',
  REF: { type: 'item_type', id: 'NI6SMMD4RaiWpqZTp5Pk7A' },
} as const;

export type MenuItemInternal = ItemTypeDefinition<
  EnvironmentSettings,
  'Gmt9CYf7TZGB8SdBQF5PtQ',
  {
    title: {
      type: 'string';
    };
    link: {
      type: 'link';
    };
    style: {
      type: 'string';
    };
    image: {
      type: 'file';
    };
    items: {
      type: 'rich_text';
      blocks:
        | MenuItemExternal
        | MenuItemInternal
        | MenuItemContact
        | MenuItemGroup;
    };
  }
>;
export const MenuItemInternal = {
  ID: 'Gmt9CYf7TZGB8SdBQF5PtQ',
  REF: { type: 'item_type', id: 'Gmt9CYf7TZGB8SdBQF5PtQ' },
} as const;

export type ActionBlock = ItemTypeDefinition<
  EnvironmentSettings,
  'RdEUS5_JT0yu3cYRxaPVqw',
  {
    items: {
      type: 'rich_text';
      blocks: ExternalLink | InternalLink | PhoneLink | EmailLink;
    };
  }
>;
export const ActionBlock = {
  ID: 'RdEUS5_JT0yu3cYRxaPVqw',
  REF: { type: 'item_type', id: 'RdEUS5_JT0yu3cYRxaPVqw' },
} as const;

export type LogoGrid = ItemTypeDefinition<
  EnvironmentSettings,
  'WD0Wl9MeQpOid4dRmNTUfw',
  {
    title: {
      type: 'string';
    };
    logos: {
      type: 'gallery';
    };
  }
>;
export const LogoGrid = {
  ID: 'WD0Wl9MeQpOid4dRmNTUfw',
  REF: { type: 'item_type', id: 'WD0Wl9MeQpOid4dRmNTUfw' },
} as const;

export type VideoBlock = ItemTypeDefinition<
  EnvironmentSettings,
  'SZkO6JPMR5a1TLgwpOLVkw',
  {
    video_asset: {
      type: 'file';
    };
    title: {
      type: 'string';
    };
    autoplay: {
      type: 'boolean';
    };
    mute: {
      type: 'boolean';
    };
    loop: {
      type: 'boolean';
    };
    tracks: {
      type: 'links';
    };
  }
>;
export const VideoBlock = {
  ID: 'SZkO6JPMR5a1TLgwpOLVkw',
  REF: { type: 'item_type', id: 'SZkO6JPMR5a1TLgwpOLVkw' },
} as const;

export type VariableBlock = ItemTypeDefinition<
  EnvironmentSettings,
  'UlmN1uACR0KcQEmO_TP3oA',
  {
    variable: {
      type: 'link';
    };
  }
>;
export const VariableBlock = {
  ID: 'UlmN1uACR0KcQEmO_TP3oA',
  REF: { type: 'item_type', id: 'UlmN1uACR0KcQEmO_TP3oA' },
} as const;

export type IconBlock = ItemTypeDefinition<
  EnvironmentSettings,
  'B5m5y2NfSASVJ6CIBm3F5A',
  {
    name: {
      type: 'string';
    };
    title: {
      type: 'string';
    };
  }
>;
export const IconBlock = {
  ID: 'B5m5y2NfSASVJ6CIBm3F5A',
  REF: { type: 'item_type', id: 'B5m5y2NfSASVJ6CIBm3F5A' },
} as const;

export type NotFoundPage = ItemTypeDefinition<
  EnvironmentSettings,
  'PldEcOf6RyKvEBdsuM1TwQ',
  {
    title: {
      type: 'string';
    };
    body_blocks: {
      type: 'rich_text';
      blocks:
        | ImageGridBlock
        | TextBlock
        | ImageBlock
        | CodeBlock
        | PageListBlock
        | TeamGallery
        | BlogListBlock
        | EventsList
        | EmbedBlock
        | GalleryBlock
        | PagePartialBlock
        | VideoEmbedBlock
        | ReachOutBlock
        | GroupingBlock
        | CaseListBlock
        | GlossaryList
        | ActionBlock
        | LogoGrid
        | VideoBlock
        | TextImageBlock
        | PageHeader
        | TestimonialBlock;
    };
    preview: {
      type: 'json';
    };
  }
>;
export const NotFoundPage = {
  ID: 'PldEcOf6RyKvEBdsuM1TwQ',
  REF: { type: 'item_type', id: 'PldEcOf6RyKvEBdsuM1TwQ' },
} as const;

export type TextImageBlock = ItemTypeDefinition<
  EnvironmentSettings,
  'CL2tcnR9TimpzQxNR2RKCg',
  {
    text: {
      type: 'structured_text';
      blocks: ImageBlock | ActionBlock | VideoBlock | VideoEmbedBlock;
      inline_blocks: IconBlock | VariableBlock;
    };
    image: {
      type: 'file';
    };
    layout: {
      type: 'string';
    };
    style: {
      type: 'string';
    };
  }
>;
export const TextImageBlock = {
  ID: 'CL2tcnR9TimpzQxNR2RKCg',
  REF: { type: 'item_type', id: 'CL2tcnR9TimpzQxNR2RKCg' },
} as const;

export type Page = ItemTypeDefinition<
  EnvironmentSettings,
  '2035421',
  {
    body_blocks: {
      type: 'rich_text';
      blocks:
        | ImageGridBlock
        | TextBlock
        | ImageBlock
        | CodeBlock
        | PageListBlock
        | TeamGallery
        | BlogListBlock
        | EventsList
        | EmbedBlock
        | GalleryBlock
        | PagePartialBlock
        | VideoEmbedBlock
        | ReachOutBlock
        | GroupingBlock
        | CaseListBlock
        | GlossaryList
        | ActionBlock
        | LogoGrid
        | VideoBlock
        | TextImageBlock
        | PageHeader
        | TestimonialBlock
        | LocationsList;
      localized: true;
    };
    title: {
      type: 'string';
      localized: true;
    };
    slug: {
      type: 'slug';
    };
    seo: {
      type: 'seo';
      localized: true;
    };
    preview_link: {
      type: 'json';
    };
    subtitle: {
      type: 'string';
    };
    preview_image: {
      type: 'file';
    };
    tags: {
      type: 'links';
    };
    parent_page: {
      type: 'link';
    };
    has_table_of_contents: {
      type: 'boolean';
    };
  }
>;
export const Page = {
  ID: '2035421',
  REF: { type: 'item_type', id: '2035421' },
} as const;

export type PageHeader = ItemTypeDefinition<
  EnvironmentSettings,
  '2037668',
  {
    layout: {
      type: 'string';
    };
    style: {
      type: 'string';
    };
    title: {
      type: 'string';
    };
    subtitle: {
      type: 'string';
    };
    illustration: {
      type: 'file';
    };
    body: {
      type: 'text';
    };
  }
>;
export const PageHeader = {
  ID: '2037668',
  REF: { type: 'item_type', id: '2037668' },
} as const;

export type TestimonialBlock = ItemTypeDefinition<
  EnvironmentSettings,
  '316629',
  {
    author: {
      type: 'string';
    };
    company: {
      type: 'string';
    };
    quote: {
      type: 'text';
    };
    validated: {
      type: 'boolean';
    };
    fullwidth: {
      type: 'boolean';
    };
  }
>;
export const TestimonialBlock = {
  ID: '316629',
  REF: { type: 'item_type', id: '316629' },
} as const;

export type RedirectRule = ItemTypeDefinition<
  EnvironmentSettings,
  '49825',
  {
    from: {
      type: 'string';
    };
    to: {
      type: 'string';
    };
    status_code: {
      type: 'string';
    };
    position: {
      type: 'integer';
    };
  }
>;
export const RedirectRule = {
  ID: '49825',
  REF: { type: 'item_type', id: '49825' },
} as const;

export type ImageGridItem = ItemTypeDefinition<
  EnvironmentSettings,
  'YMMwC_xjQ6qxjCepnLpPug',
  {
    title: {
      type: 'string';
    };
    image: {
      type: 'file';
    };
    body: {
      type: 'structured_text';
    };
    cta: {
      type: 'single_block';
      blocks: ActionBlock;
    };
    is_full_width: {
      type: 'boolean';
    };
  }
>;
export const ImageGridItem = {
  ID: 'YMMwC_xjQ6qxjCepnLpPug',
  REF: { type: 'item_type', id: 'YMMwC_xjQ6qxjCepnLpPug' },
} as const;

export type LocationsList = ItemTypeDefinition<
  EnvironmentSettings,
  'YGGNy1QFS7yVRpoeaBxYTg',
  {
    title: {
      type: 'string';
    };
    items: {
      type: 'links';
    };
  }
>;
export const LocationsList = {
  ID: 'YGGNy1QFS7yVRpoeaBxYTg',
  REF: { type: 'item_type', id: 'YGGNy1QFS7yVRpoeaBxYTg' },
} as const;

export type PageListBlock = ItemTypeDefinition<
  EnvironmentSettings,
  '1466128',
  {
    jobs: {
      type: 'links';
    };
    title: {
      type: 'string';
    };
    tag_filter: {
      type: 'link';
    };
    pinned: {
      type: 'links';
    };
    columns: {
      type: 'integer';
    };
  }
>;
export const PageListBlock = {
  ID: '1466128',
  REF: { type: 'item_type', id: '1466128' },
} as const;

export type SchemaMigration = ItemTypeDefinition<
  EnvironmentSettings,
  '1757573',
  {
    name: {
      type: 'string';
    };
  }
>;
export const SchemaMigration = {
  ID: '1757573',
  REF: { type: 'item_type', id: '1757573' },
} as const;

export type App = ItemTypeDefinition<
  EnvironmentSettings,
  '57935',
  {
    contact_email: {
      type: 'single_block';
      blocks: EmailLink;
      localized: true;
    };
    footer_items: {
      type: 'rich_text';
      blocks: MenuItemExternal | MenuItemInternal | MenuItemGroup;
      localized: true;
    };
    menu_items: {
      type: 'rich_text';
      blocks: MenuItemExternal | MenuItemInternal | MenuItemGroup;
      localized: true;
    };
    socials: {
      type: 'rich_text';
      blocks: Social;
      localized: true;
    };
    certificates: {
      type: 'rich_text';
      blocks: MenuItemExternal | MenuItemInternal;
      localized: true;
    };
    legal_items: {
      type: 'rich_text';
      blocks:
        | ExternalLink
        | InternalLink
        | PhoneLink
        | EmailLink
        | VariableBlock;
      localized: true;
    };
    privacy: {
      type: 'rich_text';
      blocks:
        | ExternalLink
        | InternalLink
        | PhoneLink
        | EmailLink
        | VariableBlock;
      localized: true;
    };
  }
>;
export const App = {
  ID: '57935',
  REF: { type: 'item_type', id: '57935' },
} as const;

export type Location = ItemTypeDefinition<
  EnvironmentSettings,
  '1068766',
  {
    image: {
      type: 'file';
    };
    title: {
      type: 'string';
    };
    body: {
      type: 'string';
    };
    address: {
      type: 'string';
    };
    postal_code: {
      type: 'string';
    };
    city: {
      type: 'string';
    };
    country_code: {
      type: 'string';
    };
    google_maps: {
      type: 'string';
    };
  }
>;
export const Location = {
  ID: '1068766',
  REF: { type: 'item_type', id: '1068766' },
} as const;

export type HomePage = ItemTypeDefinition<
  EnvironmentSettings,
  'NDtfKQsmTP6B48gv9tf8dg',
  {
    title: {
      type: 'string';
      localized: true;
    };
    seo: {
      type: 'seo';
      localized: true;
    };
    body_blocks: {
      type: 'rich_text';
      blocks:
        | ImageGridBlock
        | TextBlock
        | ImageBlock
        | CodeBlock
        | PageListBlock
        | TeamGallery
        | BlogListBlock
        | EventsList
        | EmbedBlock
        | GalleryBlock
        | PagePartialBlock
        | VideoEmbedBlock
        | ReachOutBlock
        | GroupingBlock
        | CaseListBlock
        | GlossaryList
        | ActionBlock
        | LogoGrid
        | VideoBlock
        | TextImageBlock
        | PageHeader
        | TestimonialBlock;
      localized: true;
    };
    preview: {
      type: 'json';
    };
  }
>;
export const HomePage = {
  ID: 'NDtfKQsmTP6B48gv9tf8dg',
  REF: { type: 'item_type', id: 'NDtfKQsmTP6B48gv9tf8dg' },
} as const;

export type AnyBlock =
  | ImageGridBlock
  | TextBlock
  | MenuItemContact
  | Social
  | ImageBlock
  | CodeBlock
  | TeamGallery
  | BlogListBlock
  | EventsList
  | EmbedBlock
  | GalleryBlock
  | ExternalLink
  | InternalLink
  | PagePartialBlock
  | VideoEmbedBlock
  | ReachOutBlock
  | GroupingItem
  | GroupingBlock
  | CaseListBlock
  | GlossaryList
  | PhoneLink
  | EmailLink
  | MenuItemExternal
  | MenuItemGroup
  | MenuItemInternal
  | ActionBlock
  | LogoGrid
  | VideoBlock
  | VariableBlock
  | IconBlock
  | TextImageBlock
  | PageHeader
  | TestimonialBlock
  | ImageGridItem
  | LocationsList
  | PageListBlock;
export type AnyModel =
  | CaseItem
  | PagePartial
  | BlogPost
  | Event
  | Person
  | Tag
  | GlossaryTerm
  | Translation
  | Variable
  | File
  | VideoTextTrack
  | NotFoundPage
  | Page
  | RedirectRule
  | SchemaMigration
  | App
  | Location
  | HomePage;
export type AnyBlockOrModel = AnyBlock | AnyModel;
