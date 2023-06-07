import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newMenuItems: Record<string, SimpleSchemaTypes.MenuItem> = {};

  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Single asset field "Image" (`image`) in block model "Image" (`image`)'
  );
  await client.fields.update("159003", {
    validators: {
      required: {},
      required_alt_title: { title: false, alt: true },
    },
  });

  console.log("Manage menu items");

  console.log('Create menu item "Schema migration"');
  newMenuItems["910954"] = await client.menuItems.create({
    label: "Schema migration",
    item_type: { id: "1757573", type: "item_type" },
  });

  console.log('Update menu item "Landing Page"');
  await client.menuItems.update("1261998", { position: 58 });
}
