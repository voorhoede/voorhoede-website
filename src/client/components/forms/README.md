# Forms

## Usage

Make sure of the following things when writing a form (following the examples below):
1. Always wrap `<input>` elements with the `<label>` element.
2. Always put the text of the label in a `<span>`, inside the `<label>`.
3. Put a class on the `<span>` and the `<input>` to apply font-sizes.

### Text field

```html
<label>
  <span class="body-petite">Label goes here</span>
  <input class="body" type="text" name="input" placeholder="placeholder"/>
</label>
```

### Select field

```html
<label>
  <span class="body-petite">Label goes here</span>
  <select class="body" type="text" name="select">
    <option>Option A</option>
    <option>Option B</option>
    <option>Option C</option>
  </select>
</label>
```

### Textarea

By design a textarea should have 3 rows. Add a `rows="3"` attribute

```html
<label>
  <span class="body-petite">Label goes here</span>
  <textarea rows="3" class="body"></textarea>
</label>
```
