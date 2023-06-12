import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Destroy models/block models");

  console.log('Delete model "Work At" (`workat`)');
  await client.itemTypes.destroy("862258", { skip_menu_items_deletion: true });

  console.log('Delete model "Lustrum" (`lustrum`)');
  await client.itemTypes.destroy("1993980", { skip_menu_items_deletion: true });

  console.log("Manage menu items");

  console.log('Delete menu item "Work at"');
  await client.menuItems.destroy("591682");

  console.log('Delete menu item "Lustrum"');
  await client.menuItems.destroy("1236367");

  console.log('Update menu item "Pivots"');
  await client.menuItems.update("52453", { position: 57 });

  console.log('Update menu item "Testimonials"');
  await client.menuItems.update("249748", { position: 58 });

  console.log('Update menu item "Interstitial CTA"');
  await client.menuItems.update("601507", { position: 33 });

  console.log('Update menu item "Schema migration"');
  await client.menuItems.update("831459", { position: 59 });

  console.log('Update menu item "Services"');
  await client.menuItems.update("36559", { position: 20 });
}
