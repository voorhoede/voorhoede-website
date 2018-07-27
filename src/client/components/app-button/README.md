# App Button

The App button supports a button and a link variant. 
The component will decide which variant to use. 
The difference between the two is that you give the `to` prop a href to make it a link.

## Usage

```html
<app-button label="button" />

<app-button label="button" to="https://voorhoede.nl" />
```

## Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| Label | String | true | A String that represents the label on the button |
| to | String | false | A href that the link links to |
| secondary | Boolean | false | A boolean that changes the button to it's `secondary` style (`secondary` and `small` can't be on the same `app-button`) |
| small | Boolean | false | A boolean that changes the button to it's `small` style (`secondary` and `small` can't be on the same `app-button`) |
