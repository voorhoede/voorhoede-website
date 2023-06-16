import type { Client } from '@datocms/cli/lib/cma-client-node';

export default async function(client: Client): Promise<void> {
  const sectionOpenSourceProjectItemModel = await client.itemTypes.create({
    name: 'Section Open Source Project Item',
    api_key: 'section_open_source_project_item',
    modular_block: true,
  });

  await client.fields.create(sectionOpenSourceProjectItemModel, {
    label: 'Title',
    api_key: 'title',
    field_type: 'string',
    validators: {
      required: {},
    },
  });

  await client.fields.create(sectionOpenSourceProjectItemModel, {
    label: 'Repository Owner',
    api_key: 'repository_owner',
    field_type: 'string',
    default_value: 'voorhoede',
    validators: {
      required: {},
    },
  });

  await client.fields.create(sectionOpenSourceProjectItemModel, {
    label: 'Repository Name',
    api_key: 'repository_name',
    field_type: 'string',
    validators: {
      required: {},
    },
  });

  await client.fields.create(sectionOpenSourceProjectItemModel, {
    label: 'Description',
    api_key: 'description',
    field_type: 'string',
    validators: {
      required: {},
    },
  });

  const sectionOpenSourceProjectModel = await client.itemTypes.create({
    name: 'Section Open Source Project',
    api_key: 'section_open_source_project',
    modular_block: true,
  });

  await client.fields.create(sectionOpenSourceProjectModel, {
    label: 'Title',
    api_key: 'title',
    field_type: 'string',
    validators: {
      required: {},
    },
    appearance: {
      editor: 'single_line',
      parameters: { heading: true },
      addons: [],
    },
  });

  await client.fields.create(sectionOpenSourceProjectModel, {
    label: 'Items',
    api_key: 'items',
    field_type: 'rich_text',
    validators: {
      rich_text_blocks: {
        item_types: [
          sectionOpenSourceProjectItemModel.id,
        ],
      },
    },
  });

  const landingPageSectionsField = await client.fields.find('landing_page::sections');
  await client.fields.update(landingPageSectionsField, {
    validators: {
      rich_text_blocks: {
        item_types: [
          ...landingPageSectionsField.validators.rich_text_blocks['item_types'],
          sectionOpenSourceProjectModel.id,
        ],
      },
    },
  });
}
