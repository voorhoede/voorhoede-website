# Input Field
An input field checks the validity of the provided input using browser validation (`checkValidity()`).

## Usage

```html
<input-field
  id="id"
  name="id"
  :value="value"
  type="type"
  placeholder="placeholderLabel"
  class="body"
  v-bind="$attrs"
  ref="input"
  @input="updateInput"
>

</input-field>
```
