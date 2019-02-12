# Cta block
A section that is used to create a `call-to-action` block for the end user.

## Usage
The Cta block has two `slots` named: `heading` and `body`.

The `heading` slot needs a `heading` with a class of `h1-h5`. The Component will wrap it with a `header` tag. This slot is highly recommended.

The `body` slot is an optional slot when the `call-to-action` needs more information.

```html
<pivot-section
  ctaLabel="Drop us a line"
  ctaTo="https://voorhoede.nl"
>
  <template slot="heading">
    <h2 class="h4">Got a project you need to bring to life?</h2>
  </template>
  <template slot="body">
    <p class="body">For us, that’s about technology and user experience. Fast, available for all, enjoyable to use. And fun to build. This is how our team bands together, adhering to the same values, to make sure we achieve a solid result for clients both large and small. Does that fit you?</p>
  </template>
</pivot-section>
```

## Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| ctaLabel | String | true | A string that is displayed on the button |
| ctaTo | String | true | A string that is a link |
