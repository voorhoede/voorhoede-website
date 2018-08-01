# Page Title


## Usage

Provide the page-title component with two slots: the `title` slot, providing the title of the page (previewed small); and the `subTitle` slot, providing the subtitle of the page (previewed large).

```html
<page-title seo-title="We are De Voorhoede - how can we help?">
  <template slot="title">
    <p>We are De Voorhoede</p>
  </template>
  <template slot="subTitle">
    <p>How can we help?</p>
  </template>
</page-title>
```

## Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| seoTitle | String | true | Title used for SEO, placed as invisible `<h1>` tag on the page |
