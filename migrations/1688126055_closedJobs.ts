import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Boolean field "Is closed?" (`is_closed`) in model "Job" (`job`)'
  );
  newFields["10413779"] = await client.fields.create("38231", {
    label: "Is closed?",
    field_type: "boolean",
    api_key: "is_closed",
    hint: "Closed jobs will remain online for search engine optimization reasons but will not be directly listed on the website. A banner explaining the position is closed will appear on the top of the page.",
    appearance: { addons: [], editor: "boolean", parameters: {} },
  });

  console.log("Destroy fields in existing models/block models");

  console.log(
    'Delete Single-line string field "Call to action title" (`call_to_action_title`) in model "Job" (`job`)'
  );
  await client.fields.destroy("3716515");

  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Boolean field "Is closed?" (`is_closed`) in model "Job" (`job`)'
  );
  await client.fields.update(newFields["10413779"], { position: 0 });

  console.log("Create new translations");

  await client.items.create({
    item_type: { type: 'item_type', id: '55443' },
    key: 'apply_closed',
    value: {
      en: 'This vacancy is currently closed. Please check back later or apply to one of our other vacancies.',
      nl: 'Deze vacature is momenteel gesloten. Kom later nog eens terug of solliciteer op een van onze andere vacatures.',
    }
  });

  await client.items.create({
    item_type: { type: 'item_type', id: '55443' },
    key: 'apply_title',
    value: {
      en: 'Apply right away!',
      nl: 'Aarzel niet!',
    }
  });

  await client.items.create({
    item_type: { type: 'item_type', id: '55443' },
    key: 'apply_title_closed',
    value: {
      en: 'Visit our open vacancies',
      nl: 'Bezoek onze openstaande vacatures',
    }
  });
}
