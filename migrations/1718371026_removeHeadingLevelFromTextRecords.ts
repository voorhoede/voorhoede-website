import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Destroy fields in existing models/block models");

  console.log(
    'Delete Single-line string field "Heading Level" (`heading_level`) in block model "Text Section" (`text_section`)'
  );
  await client.fields.destroy("10438932");
}
