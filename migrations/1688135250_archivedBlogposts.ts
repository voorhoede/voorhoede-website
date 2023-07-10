import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Boolean field "Is archived?" (`is_archived`) in model "Blog post" (`blog_post`)'
  );
  newFields["10418257"] = await client.fields.create("38241", {
    label: "Is archived?",
    field_type: "boolean",
    api_key: "is_archived",
    hint: "Archived blogposts will not appear in the blog overview but will remain accessible. A banner will be displayed on top explaning that they are outdated.",
    appearance: { addons: [], editor: "boolean", parameters: {} },
  });

  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Boolean field "Is archived?" (`is_archived`) in model "Blog post" (`blog_post`)'
  );
  await client.fields.update(newFields["10418257"], { position: 0 });

  console.log("Create new translations");

  await client.items.create({
    item_type: { type: 'item_type', id: '55443' },
    key: 'archived_blogpost',
    value: {
      en: 'This post is pretty old, and might contain outdated advice or links. We’re keeping it online, but recommend that you check newer posts to see if there’s a better approach.',
      nl: 'Dit bericht is behoorlijk oud en bevat mogelijk achterhaald advies of links. We houden het online, maar raden u aan nieuwere berichten te controleren om te zien of er een betere aanpak is.',
    }
  });
}
