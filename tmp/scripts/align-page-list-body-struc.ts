/**
 * Align page_list_block.body validators/appearance to text_block.text (STRUC).
 * Target: new-data-models
 * Run: npx datocms cma:script tmp/scripts/align-page-list-body-struc.ts --environment=new-data-models
 */
import type { Client } from '@datocms/cma-client-node';
import * as Schema from './datocms-schema-new-data-models';

export default async function main(client: Client) {
  const BODY_FIELD_ID = 'Z2yM83j2QfCmwSNIlzXyLA';

  const STRUC_BLOCKS = [
    '41672', // image_block
    Schema.ActionBlock.ID,
    'SZkO6JPMR5a1TLgwpOLVkw', // video_block
    'Y2qM8sXMR0-lwk-NZ0YZNg', // video_embed_block
  ];

  const STRUC_INLINE = [
    'B5m5y2NfSASVJ6CIBm3F5A', // icon_block
    'UlmN1uACR0KcQEmO_TP3oA', // variable_block
  ];

  const STRUC_LINKS = [
    '2035421', // page
    'IsaADh7aRxGueq_pxmIIQg', // file
    'NDtfKQsmTP6B48gv9tf8dg', // home
    'W_zSJuzrSSuzn0SnVT_JMQ', // glossary_term
  ];

  const updated = await client.fields.update(BODY_FIELD_ID, {
    validators: {
      structured_text_blocks: { item_types: STRUC_BLOCKS },
      structured_text_inline_blocks: { item_types: STRUC_INLINE },
      structured_text_links: {
        on_publish_with_unpublished_references_strategy: 'fail',
        on_reference_unpublish_strategy: 'delete_references',
        on_reference_delete_strategy: 'delete_references',
        item_types: STRUC_LINKS,
      },
    },
    appearance: {
      addons: [],
      editor: 'structured_text',
      parameters: {
        marks: [
          'strong',
          'code',
          'emphasis',
          'underline',
          'strikethrough',
          'highlight',
        ],
        nodes: [
          'blockquote',
          'code',
          'heading',
          'inlineItem',
          'itemLink',
          'link',
          'list',
          'thematicBreak',
        ],
        heading_levels: [1, 2, 3, 4, 5, 6],
        blocks_start_collapsed: false,
        show_links_meta_editor: false,
        show_links_target_blank: true,
      },
    },
  });

  console.log('Updated page_list_block.body:', {
    id: updated.id,
    api_key: updated.api_key,
    validators: updated.validators,
  });
}
