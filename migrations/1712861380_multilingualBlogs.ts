import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Multiple links field "Pinned posts" (`pinned_posts`) in model "Blog post overview" (`blog_post_overview`)'
  );
  await client.fields.update("10137946", {
    localized: false,
    default_value: null,
  });

  console.log(
    'Update Single-line string field "Title" (`title`) in model "Blog post" (`blog_post`)'
  );
  await client.fields.update("145703", { localized: false, default_value: "" });

  console.log(
    'Update SEO meta tags field "Social" (`social`) in model "Blog post" (`blog_post`)'
  );
  await client.fields.update("145708", {
    localized: false,
    default_value: null,
  });

  console.log(
    'Update Slug field "Slug" (`slug`) in model "Blog post" (`blog_post`)'
  );
  await client.fields.update("145710", {
    localized: false,
    default_value: null,
  });

  console.log(
    'Update Modular content field "Items" (`items`) in model "Blog post" (`blog_post`)'
  );
  await client.fields.update("166560", {
    localized: false,
    default_value: null,
  });

  console.log(
    'Update Single-line string field "Intro title" (`intro_title`) in model "Blog post" (`blog_post`)'
  );
  await client.fields.update("166561", { localized: false, default_value: "" });

  console.log(
    'Update Single-line string field "Subtitle" (`subtitle`) in model "Blog post" (`blog_post`)'
  );
  await client.fields.update("166562", {
    localized: false,
    default_value: "Blog",
  });

  console.log(
    'Update Multiple links field "Pivots" (`pivots`) in model "Blog post" (`blog_post`)'
  );
  await client.fields.update("1128823", {
    localized: false,
    default_value: null,
  });

  console.log("Finalize models/block models");

  console.log('Update model "Blog post" (`blog_post`)');
  await client.itemTypes.update("38241", { all_locales_required: true });
}
