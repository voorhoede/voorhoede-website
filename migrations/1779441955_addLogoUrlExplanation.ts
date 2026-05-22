import type { Client } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Asset gallery field "Logos" (`logos`) in block model "\uD83C\uDFF7\uFE0F Section Logo Grid" (`section_logo_grid`)',
  );
  await client.fields.update("10482071", {
    hint: "If you want turn the logo into a link, add a custom data field. <br>\n1st field should be: <strong>pageUrl</strong> <br>\n2nd field is the url; please note that the url format is NOT checked. You are responsible for this yourself\n",
  });

}
