import { Client } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Structured text field "Body" (`body`) in block model "Section Structured Text" (`section_structured_text`)'
  );
  await client.fields.update("10483125", {
    appearance: {
      addons: [],
      editor: "structured_text",
      parameters: {
        marks: ["emphasis", "strong"],
        nodes: ["heading", "link", "list"],
        heading_levels: [1, 2, 3, 4, 5, 6],
        blocks_start_collapsed: false,
        show_links_meta_editor: false,
        show_links_target_blank: true,
      },
    },
  });
}
