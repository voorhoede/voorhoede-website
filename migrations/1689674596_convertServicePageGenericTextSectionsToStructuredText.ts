import { Client, buildBlockRecord } from '@datocms/cli/lib/cma-client-node';
import { parse } from 'parse5'
import { parse5ToStructuredText } from 'datocms-html-to-structured-text'

export default async function(client: Client): Promise<void> {
  for await (const page of client.items.listPagedIterator({
    filter: { type: 'service' },
    version: 'current',
    nested: true
  })) {
    const pageBlocks = page.items
    const genericTextBlock = await client.itemTypes.find('generic_text_block')
    const structuredTextSection = await client.itemTypes.find('section_structured_text')

    const updatedPageBlocks = Object.fromEntries(
      await Promise.all(
        Object.keys(pageBlocks).map(async locale => {
          const pageBlocksForLocale = pageBlocks[locale]
          const updatedPageBlocksForLocale = await Promise.all(pageBlocksForLocale.map(async (block) => {
            if (block.relationships.item_type.data.id !== genericTextBlock.id) {
              return block
            }

            let html = block.attributes.title ? `<h2>${block.attributes.title}</h2>\n` : ''
            html += block.attributes.body

            const structuredTextContent = await parse5ToStructuredText(parse(html), {
              allowedHeadingLevels: [2],
              allowedMarks: ['strong', 'em'],
              allowedBlocks: ['heading', 'blockquote', 'list', 'link'],
            });

            return buildBlockRecord({
              item_type: { type: 'item_type', id: structuredTextSection.id },
              body: structuredTextContent
            })
          }))

          return [locale, updatedPageBlocksForLocale]
        })
      )
    )

    await client.items.update(page.id, {
      items: updatedPageBlocks
    });

    if (page.meta.status !== 'draft') {
      await client.items.publish(page.id);
    }
  }
}
