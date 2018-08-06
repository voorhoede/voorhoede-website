# Services List

## Usage

```html
<services-list
  :services="[
    {
      title: 'We learn, we train',
      subtitle: 'Kick-start your project',
      characteristics: [
        'Get a roadmap',
        'Budget indication for your project',
        'Test your idea using a prototype',
        'With our input, you decide the next step',
      ],
      href: '/services/project-kick-start',
    },
    {
      title: 'Need a team?',
      subtitle: 'Your own agile team',
      characteristics: [
        'A dedicated team',
        'Scrum master, developers and optional designers',
        'On-site or at our office',
        'You stay in charge',
      ],
      href: '/services/agile-team',
    },
    {
      title: 'Need developers?',
      subtitle: 'Front-end specialists',
      characteristics: [
        'Experts in JavaScript (frameworks), HTML and CSS',
        'Who quickly get the hang of your project',
        'Back-up of 20 colleagues',
        'Immediately available',
      ],
      href: '/services/front-end-specialists',
    }
  ]"
/>
```

## Props

| prop | Type | required | description |
| --- | --- | --- | --- |
| services | Array | true | List of services |

Each service should be an object with the following properties:

| prop | Type | required | description |
| --- | --- | --- | --- |
| title | String | true | Title of the service |
| subtitle | String | true | Sub title of the service |
| characteristics | Array | true | Array of strings, describing the service |
| serviceLink | String | true | Link to service page |
