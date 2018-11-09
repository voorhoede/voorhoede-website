<template>
  <div>
    <h1 class="h1">Typography <small>(current size: {{ width }})</small></h1>

    <p class="body">
      These are the <strong>computed</strong> styles of the typographic classes.
      <br >
      Resize the content section to see <code>small</code>, <code>medium</code>
      and <code>large</code> sizes
    </p>

    <h2 class="h2">Styles</h2>
    <p class="body">
      These are the different classes you can use to create the wanted styles.
    </p>
    <table
      id="type-table"
      class="fonts-loaded body">
      <tr>
        <td class="font-bold">Name</td>
        <td class="font-bold">Class</td>
        <td class="font-bold">Properties</td>
      </tr>
      <tr>
        <td>
          <span
            ref="hero"
            class="hero">hero</span>
        </td>
        <td><code>hero</code></td>
        <td>
          <dl>
            <dt>size</dt>
            <dd><code>{{ sizes.hero && sizes.hero.fontSize }}</code></dd>
            <dt>line-height</dt>
            <dd><code>{{ sizes.hero && sizes.hero.lineHeight }}</code></dd>
            <dt>weight</dt>
            <dd><code>{{ sizes.hero && sizes.hero.fontWeight }}</code></dd>
          </dl>
        </td>
      </tr>
      <tr>
        <td>
          <span
            ref="sub-title"
            class="sub-title">sub title</span>
        </td>
        <td><code>sub-title</code></td>
        <td>
          <dl>
            <dt>size</dt>
            <dd><code>{{ sizes['sub-title'] && sizes['sub-title'].fontSize }}</code></dd>
            <dt>line-height</dt>
            <dd><code>{{ sizes['sub-title'] && sizes['sub-title'].lineHeight }}</code></dd>
            <dt>weight</dt>
            <dd><code>{{ sizes['sub-title'] && sizes['sub-title'].fontWeight }}</code></dd>
          </dl>
        </td>
      </tr>
      <tr>
        <td>
          <span
            ref="testimonial"
            class="testimonial">testimonial</span>
        </td>
        <td><code>testimonial</code></td>
        <td>
          <dl>
            <dt>size</dt>
            <dd><code>{{ sizes.testimonial && sizes.testimonial.fontSize }}</code></dd>
            <dt>line-height</dt>
            <dd><code>{{ sizes.testimonial && sizes.testimonial.lineHeight }}</code></dd>
            <dt>weight</dt>
            <dd><code>{{ sizes.testimonial && sizes.testimonial.fontWeight }}</code></dd>
          </dl>
        </td>
      </tr>
      <tr>
        <td>
          <span
            ref="sub-title-2"
            class="sub-title-2">sub title 2</span>
        </td>
        <td><code>sub-title-2</code></td>
        <td>
          <dl>
            <dt>size</dt>
            <dd><code>{{ sizes['sub-title-2'] && sizes['sub-title-2'].fontSize }}</code></dd>
            <dt>line-height</dt>
            <dd><code>{{ sizes['sub-title-2'] && sizes['sub-title-2'].lineHeight }}</code></dd>
            <dt>weight</dt>
            <dd><code>{{ sizes['sub-title-2'] && sizes['sub-title-2'].fontWeight }}</code></dd>
          </dl>
        </td>
      </tr>
      <tr>
        <td>
          <span
            ref="pullquote"
            class="pullquote">pullquote</span>
        </td>
        <td><code>pullquote</code></td>
        <td>
          <dl>
            <dt>size</dt>
            <dd><code>{{ sizes.pullquote && sizes.pullquote.fontSize }}</code></dd>
            <dt>line-height</dt>
            <dd><code>{{ sizes.pullquote && sizes.pullquote.lineHeight }}</code></dd>
            <dt>weight</dt>
            <dd><code>{{ sizes.pullquote && sizes.pullquote.fontWeight }}</code></dd>
          </dl>
        </td>
      </tr>
      <tr>
        <td>
          <span
            ref="h1"
            class="h1">h1</span>
        </td>
        <td><code>h1</code></td>
        <td>
          <dl>
            <dt>size</dt>
            <dd><code>{{ sizes.h1 && sizes.h1.fontSize }}</code></dd>
            <dt>line-height</dt>
            <dd><code>{{ sizes.h1 && sizes.h1.lineHeight }}</code></dd>
            <dt>weight</dt>
            <dd><code>{{ sizes.h1 && sizes.h1.fontWeight }}</code></dd>
          </dl>
        </td>
      </tr>
      <tr>
        <td>
          <span
            ref="h2"
            class="h2">h2</span>
        </td>
        <td><code>h2</code></td>
        <td>
          <dl>
            <dt>size</dt>
            <dd><code>{{ sizes.h2 && sizes.h2.fontSize }}</code></dd>
            <dt>line-height</dt>
            <dd><code>{{ sizes.h2 && sizes.h2.lineHeight }}</code></dd>
            <dt>weight</dt>
            <dd><code>{{ sizes.h2 && sizes.h2.fontWeight }}</code></dd>
          </dl>
        </td>
      </tr>
      <tr>
        <td>
          <span
            ref="h3"
            class="h3">h3</span>
        </td>
        <td><code>h3</code></td>
        <td>
          <dl>
            <dt>size</dt>
            <dd><code>{{ sizes.h3 && sizes.h3.fontSize }}</code></dd>
            <dt>line-height</dt>
            <dd><code>{{ sizes.h3 && sizes.h3.lineHeight }}</code></dd>
            <dt>weight</dt>
            <dd><code>{{ sizes.h3 && sizes.h3.fontWeight }}</code></dd>
          </dl>
        </td>
      </tr>
      <tr>
        <td>
          <span
            ref="h4"
            class="h4">h4</span>
        </td>
        <td><code>h4</code></td>
        <td>
          <dl>
            <dt>size</dt>
            <dd><code>{{ sizes.h4 && sizes.h4.fontSize }}</code></dd>
            <dt>line-height</dt>
            <dd><code>{{ sizes.h4 && sizes.h4.lineHeight }}</code></dd>
            <dt>weight</dt>
            <dd><code>{{ sizes.h4 && sizes.h4.fontWeight }}</code></dd>
          </dl>
        </td>
      </tr>
      <tr>
        <td>
          <span
            ref="h5"
            class="h5">h5</span>
        </td>
        <td><code>h5</code></td>
        <td>
          <dl>
            <dt>size</dt>
            <dd><code>{{ sizes.h5 && sizes.h5.fontSize }}</code></dd>
            <dt>line-height</dt>
            <dd><code>{{ sizes.h5 && sizes.h5.lineHeight }}</code></dd>
            <dt>weight</dt>
            <dd><code>{{ sizes.h5 && sizes.h5.fontWeight }}</code></dd>
          </dl>
        </td>
      </tr>
      <tr>
        <td>
          <span
            ref="body-big"
            class="body-big">body big</span>
        </td>
        <td><code>body-big</code></td>
        <td>
          <dl>
            <dt>size</dt>
            <dd><code>{{ sizes['body-big'] && sizes['body-big'].fontSize }}</code></dd>
            <dt>line-height</dt>
            <dd><code>{{ sizes['body-big'] && sizes['body-big'].lineHeight }}</code></dd>
            <dt>weight</dt>
            <dd><code>{{ sizes['body-big'] && sizes['body-big'].fontWeight }}</code></dd>
          </dl>
        </td>
      </tr>
      <tr>
        <td>
          <span
            ref="body"
            class="body">body</span>
        </td>
        <td><code>body</code></td>
        <td>
          <dl>
            <dt>size</dt>
            <dd><code>{{ sizes.body && sizes.body.fontSize }}</code></dd>
            <dt>line-height</dt>
            <dd><code>{{ sizes.body && sizes.body.lineHeight }}</code></dd>
            <dt>weight</dt>
            <dd><code>{{ sizes.body && sizes.body.fontWeight }}</code></dd>
          </dl>
        </td>
      </tr>
      <tr>
        <td>
          <span
            ref="body-petite"
            class="body-petite">body petite</span>
        </td>
        <td><code>body-petite</code></td>
        <td>
          <dl>
            <dt>size</dt>
            <dd><code>{{ sizes['body-petite'] && sizes['body-petite'].fontSize }}</code></dd>
            <dt>line-height</dt>
            <dd><code>{{ sizes['body-petite'] && sizes['body-petite'].lineHeight }}</code></dd>
            <dt>weight</dt>
            <dd><code>{{ sizes['body-petite'] && sizes['body-petite'].fontWeight }}</code></dd>
          </dl>
        </td>
      </tr>
      <tr>
        <td>
          <span
            ref="body-detail"
            class="body-detail">body detail</span>
        </td>
        <td><code>body-detail</code></td>
        <td>
          <dl>
            <dt>size</dt>
            <dd><code>{{ sizes['body-detail'] && sizes['body-detail'].fontSize }}</code></dd>
            <dt>line-height</dt>
            <dd><code>{{ sizes['body-detail'] && sizes['body-detail'].lineHeight }}</code></dd>
            <dt>weight</dt>
            <dd><code>{{ sizes['body-detail'] && sizes['body-detail'].fontWeight }}</code></dd>
          </dl>
        </td>
      </tr>
    </table>

    <h2 class="h2">Modifiers</h2>
    <p class="body">
      These are the different classes you can use to modify the typography.
    </p>
    <table
      id="type-table"
      class="fonts-loaded body">
      <tr>
        <td class="font-bold">Name</td>
        <td class="font-bold">Class</td>
        <td class="font-bold">Properties</td>
      </tr>
      <tr>
        <td>
          <span
            ref="font-normal"
            class="font-normal">normal</span>
        </td>
        <td><code>font-normal</code></td>
        <td>
          <dl>
            <dt>weight</dt>
            <dd><code>{{ sizes['font-normal'] && sizes['font-normal'].fontWeight }}</code></dd>
          </dl>
        </td>
      </tr>
      <tr>
        <td>
          <span
            ref="font-bold"
            class="font-bold">bold</span>
        </td>
        <td><code>font-bold</code></td>
        <td>
          <dl>

            <dt>weight</dt>
            <dd><code>{{ sizes['font-bold'] && sizes['font-bold'].fontWeight }}</code></dd>

          </dl>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import debounce from '../../../../src/client/lib/debounce-helper'

export default {
  data: () => ({ isMounted: false, width: 'Large' }),
  computed: {
    sizes() {
      return (
        this.isMounted &&
        this.width &&
        Object.keys(this.$refs).reduce((obj, ref) => {
          const el = this.$refs[ref]
          const computedtStyle = getComputedStyle(el, null)
          const fontSize = computedtStyle.getPropertyValue('font-size')
          const lineHeight = computedtStyle.getPropertyValue('line-height')
          const fontWeight = computedtStyle.getPropertyValue('font-weight')
          const color = computedtStyle.getPropertyValue('color')
          const letterSpacing = computedtStyle.getPropertyValue(
            'letter-spacing',
          )

          return Object.assign({}, obj, {
            [ref]: { fontSize, lineHeight, fontWeight, color, letterSpacing },
          })
        }, {})
      )
    },
  },
  mounted() {
    this.isMounted = true
    window.addEventListener('resize', debounce(this.resizeHandler, 100), false)
  },
  methods: {
    resizeHandler() {
      if (document.body.clientWidth >= 1100) {
        this.width = 'Large'
      } else if (document.body.clientWidth >= 720) {
        this.width = 'Medium'
      } else {
        this.width = 'Small'
      }
    },
  },
}
</script>

<style>
#type-table {
  display: grid;
  grid-template-columns: max-content max-content 1fr;
  font-family: 'GT-Walsheim', Helvetica, Arial, sans-serif;
}

#type-table tr {
  display: contents;
}

#type-table tr td:last-child dl {
  display: grid;
  grid-column-gap: 1rem;
  grid-row-gap: .5rem;
  grid-template-columns: max-content max-content max-content max-content;
}

#type-table tr td:last-child dl > * {
  margin: 0;
  padding: 0;
  font-weight: 500;
}

#type-table tr td:last-child dl > :nth-child(odd) {
  grid-row-start: 1;
}

#type-table tr td:last-child dl > :nth-child(even) {
  grid-row-start: 2;
}
</style>
