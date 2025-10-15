# Angular Deployment Demo Notes

This document tracks the steps taken to set up deployment and CI/CD for the Angular application demo.

## Initial Setup
- Created `documents` folder for documentation.
- Added this markdown file to record deployment steps.

## Recommended Functionality for Deployment Demo
To demonstrate deployment and CI/CD effectively, I recommend adding the following functionality to the app:
1. **A simple interactive component**: Add a counter component that allows users to increment/decrement a value. This provides a basic feature to test builds and deployments.
2. **Environment-specific configurations**: Add environment files to show how different builds can be configured for dev/staging/production.
3. **Basic routing**: Ensure the app has multiple routes to demonstrate full app deployment.
4. **GitHub Actions CI/CD**: Set up automated building and deployment to GitHub Pages.

## Next Steps
- Implement the counter component.
- Add environment configurations.
- Configure GitHub Actions workflow for CI/CD.
- Deploy to GitHub Pages.

## Implementation Steps
- Generated a `counter` component using Angular CLI.
- Added increment/decrement functionality using Angular signals.
- Integrated the counter component into the main app template.
- Added basic styling to the counter.
- Created GitHub Actions workflow for automated build and deployment to GitHub Pages.
- Configured the build to use the correct base href for GitHub Pages deployment.
- Added production environment configuration (`environment.prod.ts`).
- Enhanced counter component to use environment variables (app name, production flag).
- Improved styling with modern gradient design, responsive layout, and smooth animations.
- Added comprehensive unit tests covering component functionality, environment integration, and template rendering.
- All tests pass successfully (12/12 SUCCESS).
- Updated GitHub Actions workflow to include automated testing on push, pull requests, and manual triggers.

## CI/CD Pipeline
The GitHub Actions workflow (`deploy.yml`) includes:
- **Triggers**: Push to main, pull requests to main, and manual workflow dispatch
- **Permissions**: Configured for GitHub Pages deployment (contents: read, pages: write, id-token: write)
- **Concurrency**: Prevents multiple simultaneous deployments
- **Environment**: Uses `github-pages` environment for deployment
- **Steps**:
  1. Checkout code (actions/checkout@v4)
  2. Setup Node.js 20 with npm caching
  3. Install dependencies (npm ci)
  4. Run unit tests (headless Chrome)
  5. Build for production with correct base href (`--base-href "/CAD-angular-deployment/"`)
  6. Setup GitHub Pages (actions/configure-pages@v4)
  7. Upload build artifacts from correct output path (actions/upload-pages-artifact@v3)
  8. Deploy to GitHub Pages (actions/deploy-pages@v4)

### Key Configuration Details

#### GitHub Pages Settings

The repository must be configured with:

- **Source**: "GitHub Actions" (NOT "Deploy from a branch")
- **Location**: Repository Settings → Pages → Source → GitHub Actions
- This allows the workflow to deploy using the `actions/deploy-pages@v4` action

#### Angular Build Output Path

**Critical**: This app uses Angular's newer `@angular/build:application` builder (v17+), which outputs files to:

```text
dist/deploymentexample/browser/
```

NOT the older output structure of `dist/deploymentexample/`

The workflow **must** upload artifacts from the correct path:

```yaml
- name: Upload artifact
  uses: actions/upload-pages-artifact@v3
  with:
    path: './deploymentexample/dist/deploymentexample/browser'
```

**Common Issue**: If you see a 404 error on GitHub Pages after successful deployment, verify:

1. GitHub Pages source is set to "GitHub Actions" (not "Deploy from a branch")
2. The upload artifact path points to the `/browser` subdirectory
3. The build uses the correct `--base-href` flag for the repository name

#### Base Href Configuration

For GitHub Pages project sites (repo-based, not user/org sites), the base href must match the repository name:

```bash
npm run build -- --configuration production --base-href "/CAD-angular-deployment/"
```

Without this, the app will fail to load CSS, JS, and other assets because it will look for them at the wrong path.

## Deployment Instructions

1. **Ensure GitHub Pages is configured correctly**:
   - Go to Repository Settings → Pages
   - Set Source to "GitHub Actions"
   - Save the configuration

2. **Push code to the `main` branch**:

   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

3. **Monitor the deployment**:
   - Go to the "Actions" tab in GitHub
   - Watch the "Deploy to GitHub Pages" workflow run
   - Verify all steps complete successfully (especially the build and upload artifact steps)

4. **Access the deployed app**:
   - The app will be available at: `https://bpmstc.github.io/CAD-angular-deployment/`
   - The deployment URL is also shown in the workflow output

## Testing the Deployment

- The counter component provides interactive functionality to verify the app is working.
- Check that the build completes successfully in GitHub Actions.
- Verify the deployed app loads correctly on GitHub Pages.
- Unit tests ensure code quality and functionality.
- Test that all routes work correctly with the base href configuration.

## Troubleshooting

### 404 Error After Successful Deployment

**Symptom**: GitHub Actions shows successful deployment, but visiting the site shows a 404 error.

**Solutions**:

1. Check GitHub Pages source is set to "GitHub Actions" (not "Deploy from a branch")
2. Verify the upload artifact path includes `/browser` subdirectory for Angular v17+ apps
3. Check the Actions workflow logs to confirm files were uploaded to the artifact

### Assets Not Loading (Blank Page)

**Symptom**: Page loads but shows blank/white screen, or console errors about missing JS/CSS files.

**Solution**:

- Verify the `--base-href` flag matches your repository name exactly
- Should be: `--base-href "/CAD-angular-deployment/"`
- Check browser console for 404 errors on asset paths

### Build Fails in CI/CD

**Symptom**: GitHub Actions workflow fails during the build or test step.

**Solutions**:

1. Ensure `package-lock.json` is committed to the repository
2. Verify all dependencies are in `package.json`
3. Check that tests pass locally before pushing
4. Review the workflow logs for specific error messages
