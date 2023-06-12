import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Single-line string field "Font size" (`font_size`) in block model "Section Image & Text" (`section_image_text`)'
  );
  newFields["8697596"] = await client.fields.create("2037669", {
    label: "Font size",
    field_type: "string",
    api_key: "font_size",
    validators: { required: {}, enum: { values: ["default", "small"] } },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "default",
  });

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
