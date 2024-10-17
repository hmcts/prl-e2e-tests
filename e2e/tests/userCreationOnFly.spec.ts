import axios, { AxiosRequestConfig } from 'axios';
import { test } from '@playwright/test';
import { setupUser, teardownUser } from '../common/apiHelper/createDeleteUser';

test.describe('smoke test', () => {
  let userEmail: string;
  let userPassword: string;
  let userId: string;

  test.beforeEach(async () => {
    const userInfo = await setupUser();
    if (userInfo) {
      userEmail = userInfo.email;
      userPassword = userInfo.password;
      userId = userInfo.id;
    }
  });

  // test.afterEach(async () => {
  //   if (userId) {
  //     await teardownUser(userId);
  //   }
  // });

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
