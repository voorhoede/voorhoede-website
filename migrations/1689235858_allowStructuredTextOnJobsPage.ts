import { Client } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log(
    'Update Modular content field "Job content" (`job_content`) in model "Job" (`job`)'
  );
  await client.fields.update("182802", {
    validators: {
      rich_text_blocks: { item_types: ["41836", "1992764", "2040351"] },
    },
  });
}
