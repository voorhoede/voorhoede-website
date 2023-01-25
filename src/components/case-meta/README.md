# Case Meta


## Usage

```html
<case-meta
  expertise-title="Expertise"
  :expertises="[{title: 'Development'}, {title: 'Prototyping'}]"
  technologies-title="Technologies"
  :technologies="[{title: 'Vuejs'}, {title: 'Node.js'}, {title: 'Nuxt'}]"
  deliverable-title="Deliverables"
  :deliverables="[{title: 'API intergration'}, {title: 'BFF (back-end for front-end)'}]"
  interested-title="Interested"
  interested-link-label="Visit site"
  interested-link-url="https://google.nl"
/>
```

## Props
| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| expertise-title | String | true | Title of the section |
| expertises | Array | true | Array of items |
| technologies-title | String | true | Title of the section |
| technologies | Array | true | Array of items |
| deliverable-title | String | true | Title of the section |
| deliverables | Array | true | Array of items |
| interested-title | String | true | Title of the section |
| interested-link-label | String | true | Label for the interested link |

Each item has the following props:

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| title | String | true | Title displayed on the page |
