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

We use scripted migrations for CMS model changes. Use [DatoCMS's scripted migrations guide](https://www.datocms.com/docs/scripting-migrations/scripting-migrations-with-the-datocms-cli), to add a migration script and test it.

#### Using a sandbox environment during development

If you need to make changes to the CMS model you will have to use a sandbox environment:

1. Create a new sandbox by forking the primary environment [here](https://voorhoede-website.admin.datocms.com/admin/environments) or by doing `npx datocms environments:fork <primary-env> <new-env>`. DatoCMS has a limit on concurrent sandboxes, if those are occupied check with your teammates to see if any of them can be deleted. 
2. Update the value of `datocmsEnvironment` at [`constants.mjs`](/src/constants.mjs) to `<new-env>`
3. Run the app in development mode (`npm run dev`). 

#### Creating migrations
After you are done setting up the sandbox there are 2 ways of creating migrations.

##### Manually
1. Create a new migration script using `npx datocms migrations:new 'create <migration name>' --api-token=<YOUR-API-TOKEN>`
2. Open the file that was just created in the [`migrations` folder](/migrations/) and write your migrations
3. Run the migrations on your sandbox environment `npx datocms migrations:run --destination=<new-env> --api-token=<YOUR-API-TOKEN>`

##### Automatically
1. Go to `https://voorhoede-website.admin.datocms.com/environments/<new-env>` and make changes to the models. Make sure you are on the correct sandbox before making changes, the name of the environment should appear on the right of the navbar.
2. Have the client autogenerate a migration file with all your changes `npx datocms migrations:new addAuthors --autogenerate=<new-env>:<primary-env> --api-token=<YOUR-API-TOKEN>`
3. Check that the autogenerated file is correct
   
#### Apply your migration to the main environment

Once your PR is ready to merge, we have to apply the migrations to DatoCMS's main environment. Follow the following script **on your branch, before merging**:

1. Turn on maintenance mode in DatoCMS
2. Apply migrations to a fresh sandbox
    1. Run `npx datocms migrations:run --destination=<env-name>-deploy --api-token=<token>` to create a fresh fork of the primary environment with the new migrations applied. We use the `-deploy` suffix so it's clear it's a deployment environment.
    2. Fill in the required content. Make sure to **not enter dummy content**, as this environment will go to production!
3. Commit the updated constants.mjs, containing your new environment
4. Merge the PR
5. Await the production deploy to succeed
6. Promote the new environment in DatoCMS
7. Turn off maintenance mode
8. Once you've made sure everything is in order, you can remove the previous primary environment. Be aware that you forfeit the option to rollback by performing this action.

## Decision log

Key decisions that are made during the course of the project are documented in [_docs/decision-log/](_docs/decision-log/). Please read the log so you understand why decisions are made and document key decisions when you make them.
