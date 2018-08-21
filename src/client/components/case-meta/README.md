# Case Meta


## Usage

```html
<case-meta
  expertiseTitle="Expertise"
  :expertises="[{title: 'Development'}, {title: 'Prototyping'}]"
  platformTitle="Platform"
  :platforms="[{title: 'Vuejs'}, {title: 'Node.js'}, {title: 'Nuxt'}]"
  deliverableTitle="Deliverables"
  :deliverables="[{title: 'API intergration'}, {title: 'BFF (back-end for front-end)'}]"
  interestedTitle="Interested"
  interestedLinkLabel="Visit site"
  interestedLinkUrl="https://google.nl"
/>
```

## Props
| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| expertiseTitle | String | true | Title of the section |
| expertises | Array | true | Array of items |
| platformTitle | String | true | Title of the section |
| platforms | Array | true | Array of items |
| deliverableTitle | String | true | Title of the section |
| deliverables | Array | true | Array of items |
| interestedTitle | String | true | Title of the section |
| interestedLinkLabel | String | true | Label for the interested link |

Each item has the following props:

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| title | String | true | Title displayed on the page |
