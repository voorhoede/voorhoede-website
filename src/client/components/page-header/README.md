# Page Header
Page header shows two entries of text, the big `headline` and the smaller `byline` above it. `heading` can be used to defines which of these is used as the `<h1>` inside the page-header.
Additional variations are made via booleans: `fill-screen` makes it fill the screen and `hasCurlyBracket` adds a curly bracket decoration (when `fill-screen` is also `true`).

## Usage

```html
<page-header
  byline="We are De Voorhoede"
  headline="How can we help?"
  heading="byline"
  fill-screen
  has-curly-bracket
  :image="image"
>

</page-header>
```
