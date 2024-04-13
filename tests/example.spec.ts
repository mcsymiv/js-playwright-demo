import { test, expect } from '@playwright/test';
import { screenshotsPath } from '../settings/testSettings';
import { simpleGit, SimpleGit, CleanOptions, StatusResult  } from 'simple-git';

test.describe('simple-git test', async () => {

  test.afterAll(async () => {
    const git: SimpleGit = simpleGit().clean(CleanOptions.FORCE);
    const status: StatusResult = await git.status()

    console.log(status.modified);
  });

  test('get started link', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();

    await page.screenshot({ path: screenshotsPath, fullPage: false });

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });

})

