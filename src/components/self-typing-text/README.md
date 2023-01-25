# Self Typing Text
Self typing text types the text or fades in after 1.5s if js hasn't loaded yet.
The target duration of this effect is 1s. However, the interval between two letters has a
minimun and a maximum so that it does not look unnatural for outliers in text lengths.

## Usage

```html
<self-typing-text
    :text="text"
/>
```
