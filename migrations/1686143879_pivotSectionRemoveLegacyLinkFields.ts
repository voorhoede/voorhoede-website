import { Client } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Destroy fields in existing models/block models");

  console.log(
    'Delete Single link field "Internal link" (`internal_link`) in model "Pivot section" (`pivot_section`)'
  );
  await client.fields.destroy("236126");

  console.log(
    'Delete Single-line string field "Call to Action label" (`call_to_action_label`) in model "Pivot section" (`pivot_section`)'
  );
  await client.fields.destroy("236131");

  console.log(
    'Delete Single-line string field "External link" (`external_link`) in model "Pivot section" (`pivot_section`)'
  );
  await client.fields.destroy("1128145");

  console.log("Destroy models/block models");

  console.log('Delete model "Link" (`link`)');
  await client.itemTypes.destroy("55657", { skip_menu_items_deletion: true });

  console.log("Manage menu items");

  console.log('Delete menu item "Links"');
  await client.menuItems.destroy("1261053");
}
