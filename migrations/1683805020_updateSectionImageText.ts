import { Client } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Destroy fields in existing models/block models");

  console.log(
    'Delete Multiple-paragraph text field "body" (`body`) in model "Section Image & Text" (`section_image_text`)'
  );
  await client.fields.destroy("10462463");
}
