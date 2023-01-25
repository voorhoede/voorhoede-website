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

## Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| type | String | true | The type of input field (e.g. text or tel) |
| id | String | true | The id of the input field |
| label | String | true | The label value of the input |
| value | String | false | The value of the input |
| placeholder-label | String | true | The placeholder of the input |
| validate | Boolean | true | Determine if the input field will be validated or not |
| validation-error-message | String | false | The error message shown when the input field doesn't validate |
