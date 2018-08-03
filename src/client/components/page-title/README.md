# Page Title


## Usage

Provide the page-title component with two slots: the `title` slot, providing the title of the page (previewed small); and the `subTitle` slot, providing the subtitle of the page (previewed large).

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

When the title or sub title should be the `<h1>` tag of the page, you enter this in one of these slots and leave out the `seoTitle` prop.

## Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| seoTitle | String | false | Title used for SEO, placed as invisible `<h1>` tag on the page |
