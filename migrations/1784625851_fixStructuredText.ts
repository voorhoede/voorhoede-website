import type { Client } from "datocms/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Destroy fields in existing models/block models");

  console.log(
    'Delete Single-line string field "Layout" (`layout`) in block model "\uD83D\uDCDD Text Block" (`text_block`)',
  );
  await client.fields.destroy("I77l-rzcRaqrWAFbEGFDDA");

  console.log(
    'Delete Single-line string field "Style" (`style`) in block model "\uD83D\uDCDD Text Block" (`text_block`)',
  );
  await client.fields.destroy("A8JsuJeYRtuz0VWP6tHLwg");

  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Modular Content (Multiple blocks) field "Sections" (`sections`) in model "\uD83D\uDCD1 Page" (`page`)',
  );
  await client.fields.update("10461611", {
    validators: {
      rich_text_blocks: {
        item_types: [
          "2040174",
          "262363",
          "1466128",
          "1471996",
          "1514671",
          "1517179",
          "1646744",
          "1757574",
          "2037668",
          "2037669",
          "2037920",
          "2037933",
          "2037940",
          "Y2qM8sXMR0-lwk-NZ0YZNg",
          "2040362",
          "G8-kViMTTG62MbHNzPc7PQ",
          "2486431",
          "AjYd96IgQYuBzefFaL5VBA",
          "BSet0e3fTeWC8-a8odR7VA",
          "ZoimmZOiR0mkjwIEXN-9Ag",
        ],
      },
    },
  });

  console.log(
    'Update Modular Content (Single block) field "Section" (`section`) in model "\uD83D\uDCC4 Page Partial" (`page_partial`)',
  );
  await client.fields.update("YitgdnMGTpuQkl6GFYkGLQ", {
    validators: {
      single_block_blocks: {
        item_types: [
          "2040174",
          "262363",
          "1466128",
          "1471996",
          "1514671",
          "1517179",
          "1646744",
          "1757574",
          "2037668",
          "2037669",
          "2037920",
          "2037933",
          "2037940",
          "Y2qM8sXMR0-lwk-NZ0YZNg",
          "2040362",
          "2486431",
          "CrAZK2ukS-Cev0D-CSbA2g",
          "ZoimmZOiR0mkjwIEXN-9Ag",
          "CL2tcnR9TimpzQxNR2RKCg",
        ],
      },
    },
  });

  console.log("Finalize models/block models");

  console.log('Update block model "\uD83D\uDCDD Text Block" (`text_block`)');
  await client.itemTypes.update("BSet0e3fTeWC8-a8odR7VA", {
    presentation_title_field: null,
  });
}
