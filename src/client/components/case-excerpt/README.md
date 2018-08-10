# Case Excerpt
Adds information about a case. When active or hovererd it shows a tooltip. This tooltip can be aligned to the left or the right on a viewport larger than 480px.

## Usage

```html
<case-excerpt />
```

## Props
| Name | Type | required | description |
| --- | --- | --- | --- |
| caseId | String | false | this should be a unique key |
| primaryLabel | String | false | text in the primary button |
| primaryHref | String | false | href to the actual case page |
| secondaryLabel | String | false | secondary button text |
| secondaryHref | String | false | href to the overview page of the cases |
| imageName | String | true | name of the case illustration |
| caseDescriptionHeader | String | true | title of the case excerpt |
| caseDescriptionBody | String | true | description of the case excerpt |
| alignTooltip | String | false | align tooltip and tooltip triangle to left or the right, standard style centers tooltip |
