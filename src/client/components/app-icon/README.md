# App Icon
App icon loads svg's in the img source tag to show icons. The image tag has two required properties named the `name` and `alt` and `isLarge` string values.

## Usage

```html
<app-icon :name="name" :alt="alt" :isLarge="true" />
```

## Props
| name | required | description |
| --- | --- | --- |
| name | true | the name of the svg file in the icons folder |
| alt | false | the alt alt value for the image tag that is need to load in the svg |
| isLarge | false | adds large icon variant |
