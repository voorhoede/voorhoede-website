# Input Checkbox

An input checkbox checks the validity of the provided input using browser validation (`checkValidity()`).

## Usage

```html
<input-checkbox
  id="id"
  name="name"
  label="label"
  value="value"
  :validate="validate"
  :validation-error-message="validation error message"
>

</input-checkbox>
```

## Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| id | String | true | The id of the input field |
| name | String | true | The name of the input field |
| label | String | true | The label value of the input |
| value | String | false | The value of the input |
| validate | Boolean | false | Determine if the input field will be validated or not |
| validation-error-message | String | false | The error message shown when the input field doesn't validate |
