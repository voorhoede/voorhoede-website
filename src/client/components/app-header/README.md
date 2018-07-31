# App Header


## Usage

```html
<app-header
  :currentUrl="/en/services/"
  :links:="[
    { title: 'Services', slug: 'services' },
    { title: 'Cases', slug: 'cases' },
    { title: 'Academy', slug: 'academy' },
    { title: 'About us', slug: 'about-us', button: true },
    { title: 'Contact', slug: 'contact' },
  ]",
  :languages="[
    { locale: 'en', href: '/en/services/' },
    { locale: 'nl', href: '/nl/services/' },
  ]",
/>
```

## Props

| Prop | Type | Description |
| --- | --- | --- |
| currentUrl | String | The URL of the current page |
| links | Array | List of links to render. |
| languages | Array | List of available languages |

The Array of links contains objects. Each link has an opject with the next keys and values:

| key | type | value |
| --- | --- | --- |
| href | String | URL to put as href |
| title | String | What's being displayed |
| button | Boolean | Wether or not to display the link as a button (defaults to false) |

The Array of languages contains objects. Each language has an opject with the next keys and values:

| key | type | value |
| --- | --- | --- |
| locale | String | The locale of the language (for example: `en`) |
| href | String | URL to put as href |
