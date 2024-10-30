import {
  initializeAPIContext,
  getAccessToken,
  createCitizenUser,
} from "./idamApiHelper";

/**
 * Sets up a user by getting an access token and creating a citizen user.
 * @returns {Promise<{ email: string; password: string; id: string }>} User information if successful
 * @throws Will throw an error if any step fails
 */
export async function setupUser(): Promise<{
  email: string;
  password: string;
  id: string;
}> {
  // Initialize API context
  const apiContext = await initializeAPIContext();
  // Get access token
  const token = await getAccessToken(apiContext);
  if (!token) {
    throw new Error("Failed to get access token");
  }
  // Create and return citizen user directly
  return await createCitizenUser(apiContext, token);
}
