# Service Excerpt


## Usage

```html
<service-excerpt
  title="We learn, we train"
  subtitle="Kick-start your project"
  :characteristics="[
    'Get a roadmap',
    'Budget indication for your project',
    'Test your idea using a prototype',
    'With our input, you decide the next step',
  ]"
  href="/services/project-kick-start"
/>
```

## Props

| Prop | Type | required | description |
| --- | --- | --- | --- |
| title | String | true | Title of the service |
| subtitle | String | true | Sub title of the service |
| characteristics | Array | true | Array of strings, describing the service |
| serviceLink | String | true | Link to service page |
