import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};
  const newItemTypes: Record<string, SimpleSchemaTypes.ItemType> = {};

  console.log("Create new models/block models");

  console.log('Create model "Meet" (`meet`)');
  newItemTypes["Pc5mVNeDTmu3XLUDORzKLA"] = await client.itemTypes.create(
    {
      name: "Meet",
      api_key: "meet",
      all_locales_required: true,
      inverse_relationships_enabled: true,
    },
    { skip_menu_item_creation: true }
  );

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Single-line string field "Name" (`name`) in model "Meet" (`meet`)'
  );
  newFields["OUMRNQbcTgS7Rc08qCyrzQ"] = await client.fields.create(
    newItemTypes["Pc5mVNeDTmu3XLUDORzKLA"],
    {
      label: "Name",
      field_type: "string",
      api_key: "name",
      hint: "Solely utilized within the CMS for identification purposes.",
      validators: { required: {} },
      appearance: {
        addons: [],
        editor: "single_line",
        parameters: { heading: true },
        type: "title",
      },
      default_value: "",
    }
  );

  console.log(
    'Create Single-line string field "URL" (`url`) in model "Meet" (`meet`)'
  );
  newFields["cVB9-jiXRrOd1XGLbRps2g"] = await client.fields.create(
    newItemTypes["Pc5mVNeDTmu3XLUDORzKLA"],
    {
      label: "URL",
      field_type: "string",
      api_key: "url",
      validators: { required: {}, format: { predefined_pattern: "url" } },
      appearance: {
        addons: [],
        editor: "single_line",
        parameters: { heading: false },
      },
      default_value: "",
    }
  );

  console.log(
    'Create SEO meta tags field "SEO" (`seo`) in model "Meet" (`meet`)'
  );
  newFields["BSDLkYDqSz6ilFA4CSXQpg"] = await client.fields.create(
    newItemTypes["Pc5mVNeDTmu3XLUDORzKLA"],
    {
      label: "SEO",
      field_type: "seo",
      api_key: "seo",
      localized: true,
      validators: {
        title_length: { max: 60 },
        description_length: { max: 160 },
      },
      appearance: {
        addons: [],
        editor: "seo",
        parameters: {
          fields: ["title", "description", "image"],
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
    }
  );

  console.log(
    'Create Single link field "Meet" (`meet`) in model "Person" (`person`)'
  );
  newFields["M4LR1Hd6TYifd0sgRf9BnQ"] = await client.fields.create("38233", {
    label: "Meet",
    field_type: "link",
    api_key: "meet",
    validators: {
      item_item_type: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: [newItemTypes["Pc5mVNeDTmu3XLUDORzKLA"].id],
      },
      unique: {},
    },
    appearance: { addons: [], editor: "link_embed", parameters: {} },
    default_value: null,
  });

  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Modular content field "Links" (`links`) in model "Person" (`person`)'
  );
  await client.fields.update("10436379", { position: 8 });

  console.log(
    'Update Single link field "Link" (`link`) in block model "Internal Link" (`internal_link`)'
  );
  await client.fields.update("10463316", {
    validators: {
      item_item_type: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "fail",
        on_reference_delete_strategy: "delete_references",
        item_types: [
          "38231",
          "38232",
          "38233",
          "38234",
          "38235",
          "38237",
          "38238",
          "38240",
          "38241",
          "38242",
          "40014",
          "40181",
          "2035421",
          newItemTypes["Pc5mVNeDTmu3XLUDORzKLA"].id,
        ],
      },
      required: {},
    },
  });

  console.log("Finalize models/block models");

  console.log('Update model "Meet" (`meet`)');
  await client.itemTypes.update(newItemTypes["Pc5mVNeDTmu3XLUDORzKLA"], {
    title_field: newFields["OUMRNQbcTgS7Rc08qCyrzQ"],
  });

  console.log("Manage menu items");

  console.log('Update menu item "Redirects"');
  await client.menuItems.update("43816", { position: 13 });

  console.log('Update menu item "Translations"');
  await client.menuItems.update("48044", { position: 12 });
}
