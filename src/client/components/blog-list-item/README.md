# Blog List Item


## Usage

```html
  <blog-list-item
    :item="{                           
      url: '/some-url',
      title: 'Peer-to-peer apis Peer-to-peer apis Peer-to-peer apis',
      date: '2018-04-20T00:00:00.000Z',
      authors: [{
      name: 'Marko',
        image: {
          format: 'jpeg',
          width: 40,
          height: 40,
          alt: 'Two hands forming a heart around the sun during a sunset',
          url: 'https://www.datocms-assets.com/2850/1522324546-marko.png?fit=crop&h=40&w=40',
        }]
    }"
    current-locale="nl"
  />
```

## Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| item | Object | true | Object |
| currentLocale | String | true | The current locale |

Each item has the following props:

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| url | String | true | Url to the blog post |
| title | String | true | Title of the blog post |
| date | Date | true | Release date of the blog post |
| authors | Array | true | Array of objects, with the name and image of the author(s) |
