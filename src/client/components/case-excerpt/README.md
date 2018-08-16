# Case Excerpt
Adds information about a case. When active or hovererd it shows a tooltip. This tooltip can be aligned to the left or the right on a viewport larger than 480px.

## Usage

```html
<case-excerpt
	:caseId="caseId"
	:primaryLabel="primaryLabel"
	:primarySlug="{ name: 'locale-cases-slug', params: { slug: 'funda', locale: currentLocale }}"
	:primarySlug="primaryHref"
	:secondaryLabel="secondaryLabel"
	:secondarySlug="{ name: 'locale-cases', params: { locale: currentLocale }}"
	:imageUrl="/images/logo.svg"
	:title="title"
	:body="body"
	:alignTooltip="alignTooltip"
	/>
```

## Props
| Name | Type | required | description |
| --- | --- | --- | --- |
| imageUrl | String | true | Contains the url of the case illustration |
| title | String | true | Title of the case excerpt |
| body | String | true | Description of the case excerpt |
| caseId | String | false | This should be a unique key |
| primaryLabel | String | false | Text in the primary button |
| primarySlug | String | false | Named slug that contains a slug and locale variable to the case page |
| secondaryLabel | String | false | Secondary button text |
| alignTooltip | String | false | Align tooltip and tooltip triangle to left or the right, standard style centers tooltip |
