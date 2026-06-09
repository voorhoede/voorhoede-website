import { Client } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Modular Content (Multiple blocks) field "Sections" (`sections`) in model "\uD83D\uDCD1 Page" (`page`)',
  );
  await client.fields.update("10461611", {
    validators: {
      rich_text_blocks: {
        item_types: [
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
          "2040174",
          "2040351",
          "2040362",
          "2486431",
          "AjYd96IgQYuBzefFaL5VBA",
          "G8-kViMTTG62MbHNzPc7PQ",
          "Y2qM8sXMR0-lwk-NZ0YZNg",
        ],
      },
    },
  });

  console.log(
    'Update Modular Content (Multiple blocks) field "Sections" (`sections`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update("Y66TEEOYTDuIltz0RySVEA", {
    validators: {
      rich_text_blocks: {
        item_types: [
          "262363",
          "1757574",
          "2037668",
          "2040174",
          "2040362",
          "2486431",
          "AjYd96IgQYuBzefFaL5VBA",
          "CL2tcnR9TimpzQxNR2RKCg",
          "CrAZK2ukS-Cev0D-CSbA2g",
          "G8-kViMTTG62MbHNzPc7PQ",
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
          "2040174",
          "2040351",
          "2040362",
          "2486431",
          "CL2tcnR9TimpzQxNR2RKCg",
          "CrAZK2ukS-Cev0D-CSbA2g",
          "Y2qM8sXMR0-lwk-NZ0YZNg",
        ],
      },
    },
  });
}
