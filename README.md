# eleventy-base-blog

A very minimal developer blog theme using Eleventy (11ty).

## Deploy this to your own site

Read more about [Deploying an Eleventy project](https://www.11ty.dev/docs/deployment/).

## Deploy to Cloudflare Pages

1. Push this repository to a version control provider that Cloudflare Pages supports (GitHub, GitLab, or Bitbucket).
2. Create a new Pages project in the Cloudflare dashboard and connect it to your repository.
3. Use `npm run build` as the build command and `_site` as the build output directory.
4. After the first build completes, enable automatic deployments from the selected branch so every push publishes a new version.

### GitHub Actions deployment

This repo includes `.github/workflows/deploy.yml`, which builds the site with Eleventy and deploys it to Cloudflare Pages. To enable it:

1. In your repository settings, add the following secrets:
  - `CLOUDFLARE_API_TOKEN`: a token with *Cloudflare Pages - Edit* permission.
  - `CLOUDFLARE_ACCOUNT_ID`: your Cloudflare account ID.
  - `CLOUDFLARE_PROJECT_NAME`: the Cloudflare Pages project slug.
2. Push to the `main` branch (or run the workflow manually) and the action will build `npm run build` then publish `_site` via `cloudflare/pages-action`.

### Local Cloudflare preview (optional)

Install Wrangler (`npm install -g wrangler`) and use it to emulate the production build locally:

```
wrangler pages dev
```

Wrangler reads `wrangler.toml` to find the `_site` output directory so the preview matches the Cloudflare Pages environment.

## Getting Started

### 1. Clone this Repository

```
git clone https://github.com/Ramkarthik/minimal-developer.git my-blog-name
```

### 2. Navigate to the directory

```
cd my-blog-name
```

Go over `metadata.json` to configure the different options for your website.

Have a look at `.eleventy.js` to see if you want to configure any Eleventy options differently.

### 3. Install dependencies

```
npm install
```

### 4. Edit \_data/metadata.json

### 5. Configure the guestbook (optional)

Update the URL in `_data/guestbook.json` to match your Atabook handle so the embedded guestbook loads the correct board.

### 5. Run Eleventy

```
npx @11ty/eleventy
```

Or build and host locally for local development

```
npx @11ty/eleventy --serve
```

Or build automatically when a template changes:

```
npx @11ty/eleventy --watch
```

Or in debug mode:

```
DEBUG=* npx @11ty/eleventy
```

### Implementation Notes

- `about/index.md` shows how to add a content page.
- `posts/` has the blog posts but really they can live in any directory. They need only the `post` tag to be added to this collection.
- Content can be any template format (blog posts needn’t be markdown, for example). Configure your supported templates in `.eleventy.js` -> `templateFormats`.
- The `css`, `js`, and `img` directories in the input directory will be copied to the output folder (via `addPassthroughCopy()` in the `.eleventy.js` file).
- The blog post feed template is in `feed/feed.njk`. This is also a good example of using a global data files in that it uses `_data/metadata.json`.
- This example uses three layouts:
  - `_includes/layouts/base.njk`: the top level HTML structure
  - `_includes/layouts/home.njk`: the home page template (wrapped into `base.njk`)
  - `_includes/layouts/post.njk`: the blog post template (wrapped into `base.njk`)
- `_includes/postlist.njk` is a Nunjucks include and is a reusable component used to display a list of all the posts. `index.njk` has an example of how to use it.