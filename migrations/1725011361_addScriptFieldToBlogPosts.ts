import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Multiple-paragraph text field "Script" (`script`) in model "Blog post" (`blog_post`)'
  );
  await client.fields.create("38241", {
    id: "Z0w2kERXQumhXvr5nEwuRQ",
    label: "Script",
    field_type: "text",
    api_key: "script",
    hint: "Javascript script that will be executed on the client side of the rendered page. Can be used to make your blog posts more interactive through the use of web-components etc. ",
    appearance: {
      addons: [],
      editor: "textarea",
      parameters: { placeholder: null },
      type: "textarea",
    },
    default_value: "",
  });

  await client.items.create({
    item_type: { type: 'item_type', id: '55443' },
    key: 'blog_post_noscript',
    value: {
      en: 'Normally some javascript would be used to improve the user experience of the page. Since you have javascript disabled, it is possible that some functionalities will not work.',
      nl: 'Normaal gesproken wordt er javascript gebruikt om de gebruikerservaring van de pagina te verbeteren. Omdat je javascript hebt uitgeschakeld, is het mogelijk dat sommige functies niet werken.',
    }
  });
}
