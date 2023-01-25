# Link Card
A card adds a description on the topic with additional link for more detail either external or internal.

## Usage

```html
	<link-card
	  :title="title"
	  :image="image"
	  :body="Some body text"
	  :internal-link?="some-slug"
	  :external-link?="external link"
	/>
```

## Props
| Name | Type | required | description |
| --- | --- | --- | --- |
| image | String | true | Contains the url of the case illustration |
| title | String | true | Title of the link |
| body | String | true | Description of the link |
| internal-link | [Object, String] | false | Named slug that contains a slug and locale variable to the case page |
| external-link | String | false | External link  |
