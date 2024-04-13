import { test, expect } from '@playwright/test';
import { githubAccessToken  } from '../config/envs';
import { screenshotsPath, appRepoName } from '../settings/testSettings';
import { simpleGit, SimpleGit, StatusResult  } from 'simple-git';

test.describe('simple-git test', async () => {

  test.afterAll(async () => {
    const git: SimpleGit = simpleGit();
    const status: StatusResult = await git.status()
    const gitHubUrl = `https://${githubAccessToken}@github.com/mcsymiv/${appRepoName}.git`;

    try {
      // await git.addConfig('user.email','s.mcsymiv@gmail.com');
      // await git.addConfig('user.name','mcsymiv');

      // await git.addRemote('origin', gitHubUrl);

      await git.add(status.modified);
      await git.commit('simple-git commit message, add screenshots');
      await git.push('origin', 'main');

    } catch (error) {
      console.log(error);
    }

  });

  test('get started link', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();

    await page.screenshot({ path: screenshotsPath, fullPage: true });

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });

})

