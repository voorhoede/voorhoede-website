# App Banner
Adds information about a case. When active or hovererd it shows a tooltip. This tooltip can be aligned to the left or the right on a viewport larger than 480px.

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
