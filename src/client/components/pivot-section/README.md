# Pivot section
A section that is used to display different types of call-to-action or pivot components.
Also has the ability to display an optional scroll indicator to scroll to top.

## Usage

```html
<pivot-section
  :pivots="[{title, body, buttonLabel, link, externalLink}, {...}]"
  :scroll-indicator="true"
/>
```

## Props

| Prop | Type | Required |
| --- | --- | --- | --- |
| pivots | Array | true
| scrollIndicator | Boolean | false
