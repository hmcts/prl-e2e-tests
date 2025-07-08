import { getAccessToken } from "../caseHelpers/getAccessTokenHelper.js";
import { APIRequestContext, request } from "@playwright/test";

export class UserUtils {
  public static async getUserId(email: string): Promise<string> {
    const apiContext: APIRequestContext = await request.newContext();
    const bearerToken: string = await getAccessToken("accessCode", apiContext);
    const url = `${process.env.IDAM_TESTING_SUPPORT_USERS_URL}?email=${email}`;
    try {
      const response = await apiContext.get(url, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok()) {
        const responseBody = await response.json();
        if (responseBody) {
          return responseBody.id;
        } else {
          throw new Error("Failed to get event token");
        }
      }
    } catch (e) {
      throw new Error(`An error occurred while fetching user ID: ${e.message}`);
    }
  }
}
