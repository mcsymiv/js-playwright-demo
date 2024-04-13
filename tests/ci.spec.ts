import { test } from '@playwright/test';

test.describe('ci test', async () => {

  test('env process test', async () => {
    console.log(process.env.userName);
    console.log(process.env.userEmail);
  });

})

