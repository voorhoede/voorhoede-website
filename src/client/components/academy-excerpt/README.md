# Academy Excerpt


## Usage

```html
<academy-excerpt
  date-string="2018-10-31"
  title="Simply Serverless Meetup"
  description="On 12 July we will host the Simply Serverless Meetup. We'll introduce you to cloud functions, a brand new tool for serverless Node apps and show the benefits by sharing a project built with a serverless architecture."
  cta-primary-label="Sign up"
  cta-primary-to="https://google.nl"
  ctaSecondaryLabel="Learn more"
  ctaSecondaryTo="https://google.nl"
  :image="{
    url: 'https://www.datocms-assets.com/6068/1529572359-random-image.jpeg',
    type: 'jpeg',
    width: 1280,
    height: 720,
  }"
/>
```

## Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| dateString | String | true | Date of the event in yyyy-mm-dd format |
| title | String | true | Title of the event |
| description | String | true | Description of the event |
| ctaPrimaryLabel | String | true | Label of the primary button |
| ctaPrimaryTo | String | true | Href of the primary button |
| ctaSecondaryLabel | String | true | Label of the secondary button |
| ctaSecondaryTo | String | true | Href of the secondary button |
| image | Object | false | Object of the image to display |

The image object should contain the next properties:

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| url | String | true | Path to the image |
| type | String | true | Image type |
| width | Number | true | Width in px |
| height | Number | true | Height in px |
