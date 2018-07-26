# App Header


## Usage

```html
<app-header :currentUrl="/en/services/" :languages="languages" :links="links"/>

<script>
import { AppHeader } from '~/components'

export default {
  components: { AppHeader },
  data() {
    return {
      currentUrl: '/en/services/',
      languages: [
        { locale: 'en', href: '/en/services/' },
        { locale: 'nl', href: '/nl/services/' },
      ],
      links: [
        { title: 'Services', href: '/services/' },
        { title: 'Cases', href: '/cases/' },
        { title: 'Academy', href: '/academy/' },
        { title: 'About us', href: '/about-us/',
          button: true },
        { title: 'Contact', href: '/contact/' },
      ],
    }
  }
}
</script>
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
| href | String | URL to put as href |
| locale | String | The locale of the language (for example: `en`) |
