# Case Excerpt
Adds information about a case. When active or hovererd it shows a tooltip. This tooltip can be aligned to the left or the right on a viewport larger than 480px.

## Usage

```html
<case-excerpt
	case-id="caseId"
	primary-label="primaryLabel"
	slug="some-slug"
	secondary-label="secondaryLabel"
	image-url="/images/logo.svg"
	title="title"
	body="body"
	align-tooltip="alignTooltip"
	/>
```

## Props
| Name | Type | required | description |
| --- | --- | --- | --- |
| image-url | String | true | Contains the url of the case illustration |
| title | String | true | Title of the case excerpt |
| body | String | true | Description of the case excerpt |
| case-id | String | false | This should be a unique key |
| primary-label | String | false | Text in the primary button |
| slug | String | false | Named slug that contains a slug and locale variable to the case page |
| secondary-label | String | false | Secondary button text |
| align-tooltip | String | false | Align tooltip and tooltip triangle to left or the right, standard style centers tooltip |
