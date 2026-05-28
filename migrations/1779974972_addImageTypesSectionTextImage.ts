import { Client } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Single asset field "Image" (`image`) in block model "Section Image & Text" (`section_image_text`)',
  );
  await client.fields.update("10461620", {
    validators: {
      required: {},
      extension: { extensions: [], predefined_list: "image" },
      required_alt_title: { title: false, alt: true },
    },
  });
}
