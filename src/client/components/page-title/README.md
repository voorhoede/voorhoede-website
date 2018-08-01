# Page Title

## Usage

Provide the page-title component with two slots: the `title` slot, providing the title of the page (previewed small); and the `subTitle` slot, providing the subtitle of the page (previewed large).

Please use `<span>` tags in these slots, since the semantic title is written on the page by the `seoTitle` prop.

```html
<page-title seo-title="We are De Voorhoede - how can we help">
  <template slot="title">
    <span>We are De Voorhoede</span>
  </template>
  <template slot="subTitle">
    <span>How can we help?</span>
  </template>
</page-title>
```

## Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| seoTitle | String | true | Title used for SEO, placed as invisible `<h1>` tag on the page |
