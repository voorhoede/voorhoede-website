# App Banner
Adds a banner to the page to display a quick note of information with a link for
more information.

## Usage
```html
<app-banner
  text="Lorem ipsum ipsum dolor sit amet."
  link="{ slug: '/lorem-ipsum/' }"
  link-title="Read more"
/>
```

## Props
| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| text | String | true | The sentence in the banner |
| link | String | true | Link for the button |
| linkTitle | String | false | Title for the button |
