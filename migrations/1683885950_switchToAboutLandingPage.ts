import { Client } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Finalize models/block models/records");

  console.log('Update the About us landing page slug to "about-us"');
  await client.items.update('148229180', {
    slug: 'about-us',
  });

  console.log("Publish About us landing page")
  await client.items.publish('148229180');

  console.log('Update About us link to point to the About us landing page');
  await client.items.update('609322', {
    page: '148229180'
  })

  console.log("Destroy models/block models");

  console.log('Delete model "About" (`about`)');
  await client.itemTypes.destroy("38245", { skip_menu_items_deletion: true });

  console.log("Finalize models/block models");

  console.log('Update model "Job overview" (`job_overview`)');
  await client.itemTypes.update("40180", { title_field: null });

  console.log("Manage menu items");

  console.log('Delete menu item "About us"');
  await client.menuItems.destroy("34963");

  console.log('Update menu item "Jobs"');
  await client.menuItems.update("36558", { position: 17 });

  console.log('Update menu item "Services"');
  await client.menuItems.update("36559", { position: 19 });

  console.log('Update menu item "Pivots"');
  await client.menuItems.update("52453", { position: 56 });

  console.log('Update menu item "Testimonials"');
  await client.menuItems.update("249748", { position: 57 });

  console.log('Update menu item "Work at"');
  await client.menuItems.update("591682", { position: 26 });

  console.log('Update menu item "Interstitial CTA"');
  await client.menuItems.update("601507", { position: 32 });

  console.log('Update menu item "Schema migration"');
  await client.menuItems.update("910954", { position: 59 });

  console.log('Update menu item "Lustrum"');
  await client.menuItems.update("1236367", { position: 18 });

  console.log('Update menu item "Landing Page"');
  await client.menuItems.update("1261998", { position: 58 });
}
