## Building

### :exclamation: Prerequisites

You need to have the latest/LTS [node](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/get-npm) versions installed.

Next step, clone this repository and run:

```bash
npm install
```

This will take some time and will install all packages necessary to run the website.

### :construction_worker: Development

While developing the website, use:

```bash
npm start
```

or for developing the website with `hugo server --buildDrafts --buildFuture`, use:

```bash
npm run preview
```

Then visit http://localhost:3000/ _- or a new browser windows popped-up already -_ to preview your new website. Webpack Dev Server will automatically reload the CSS or refresh the whole page, when stylesheets or content changes.
