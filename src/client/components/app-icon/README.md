# App Icon
App icon loads svg's in the img source tag to show icons. The image tag has two required properties named the `name` and `alt` string values.

## Usage

```html
<app-icon :name="name" :alt="alt" />
```

## Props
| name | required | description |
| --- | --- | --- |
| name | true | the name of the svg file in the icons folder |
| alt | true | the alt alt value for the image tag that is need to load in the svg |
