import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Boolean field "Archived?" (`archived`) in model "Blog post" (`blog_post`)'
  );
  newFields["10418257"] = await client.fields.create("38241", {
    label: "Archived?",
    field_type: "boolean",
    api_key: "archived",
    hint: "Archived blogposts will not appear in the blog overview but will remain accessible. A banner will be displayed on top explaning that they are outdated.",
    appearance: { addons: [], editor: "boolean", parameters: {} },
  });

  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Boolean field "Archived?" (`archived`) in model "Blog post" (`blog_post`)'
  );
  await client.fields.update(newFields["10418257"], { position: 0 });
}
