import { Client, buildBlockRecord } from '@datocms/cli/lib/cma-client-node';
import { parse } from 'parse5'
import { parse5ToStructuredText } from 'datocms-html-to-structured-text'

export default async function(client: Client): Promise<void> {
  for await (const page of client.items.listPagedIterator({
    filter: { type: 'event_item' },
    version: 'current',
    nested: true
  })) {
    const textSection = await client.itemTypes.find('text_section')
    const structuredTextSection = await client.itemTypes.find('section_structured_text')
    const updatedPageBlocks = await Promise.all(
      // @ts-ignore
      page.items.map(async block => {
        if (block.relationships.item_type.data.id !== textSection.id) {
          return block
        }

        let html = block.attributes.title ? `<h2>${block.attributes.title}</h2>\n` : ''
        html += block.attributes.body

        const structuredTextContent = await parse5ToStructuredText(parse(html), {
          allowedHeadingLevels: [2],
          allowedMarks: ['strong', 'emphasis'],
          allowedBlocks: ['heading', 'blockquote', 'list', 'link'],
        });

        return buildBlockRecord({
          item_type: { type: 'item_type', id: structuredTextSection.id },
          body: structuredTextContent
        })
      })
    )

    await client.items.update(page.id, {
      items: updatedPageBlocks
    });

    if (page.meta.status !== 'draft') {
      await client.items.publish(page.id);
    }
  }
}
