# Case pullquote-composition

Its a layout based on three elements a pullquote, an image and a rich textblock. This layout can be configured. It is possible to flip the pullquote with the rich textblock by setting ``` inverse ``` to true.
The image url is not a required attribute. If not provided, then the pullquote will also cover the spacing of the image on mobile and leave a blank space on larger screens.

## Usage

```html
<case-pull-quote-composition
	:inverse="true"
	:body="body"
	:image-url="imageUrl"
	:pullquote="pullquote"
/>
```
