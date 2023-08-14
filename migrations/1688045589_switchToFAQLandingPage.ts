import { Client, SimpleSchemaTypes, buildBlockRecord } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Modular content field "Links" (`links`) in model "Footer" (`footer`)'
  );
  newFields["9879165"] = await client.fields.create("47595", {
    label: "Links",
    field_type: "rich_text",
    api_key: "links",
    localized: true,
    validators: { rich_text_blocks: { item_types: ["2037919"] } },
    appearance: {
      addons: [],
      editor: "rich_text",
      parameters: { start_collapsed: false },
    },
    default_value: { en: null, nl: null },
  });

  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Modular content field "Links" (`links`) in model "Footer" (`footer`)'
  );
  await client.fields.update(newFields["9879165"], { position: 0 });

  console.log("Destroy models/block models");

  console.log('Delete model "FAQ" (`faq`)');
  await client.itemTypes.destroy("41818", { skip_menu_items_deletion: true });

  console.log("Manage menu items");

  console.log('Delete menu item "FAQ page"');
  await client.menuItems.destroy("37953");

  console.log('Update menu item "Jobs"');
  await client.menuItems.update("36558", { position: 18 });

  console.log('Update menu item "Services"');
  await client.menuItems.update("36559", { position: 20 });

  console.log('Update menu item "Pivots"');
  await client.menuItems.update("52453", { position: 57 });

  console.log('Update menu item "Testimonials"');
  await client.menuItems.update("249748", { position: 58 });

  console.log('Update menu item "Interstitial CTA"');
  await client.menuItems.update("601507", { position: 33 });

  console.log('Update menu item "Schema migration"');
  await client.menuItems.update("831459", { position: 59 });

  console.log("Finalize models/block models/records");

  console.log('Update the FAQ landing page slug to "faq"');
  await client.items.update('143190383', {
    slug: 'faq',
  });

  console.log("Publish FAQ landing page")
  await client.items.publish('143190383');

  console.log('Add links to Footer')
  await client.items.update('433576', {
    links: {
      en: [
        buildBlockRecord({
          item_type: { type: 'item_type', id: '2037919' },
          title: 'Impact',
          link: '111438583'
        }),
        buildBlockRecord({
          item_type: { type: 'item_type', id: '2037919' },
          title: 'Services',
          link: '363596'
        }),
        buildBlockRecord({
          item_type: { type: 'item_type', id: '2037919' },
          title: 'Cases',
          link: '340361'
        }),
        buildBlockRecord({
          item_type: { type: 'item_type', id: '2037919' },
          title: 'Blog',
          link: '340358'
        }),
        buildBlockRecord({
          item_type: { type: 'item_type', id: '2037919' },
          title: 'About us',
          link: '148229180'
        }),
        buildBlockRecord({
          item_type: { type: 'item_type', id: '2037919' },
          title: 'Contact',
          link: '340359'
        }),
        buildBlockRecord({
          item_type: { type: 'item_type', id: '2037919' },
          title: 'FAQ',
          link: '143190383'
        }),
      ],
      nl: [
        buildBlockRecord({
          item_type: { type: 'item_type', id: '2037919' },
          title: 'Impact',
          link: '111438583'
        }),
        buildBlockRecord({
          item_type: { type: 'item_type', id: '2037919' },
          title: 'Services',
          link: '363596'
        }),
        buildBlockRecord({
          item_type: { type: 'item_type', id: '2037919' },
          title: 'Cases',
          link: '340361'
        }),
        buildBlockRecord({
          item_type: { type: 'item_type', id: '2037919' },
          title: 'Blog',
          link: '340358'
        }),
        buildBlockRecord({
          item_type: { type: 'item_type', id: '2037919' },
          title: 'Over ons',
          link: '148229180'
        }),
        buildBlockRecord({
          item_type: { type: 'item_type', id: '2037919' },
          title: 'Contact',
          link: '340359'
        }),
        buildBlockRecord({
          item_type: { type: 'item_type', id: '2037919' },
          title: 'FAQ',
          link: '143190383'
        }),
      ]
    }
  });
}
