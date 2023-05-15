import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Single link field "Page" (`page`) in model "Job overview" (`job_overview`)'
  );
  newFields["7593155"] = await client.fields.create("40180", {
    label: "Page",
    field_type: "link",
    api_key: "page",
    validators: {
      item_item_type: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: ["2035421"],
      },
      required: {},
    },
    appearance: { addons: [], editor: "link_select", parameters: {} },
  });

  console.log("Destroy fields in existing models/block models");

  console.log(
    'Delete Single-line string field "Title" (`title`) in model "Job overview" (`job_overview`)'
  );
  await client.fields.destroy("153583");

  console.log(
    'Delete Slug field "Slug" (`slug`) in model "Job overview" (`job_overview`)'
  );
  await client.fields.destroy("153584");

  console.log(
    'Delete SEO meta tags field "Social" (`social`) in model "Job overview" (`job_overview`)'
  );
  await client.fields.destroy("181816");

  console.log(
    'Delete Single asset field "Header Illustration" (`header_illustration`) in model "Job overview" (`job_overview`)'
  );
  await client.fields.destroy("182893");

  console.log(
    'Delete Single-line string field "Subtitle" (`subtitle`) in model "Job overview" (`job_overview`)'
  );
  await client.fields.destroy("182907");

  console.log(
    'Delete Multiple-paragraph text field "No jobs available message" (`no_jobs_available_message`) in model "Job overview" (`job_overview`)'
  );
  await client.fields.destroy("945357");

  console.log("Finalize models/block models/records");

  console.log('Update model "Job overview" (`job_overview`)');
  await client.itemTypes.update("40180", { title_field: null });

  console.log('Update the Jobs landing page slug to "jobs"');
  await client.items.update('110636103', {
    slug: 'jobs',
  });

  console.log("Publish Jobs landing page")
  await client.items.publish('110636103');

  console.log('Update Jobs link to point to the Jobs landing page');
  await client.items.update('609321', {
    page: '110636103'
  })

  console.log('Update Job overview to point to the Jobs landing page');
  await client.items.update("40180", {
    page: '110636103'
  })
}
