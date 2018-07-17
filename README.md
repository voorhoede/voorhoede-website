# Voorhoede Dragonfly

> Website for De Voorhoede

## Development

### Getting started

* Clone the repository.
* Run app in development mode (`npm run dev`), see [scripts](#scripts).
* Changes on master and content publishing from the CMS trigger a new build and deploy to the [live environment](https://voorhoede-dragonfly.netlify.com).

### Structure

```
dist/             <- generated app
  client/         <- generated client-side app

src/              <- source files
  client/         <- Nuxt app
    assets/       <- core files, not public
    components/   <- Vue components
    layouts/      <- base layout for pages
    pages/        <- view per route
    static/       <- public assets

.env              <- local environment variables
dato.config.js    <- data dump configuration
netlify.toml      <- Netlify build & function config
nuxt.config.js    <- Nuxt app config
```

### Scripts

This project requires [Node.js](http://nodejs.org/) (>= v8) and 
[npm](https://npmjs.org/) (comes with Node).

After installing dependencies using `npm install` the following scripts are 
available:

`npm run ...` | Description
---|---
`analyze` | Analyze the bundles created during build.
`build` | Builds client, guide and server for production to `dist/`.
`dev` | Serves client app on [`http://localhost:3278`](http://localhost:3278) ("lean" in T9) with hot reloading.
`guide` | Serves guide on [`http://localhost:3279`](http://localhost:3279) for local development.
`proxy` | Exposes app on localhost to world wide web for testing on other devices.
`start` | Serves production version of client app from (`/dist/`) on [`http://localhost:3278`](http://localhost:3278).
`new-component` | Creates a new component folder 

## Usefull links

* [localhost:3278](http://localhost:3278)
* [Dato cms](https://voorhoede-dragonfly-cms.admin.datocms.com/editor)
* [Deployed site](https://voorhoede-dragonfly.netlify.com)
* [Netlify project](https://app.netlify.com/sites/voorhoede-dragonfly/overview)
