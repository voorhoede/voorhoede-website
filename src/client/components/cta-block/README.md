# Cta block
A section that is used to create a `call-to-action` block for the end user.
The block contains a title to prompt the user to click the button and a button.

## Usage

```html
<cta-block
  title="got a project you need to bring to life?"
  ctaLabel="Drop us a line"
  ctaTo="https://voorhoede.nl"
/>
```

## Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| title | String | true | A string that is displayed above the cta button |
| ctaLabel | String | true | A string that is displayed on the button |
| ctaTo | String | true | A string that is a link |

