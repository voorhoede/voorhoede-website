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

### Scripted migrations

We use scripted migrations for CMS model changes. By following [DatoCMS's scripted migrations guide](https://www.datocms.com/docs/scripting-migrations/scripting-migrations-with-the-datocms-cli), you can add your migration script and test it.

#### Apply your migration to the main environment

Once your PR is ready to merge, we have to apply the migrations DatoCMS's main environment. Follow the following script **on your branch, before merging**:

1. Turn on maintenance mode in DatoCMS
2. Apply migrations to a fresh sandbox
    1. Run `datocms migrations:run <env-name>-deploy` to create a fresh fork of the primary environment with the new migrations applied. We use the `-deploy` suffix so it's clear it's a deployment environment.
    2. Fill in new required content. Make sure to **not enter dummy content**, as this environment will go to production!
3. Commit the updated constants.mjs, containing your new environment
4. Merge the PR
5. Await the production deploy to succeed
6. Promote the new environment in DatoCMS
7. Turn off maintenance mode
8. Once you're sure everything is good and don't need the option to rollback, you can remove your previous deploy sandbox environment.

## Decision log

Key decisions that are made during the course of the project are documented in [docs/decision-log/](docs/decision-log/). Please read the log so you understand why decisions are made and document key decisions when you make them.
