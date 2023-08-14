import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Destroy fields in existing models/block models");

  console.log(
    'Delete Slug field "Slug" (`slug`) in model "Blog post overview" (`blog_post_overview`)'
  );
  await client.fields.destroy("152917");

  console.log(
    'Delete Slug field "Slug" (`slug`) in model "Contact" (`contact`)'
  );
  await client.fields.destroy("152881");

  console.log(
    'Delete Slug field "Slug" (`slug`) in model "Case overview" (`case_overview`)'
  );
  await client.fields.destroy("153632");

  console.log('Delete Slug field "Slug" (`slug`) in model "Home" (`home`)');
  await client.fields.destroy("152880");

  console.log(
    'Delete Slug field "Slug" (`slug`) in model "Event overview" (`event_overview`)'
  );
  await client.fields.destroy("152883");

  console.log(
    'Delete Slug field "Slug" (`slug`) in model "Service overview" (`service_overview`)'
  );
  await client.fields.destroy("153586");

  console.log('Delete Slug field "Slug" (`slug`) in model "FAQ" (`faq`)');
  await client.fields.destroy("163402");

  console.log(
    'Delete Slug field "Slug" (`slug`) in model "Work At" (`workat`)'
  );
  await client.fields.destroy("4076424");

  console.log(
    'Delete Slug field "Slug" (`slug`) in model "Lustrum" (`lustrum`)'
  );
  await client.fields.destroy("10111731");
}
