import { Client } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Modular content field "Items" (`items`) in model "Event item" (`event_item`)'
  );
  await client.fields.update("217329", {
    validators: {
      rich_text_blocks: { item_types: ["41671", "41672", "41885"] },
    },
  });

  console.log(
    'Update Modular content field "Content" (`content`) in model "Case item" (`case_item`)'
  );
  await client.fields.update("158995", {
    validators: {
      rich_text_blocks: {
        item_types: [
          "41671",
          "41672",
          "41885",
          "44361",
          "44374",
          "262363",
          "316629",
        ],
      },
    },
  });

  console.log(
    'Update Modular content field "Items" (`items`) in model "Blog post" (`blog_post`)'
  );
  await client.fields.update("166560", {
    validators: {
      rich_text_blocks: {
        item_types: [
          "41671",
          "41672",
          "41885",
          "44361",
          "44961",
          "45012",
          "262363",
          "1854913",
        ],
      },
    },
  });

  console.log("Destroy models/block models");

  console.log(
    'Delete model "[Deprecated] Image with description" (`image_with_description`)'
  );
  await client.itemTypes.destroy("41923", { skip_menu_items_deletion: true });

  console.log(
    'Delete block model "[Deprecated] Image with text" (`image_with_text`)'
  );
  await client.itemTypes.destroy("41924", { skip_menu_items_deletion: true });

  console.log("Manage menu items");

  console.log('Delete menu item "Images with description"');
  await client.menuItems.destroy("38035");

  console.log('Update menu item "People"');
  await client.menuItems.update("34965", { position: 9 });

  console.log('Update menu item "Redirects"');
  await client.menuItems.update("43816", { position: 11 });

  console.log('Update menu item "Translations"');
  await client.menuItems.update("48044", { position: 10 });

  console.log('Update menu item "Menu"');
  await client.menuItems.update("48165", { position: 7 });

  console.log('Update menu item "Location"');
  await client.menuItems.update("700207", { position: 6 });
}
