import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Destroy fields in existing models/block models");

  console.log(
    'Delete Multiple-paragraph text field "Intro body" (`intro_body`) in model "Case overview" (`case_overview`)'
  );
  await client.fields.destroy("2802098");

  console.log(
    'Delete Multiple-paragraph text field "Intro body" (`intro_body`) in model "Service overview" (`service_overview`)'
  );
  await client.fields.destroy("2226121");

  console.log(
    'Delete Multiple-paragraph text field "Intro body" (`intro_body`) in model "Work At" (`workat`)'
  );
  await client.fields.destroy("4076411");

  console.log(
    'Delete Multiple-paragraph text field "Middle body" (`middle_body`) in model "Work At" (`workat`)'
  );
  await client.fields.destroy("4115894");

  console.log(
    'Delete Multiple-paragraph text field "Intro body" (`intro_body`) in model "Lustrum" (`lustrum`)'
  );
  await client.fields.destroy("10111783");

  console.log(
    'Delete Multiple-paragraph text field "Middle body" (`middle_body`) in model "Lustrum" (`lustrum`)'
  );
  await client.fields.destroy("10111799");

  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Structured text field "Intro body" (`intro_body`) in model "Case overview" (`case_overview`)'
  );
  await client.fields.update("7959704", {
    label: "Intro body",
    api_key: "intro_body",
  });

  console.log(
    'Update Structured text field "Intro body" (`intro_body`) in model "Service overview" (`service_overview`)'
  );
  await client.fields.update("7959705", {
    label: "Intro body",
    api_key: "intro_body",
  });

  console.log(
    'Update Structured text field "Intro body" (`intro_body`) in model "Work At" (`workat`)'
  );
  await client.fields.update("7959706", {
    label: "Intro body",
    api_key: "intro_body",
  });

  console.log(
    'Update Structured text field "Middle body" (`middle_body`) in model "Work At" (`workat`)'
  );
  await client.fields.update("7959707", {
    label: "Middle body",
    api_key: "middle_body",
  });

  console.log(
    'Update Structured text field "Intro body" (`intro_body`) in model "Lustrum" (`lustrum`)'
  );
  await client.fields.update("7959708", {
    label: "Intro body",
    api_key: "intro_body",
  });

  console.log(
    'Update Structured text field "Middle body" (`middle_body`) in model "Lustrum" (`lustrum`)'
  );
  await client.fields.update("7959709", {
    label: "Middle body",
    api_key: "middle_body",
  });
}
