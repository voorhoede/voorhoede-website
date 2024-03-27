import { Client } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const genericTextBlock = await client.itemTypes.find("generic_text_block");
  const serviceItemsField = await client.fields.find("service::items");

  await client.fields.update(serviceItemsField.id, {
    validators: {
      rich_text_blocks: {
        item_types: (serviceItemsField.validators.rich_text_blocks as { item_types: string[] }).item_types.filter(
          itemType => itemType !== genericTextBlock.id
        ),
      },
    },
  });
}
