import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  await client.items.create({
    item_type: { type: 'item_type', id: '55443' },
    key: 'cookie_notice_permission',
    value: {
      en: 'By viewing this {{ content }} you give us consent to use cookies.',
      nl: 'Door deze {{ content }} te bekijken geef je ons toestemming om cookies te gebruiken.',
    }
  });

  await client.items.create({
    item_type: { type: 'item_type', id: '55443' },
    key: 'cookie_notice_view_content',
    value: {
      en: 'View {{ content }}',
      nl: 'Bekijk {{ content }}',
    }
  });
}
