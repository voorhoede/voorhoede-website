import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";
import markdownToStructuredText from "./utils/markdownToStructuredText";

type ImageAndTextType = SimpleSchemaTypes.Item & {
  sections : {
    en: SectionImageAndTextType[]
    nl: SectionImageAndTextType[]
  }
}

type SectionImageAndTextType = {
  id: string,
  attributes: {
    body: string
  },
  relationships: {
    item_type: {
      data: {
        id: string
      }
    }
  }
}

export default async function (client: Client) {
  // const newFields: Record<string, SimpleSchemaTypes.Field> = {};

  // console.log("Creating new fields/fieldsets");

  // console.log(
  //   'Create Structured text field "Structured body" (`structured_body`) in block model "Section Image & Text" (`section_image_text`)'
  // );
  // newFields["7402567"] = await client.fields.create("2037669", {
  //   label: "Structured body",
  //   field_type: "structured_text",
  //   api_key: "structured_body",
  //   validators: {
  //     structured_text_blocks: { item_types: ["2040408"] },
  //     structured_text_links: {
  //       on_publish_with_unpublished_references_strategy: "fail",
  //       on_reference_unpublish_strategy: "delete_references",
  //       on_reference_delete_strategy: "delete_references",
  //       item_types: [],
  //     },
  //   },
  //   appearance: {
  //     addons: [],
  //     editor: "structured_text",
  //     parameters: {
  //       marks: ["strong", "emphasis"],
  //       nodes: ["heading", "link"],
  //       heading_levels: [2, 3, 4, 5, 6],
  //       blocks_start_collapsed: false,
  //       show_links_meta_editor: false,
  //       show_links_target_blank: true,
  //     },
  //   },
  // });

  console.log('Iterate over all records of model "Landing page" (`landing_page`)');
  const records = await client.items.list({
    filter: { type: '2035421'},
    nested: true,
    version: 'current'
  }) as ImageAndTextType[];

  for (const record of records) {
    for (const block of record.sections.en.filter(section => section.relationships.item_type.data.id === '2037669')) {
      const structuredTextContent = await markdownToStructuredText(
        block.attributes.body,
        {},
      );
      console.log(structuredTextContent);
    }
    // const blockIds = record.sections.en.map(section => section.id);
    // await client.items.update(record.id, {
    //   sections: [
    //     // existing block record IDs
    //     '565346546',
    //     '565346547',
    //     // new block record
    //     buildBlockRecord({
    //       item_type: { type: 'item_type', id: '2037669' },
    //       id: blockRecordIdToUpdate,
    //       text: 'updated text',
    //     }),
    //   ],
    // });
    // if (record.meta.status !== 'draft') {
    //   await client.items.publish(record.id);
    // }
  }

  // console.log("Destroy fields in existing models/block models");

  // console.log(
  //   'Delete Structured text field "Body" (`body`) in block model "Section Image & Text" (`section_image_text`)'
  // );
  // await client.fields.destroy("10462463");

  // console.log("Update existing fields/fieldsets");

  // console.log(
  //   'Update Structured text field "Body" (`body`) in block model "Section Image & Text" (`section_image_text`)'
  // );
  // await client.fields.update("7402567", {
  //   label: "Body",
  //   api_key: "body",
  //   validators: {
  //     required: {},
  //   }
  // });
}
