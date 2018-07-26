# Forms

## Usage

Always wrap an `input` in a `label`!

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
