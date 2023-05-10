# De Voorhoede Website
[![netlify deploy status](https://tinyshields.dev/netlify/0b43ae43-afe1-44cc-95be-5618c8eb1457.svg)][netlify]
[![depfu dependency status](https://badges.depfu.com/badges/de8167d8d73e13926254bca05f7b5374/overview.svg)][depfu]

## Development

### Getting started
* Clone the repository.
* Run `npm ci` to install dependencies.
* All needed environment variables are listed in the [.env.example](.env.example) file. To automatically set them fill in a `.env` file following the same structure as the example file.
```sh
cp .env.example .env
```
* Run app in development mode (`npm run dev`).

[netlify]: https://app.netlify.com/sites/voorhoede-website/overview
[depfu]: https://depfu.com/repos/github/voorhoede/voorhoede-website?project_id=37720

## Decision log

Key decisions that are made during the course of the project are documented in [docs/decision-log/](docs/decision-log/). Please read the log so you understand why decisions are made and document key decisions when you make them.
