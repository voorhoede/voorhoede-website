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
}
