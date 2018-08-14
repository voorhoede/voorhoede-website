# Case Excerpt
Adds information about a case. When active or hovererd it shows a tooltip. This tooltip can be aligned to the left or the right on a viewport larger than 480px.

## Usage

```html
<case-excerpt
	:caseId="caseId"
	:primaryLabel="primaryLabel"
	:primaryHref="primaryHref"
	:secondaryLabel="secondaryLabel"
	:secondaryHref="secondaryHref"
	:imageName="imageName"
	:caseDescriptionHeader="caseDescriptionHeader"
	:caseDescriptionBody="caseDescriptionBody"
	:alignTooltip="alignTooltip"
	/>
```

## Props
| Name | Type | required | description |
| --- | --- | --- | --- |
| imageName | String | true | Name of the case illustration |
| caseDescriptionHeader | String | true | Title of the case excerpt |
| caseDescriptionBody | String | true | Description of the case excerpt |
| caseId | String | false | This should be a unique key |
| primaryLabel | String | false | Text in the primary button |
| primaryHref | String | false | Href to the actual case page |
| secondaryLabel | String | false | Secondary button text |
| secondaryHref | String | false | Href to the overview page of the cases |
| alignTooltip | String | false | Align tooltip and tooltip triangle to left or the right, standard style centers tooltip |
