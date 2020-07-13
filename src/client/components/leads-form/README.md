# Leads Form

A from where users can leave their name and email in exchange for a download.

## Usage

```html
<leads-form
  :no-background="true"
  :file="{ url: '', filename: '' }"
  :button-label="'Download'"
/>
```

## Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| no-background | Boolean | false | The form has a yellow background by default; enable this Boolean to remove the background color |
| file | Object | false | The file to be downloaded |
| button-label | String | false | Label for the button |
