import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Modular content field "Items" (`items`) in block model "Section Timeline" (`section_timeline`)'
  );
  await client.fields.update("7518100", {
    appearance: {
      addons: [],
      editor: "rich_text",
      parameters: { start_collapsed: true },
    },
  });

  console.log(
    'Update Modular content field "Items" (`items`) in block model "Section Image Card Grid" (`section_image_card_grid`)'
  );
  await client.fields.update("9103270", {
    appearance: {
      addons: [],
      editor: "rich_text",
      parameters: { start_collapsed: true },
    },
  });

  console.log(
    'Update Modular content field "Items" (`items`) in block model "Tag list" (`structured_text_tag_list`)'
  );
  await client.fields.update("9190211", {
    appearance: {
      addons: [],
      editor: "rich_text",
      parameters: { start_collapsed: true },
    },
  });

  console.log(
    'Update Modular content field "Items" (`items`) in block model "Section Image Grid" (`section_image_grid`)'
  );
  await client.fields.update("10463441", {
    appearance: {
      addons: [],
      editor: "rich_text",
      parameters: { start_collapsed: true },
    },
  });

  console.log("Finalize models/block models");

  console.log('Update block model "Tag list" (`structured_text_tag_list`)');
  await client.itemTypes.update("1775016", { name: "Tag list" });

  console.log('Update model "Page" (`page`)');
  await client.itemTypes.update("2035421", {
    name: "Page",
    api_key: "page",
    collection_appearance: "compact",
  });

  console.log('Update block model "Blue Text" (`structured_text_blue_text`)');
  await client.itemTypes.update("2040400", { name: "Blue Text" });

  console.log(
    'Update block model "Highlighted List" (`structured_text_highlighted_list`)'
  );
  await client.itemTypes.update("2040401", { name: "Highlighted List" });

  console.log(
    'Update block model "Highlighted List Item" (`structured_text_highlighted_list_item`)'
  );
  await client.itemTypes.update("2040402", { name: "Highlighted List Item" });

  console.log(
    'Update block model "Buttons List" (`structured_text_buttons_list`)'
  );
  await client.itemTypes.update("2040408", { name: "Buttons List" });
}
