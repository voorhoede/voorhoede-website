# Voorhoede Dragonfly

> Website for De Voorhoede

## Development

### Getting started

* Clone the repository.
* Run `npm ci` to install dependencies.
* All needed environment variables are listed in the [.env.example](.env.example) file. To automatically set them fill in a `.env` file following the same structure as the example file.
```sh
cp .env.example .env
```
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

This project requires [Node.js](http://nodejs.org/) (>= v10.8.0) and
[npm](https://npmjs.org/) (comes with Node).

After installing dependencies using `npm install` the following scripts are
available:

`npm run ...` | Description
---|---
`analyze` | Analyze the bundles created during build.
`build` | Builds client and server for production to `dist/`.
`dev` | Serves client app on [`http://localhost:3278`](http://localhost:3278) ("lean" in T9) with hot reloading.
`start` | Serves production version of client app from (`/dist/`) on [`http://localhost:3278`](http://localhost:3278).
`data` | Imports all data from Dato CMS.

## Documentation

All components are documented with a README.md file in their own folder.
Other documentation can be found [here](_docs/)

## Analytics measurement
Analytics is managed with Google Tag Manager further info can be found [here](_docs/analytics.md)

## Useful links

* [Local environment](http://localhost:3278)
* [Preview environment](https://voorhoede-dragonfly.netlify.com)
* [Dato CMS](https://voorhoede-dragonfly-cms.admin.datocms.com/editor)
* [Dato GraphiQL](https://graphql.datocms.com/graphiql)
* [Netlify project](https://app.netlify.com/sites/voorhoede-dragonfly/overview)
