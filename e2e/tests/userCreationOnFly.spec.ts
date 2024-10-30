import { test } from '@playwright/test';
import { setupUser } from '../common/apiHelper/createUser'; // Update path as needed

test.describe('smoke test', () => {
  let userEmail: string;
  let userPassword: string;
  let userId: string;

  test.beforeEach(async ({}, testInfo) => {
    try {
      const userInfo = await setupUser();
      if (userInfo) {
        userEmail = userInfo.email;
        userPassword = userInfo.password;
        userId = userInfo.id;
      }
    } catch (error) {
      console.error('Setup failed:', error);
      // Optional: You can use `testInfo.skip` to skip the test if setup fails
      testInfo.skip('User setup failed. Skipping tests.');
    }
  });

  // Example test case
  test('should use created user credentials', async () => {
    // You can now use userEmail, userPassword, and userId here
    console.log('User Email:', userEmail);
    console.log('User Password:', userPassword);
    console.log('User ID:', userId);

    // Example assertion (you can replace this with actual tests)
    test.expect(userEmail).toContain('@test.local');
  });
});
