# CAD-angular-deployment

Deploy an Angular app to GitHub Pages using GitHub Actions.

## GitHub repository settings required

For this repository (`CAD-angular-deployment`) to deploy correctly, configure the following in GitHub:

1. **Enable GitHub Pages via Actions**
   - Go to **Settings → Pages**
   - Set **Source** to **GitHub Actions** (not “Deploy from a branch”)

2. **Allow Actions to run and write Pages artifacts**
   - Go to **Settings → Actions → General**
   - Ensure Actions are enabled for this repository
   - Keep default workflow permissions compatible with Pages deployment (this workflow requests the required `pages: write` and `id-token: write` permissions)

3. **Use the correct default branch**
   - The workflow triggers on pushes to **`main`**
   - Go to **Settings → Branches** and confirm your active branch is `main`, or update `.github/workflows/deploy.yml` if you use a different branch

4. **(If using branch protection) allow deployments**
   - If `main` is protected, ensure merges can still trigger the workflow and that required checks include this workflow as needed by your team policy

## Deployment behavior in this repo

The workflow in `.github/workflows/deploy.yml` is already configured to:

- Run tests
- Build Angular with the correct project-site base href:
  - `--base-href "/CAD-angular-deployment/"`
- Upload the Angular v17+ browser build output:
  - `deploymentexample/dist/deploymentexample/browser`
- Deploy to the `github-pages` environment

## Deploy steps

1. Push to `main`.
2. Open the **Actions** tab and monitor **Deploy to GitHub Pages**.
3. After success, open:
   - `https://bpmstc.github.io/CAD-angular-deployment/`
