import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  await client.items.create({
    item_type: { type: 'item_type', id: '55443' },
    key: 'youtube_video_cookie_notice',
    value: {
      en: 'Playing this video requires sharing information with YouTube.',
      nl: 'Voor het afspelen van deze video is het delen van informatie met YouTube vereist.',
    }
  });

  await client.items.create({
    item_type: { type: 'item_type', id: '55443' },
    key: 'play_youtube_video',
    value: {
      en: 'Watch YouTube video',
      nl: 'Bekijk YouTube video',
    }
  });
}
