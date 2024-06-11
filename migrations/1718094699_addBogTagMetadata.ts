import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Multiple links field "Related blog posts" (`related_blog_posts`) in model "Blog post" (`blog_post`)'
  );
  await client.fields.create("38241", {
    id: "PaprUQNJRqmQhWpbRXWs6w",
    label: "Related blog posts",
    field_type: "links",
    api_key: "related_blog_posts",
    localized: true,
    validators: {
      items_item_type: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: ["38241"],
      },
      size: { min: 0, max: 3 },
    },
    appearance: { addons: [], editor: "links_select", parameters: {} },
  });

  console.log(
    'Create SEO meta tags field "Blog tag social" (`blog_tag_social`) in model "Tag" (`tag`)'
  );
  await client.fields.create("ZCFTBhXpQAG6_zAdrRb7Sw", {
    id: "c1exEEzwSTaXgK5Uq1aTKQ",
    label: "Blog tag social",
    field_type: "seo",
    api_key: "blog_tag_social",
    localized: true,
    validators: {
      required_seo_fields: {
        title: true,
        description: true,
        image: false,
        twitter_card: false,
      },
      title_length: { max: 60 },
      description_length: { max: 160 },
    },
    appearance: {
      addons: [],
      editor: "seo",
      parameters: {
        fields: ["title", "description", "image", "no_index", "twitter_card"],
        previews: [
          "google",
          "twitter",
          "facebook",
          "linkedin",
          "slack",
          "telegram",
          "whatsapp",
        ],
      },
    },
  });

  console.log(
    'Create Single-line string field "Blog topic description" (`blog_topic_description`) in model "Tag" (`tag`)'
  );
  await client.fields.create("ZCFTBhXpQAG6_zAdrRb7Sw", {
    id: "dAMYrpMfRliQyC1Z61ycng",
    label: "Blog topic description",
    field_type: "string",
    api_key: "blog_topic_description",
    localized: true,
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: { en: "", nl: "" },
  });

  console.log("Destroy fields in existing models/block models");

  console.log(
    'Delete SEO meta tags field "Blog Seo" (`blog_seo`) in model "Tag" (`tag`)'
  );
  await client.fields.destroy("a32zYvboQJSyqFw3YZgNMg");

  console.log("Update existing fields/fieldsets");

  console.log(
    'Update SEO meta tags field "Blog tag social" (`blog_tag_social`) in model "Tag" (`tag`)'
  );
  await client.fields.update("c1exEEzwSTaXgK5Uq1aTKQ", { position: 3 });

  console.log(
    'Update Single-line string field "Blog topic description" (`blog_topic_description`) in model "Tag" (`tag`)'
  );
  await client.fields.update("dAMYrpMfRliQyC1Z61ycng", { position: 4 });

  console.log('Update Slug field "Slug" (`slug`) in model "Tag" (`tag`)');
  await client.fields.update("LUB9rEDZQdyciEdTAhIgWQ", { position: 2 });

  console.log("Finalize models/block models");

  console.log('Update model "Blog post" (`blog_post`)');
  await client.itemTypes.update("38241", {
    inverse_relationships_enabled: true,
  });

  console.log('Update model "Tag" (`tag`)');
  await client.itemTypes.update("ZCFTBhXpQAG6_zAdrRb7Sw", {
    inverse_relationships_enabled: true,
  });
}
