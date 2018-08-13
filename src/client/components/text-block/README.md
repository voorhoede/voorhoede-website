# Text Block

## Usage
The Text block has a required slot for the content of the component. 

```html
<text-block
  title="The solution"
>
  <p class="text-block__item body">
    At De Voorhoede, we’re a technology minded bunch. So we started with a technology based idea: can we automatically detect litter in a picture? It turns out we can! And not just that: we can detect if there’s plastic in it, if you made a picture of a bottle, if you can see a brand name on it, and much more. How? We’re leveraging Google’s Vision API, a cloud service analysing images using machine learning. After a quick test we’re convinced this idea could work. But a tech-y idea is still a way off from something that would help the Plastic Soup Surfer.
  </p>
</text-block>
```

## Props
| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| title | String | true | A string that is displayed above the slot |
