import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Creating new fields/fieldsets");

  console.log(
    'Create fieldset "\uD83E\uDE84 Scripts" in model "Blog post" (`blog_post`)'
  );
  await client.fieldsets.create("38241", {
    id: "IKdvIfTYR2aXiSu_uTucYg",
    title: "\uD83E\uDE84 Scripts",
    hint: "Javascript script that will be executed on the client side of the rendered page. Can be used to make your blog posts more interactive through the use of Web Components etc. The scripts will be wrapped in IIFEs.\n\nRemember that Web Components should have unique names, so consider adding a suffix to the class and the tag.",
    collapsible: true,
    start_collapsed: true,
  });

  console.log(
    'Create Multiple-paragraph text field "OnMounted Script" (`on_mounted_script`) in model "Blog post" (`blog_post`)'
  );
  await client.fields.create("38241", {
    id: "Z0w2kERXQumhXvr5nEwuRQ",
    label: "OnMounted Script",
    field_type: "text",
    api_key: "on_mounted_script",
    hint: "Will be called after the component has mounted, so you have access to the DOM. If you are using web-components, make sure to check if custom element is already defined in the CustomElementRegistry before defining a new web-component (unregistering is not possible, so this is necessary to prevent runtime errors).",
    appearance: {
      addons: [],
      editor: "textarea",
      parameters: { placeholder: null },
      type: "textarea",
    },
    default_value: "",
    fieldset: { id: "IKdvIfTYR2aXiSu_uTucYg", type: "fieldset" },
  });

  console.log(
    'Create Multiple-paragraph text field "OnUnmounted Script" (`on_unmounted_script`) in model "Blog post" (`blog_post`)'
  );
  await client.fields.create("38241", {
    id: "dtwrtWI0S5u_hKSBk-k6TQ",
    label: "OnUnmounted Script",
    field_type: "text",
    api_key: "on_unmounted_script",
    hint: "Should be used to clean up artefacts from your `OnMounted` script.",
    appearance: {
      addons: [],
      editor: "textarea",
      parameters: { placeholder: null },
      type: "textarea",
    },
    default_value: "",
    fieldset: { id: "IKdvIfTYR2aXiSu_uTucYg", type: "fieldset" },
  });

  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Multiple-paragraph text field "OnMounted Script" (`on_mounted_script`) in model "Blog post" (`blog_post`)'
  );
  await client.fields.update("Z0w2kERXQumhXvr5nEwuRQ", { position: 0 });

  console.log(
    'Update Multiple-paragraph text field "OnUnmounted Script" (`on_unmounted_script`) in model "Blog post" (`blog_post`)'
  );
  await client.fields.update("dtwrtWI0S5u_hKSBk-k6TQ", { position: 1 });

  console.log("Add new translations");

  await client.items.create({
    item_type: { type: 'item_type', id: '55443' },
    key: 'blog_post_noscript',
    value: {
      en: 'Normally some javascript would be used to improve the user experience of the page. Since you have javascript disabled, it is possible that some functionalities will not work.',
      nl: 'Normaal gesproken wordt er javascript gebruikt om de gebruikerservaring van de pagina te verbeteren. Omdat je javascript hebt uitgeschakeld, is het mogelijk dat sommige functies niet werken.',
    }
  });
}
