# Blog List Item


## Usage

```html
  <blog-list-item
    :item="{                           
      slug: 'some-slug',
      date: '2018-04-20T00:00:00.000Z',
      authors: [{
      name: 'Marko',
        image: {
          format: 'jpeg',
          width: 135,
          height: 135,
          alt: 'Two hands forming a heart around the sun during a sunset',
          url: 'https://www.datocms-assets.com/2850/1522324546-marko.png?fit=crop&h=135&w=135',
        }]
    }"
  />
```

## Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| item | Object | true | Object |

Each item has the following props:

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| slug | String | true | Slug to the blog post |
| date | Date | true | Release date of the blog post |
| authors | Array | true | Array of objects, with the name and image of the author(s) |
