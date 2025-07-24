import { APIRequestContext, request } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";
import process from "node:process";

export class CreateUserUtil {
  private static async createApiContext(): Promise<APIRequestContext> {
    return await request.newContext();
  }

  /**
   * Creates a user in IDAM. If a 409 Conflict occurs, it attempts to update the existing user.
   * This is now a STATIC method, callable directly on the class.
   * @param token Bearer token for authentication.
   * @param userType The type of user to create (e.g., "citizen", "solicitor", "judge").
   * @returns A promise that resolves to the created or updated user's details.
   */
  public static async createUser(
    token: string,
    userType: string,
  ): Promise<{
    email: string;
    password: string;
    user: string;
    forename: string;
    surname: string;
  }> {
    const idamUrl = process.env.IDAM_TESTING_SUPPORT_USERS_URL!;
    if (!idamUrl) {
      throw new Error(
        "Environment variable IDAM_TESTING_SUPPORT_USERS_URL is not set.",
      );
    }

    let password: string;
    let email: string;
    let roleNames: string[] = [];
    const uniqueId = uuidv4();
    let forename: string;
    let surname: string;

    switch (userType) {
      case "citizen":
        password = process.env.IDAM_CITIZEN_USER_PASSWORD!;
        email = `TEST_PRL_USER_citizen.${uniqueId}@test.local`;
        forename = "fn_" + uniqueId.split("-")[0];
        surname = "sn_" + uniqueId.split("-")[1];
        roleNames = ["citizen"];
        break;
      case "solicitor":
        password = process.env.SOLICITOR_PASSWORD!;
        email = `TEST_PRL_USER_solicitor.${uniqueId}@test.local`;
        forename = "fn_" + uniqueId.split("-")[0];
        surname = "sn_" + uniqueId.split("-")[1];
        roleNames = [
          "pui-user-manager",
          "caseworker-privatelaw",
          "pui-caa",
          "payments",
          "caseworker-privatelaw-solicitor",
          "pui-organisation-manager",
          "pui-case-manager",
          "caseworker",
        ];
        break;
      case "judge":
        password = process.env.JUDGE_PASSWORD!;
        email = process.env.JUDGE_USERNAME!;
        roleNames = [
          "caseworker-privatelaw",
          "caseworker-privatelaw-judge",
          "judge",
          "caseworker",
          "judiciary",
        ];
        forename = "Yolanda";
        surname = "Cooper";
        break;
      case "caseWorker":
        password = process.env.CASEWORKER_PASSWORD!;
        email = `TEST_PRL_USER_court_admin.${uniqueId}@test.local`;
        roleNames = [
          "caseworker-privatelaw",
          "cwd-user",
          "staff-admin",
          "caseworker",
          "caseworker-privatelaw-courtadmin",
        ];
        forename = "PRL AAT AM";
        surname = "Swansea HCTL";
        break;
      case "caseManager":
        password = process.env.CASEMANAGER_PASSWORD!;
        email = `TEST_PRL_USER_case_manager.${uniqueId}@test.local`;
        roleNames = [
          "caseworker-privatelaw",
          "cwd-user",
          "caseworker",
          "caseworker-privatelaw-courtadmin",
        ];
        forename = "PRL Case Manager";
        surname = "CTSC Team Leader";
        break;
      default:
        throw new Error(`Unknown user type: ${userType}`);
    }

    const id = uniqueId;
    const apiContext = await CreateUserUtil.createApiContext();
    const response = await apiContext.post(idamUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        password,
        user: {
          id,
          email,
          forename,
          surname,
          roleNames,
        },
      },
    });

    if (response.status() === 201) {
      return { email, password, user: userType, forename, surname };
    }
    if (response.status() === 409) {
      console.log(`User ${email} already exists. Attempting to update.`);
      return CreateUserUtil.updateUser(
        apiContext,
        token,
        idamUrl,
        email,
        forename,
        surname,
        password,
        roleNames,
        userType,
      );
    }
    throw new Error(
      `IDAM user creation failed: ${await response.text()} (Status Code: ${response.status()})`,
    );
  }

  /**
   * Updates an existing user in IDAM. This is now a STATIC method.
   * It receives the API context and idamUrl from the calling static method.
   * @param apiContext The API request context to use.
   * @param token Bearer token for authentication.
   * @param idamUrl The IDAM base URL.
   * @param email The email of the user to update.
   * @param forename The forename of the user.
   * @param surname The surname of the user.
   * @param password The password for the user.
   * @param roleNames An array of role names to assign to the user.
   * @param userType The original user type (e.g., "citizen", "solicitor").
   * @returns A promise that resolves to the updated user's details.
   * @private
   */
  private static async updateUser(
    apiContext: APIRequestContext,
    token: string,
    idamUrl: string,
    email: string,
    forename: string,
    surname: string,
    password: string,
    roleNames: string[],
    userType: string,
  ): Promise<{
    email: string;
    password: string;
    user: string;
    forename: string;
    surname: string;
  }> {
    const responseGetId = await apiContext.get(
      `${idamUrl}?email=${encodeURIComponent(email)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!responseGetId.ok()) {
      throw new Error(
        `Failed to fetch user details for update: ${responseGetId.status()} - ${await responseGetId.text()}`,
      );
    }
    const responseGetIdBody = await responseGetId.json();
    const userId = responseGetIdBody.id;

    const response = await apiContext.put(`${idamUrl}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        password,
        user: {
          email,
          forename,
          surname,
          displayName: `${forename} ${surname}`,
          roleNames,
          accountStatus: "ACTIVE",
          recordType: "LIVE",
        },
      },
    });

    if (response.status() === 200 || response.status() === 409) {
      console.log(`User ${email} successfully updated.`);
      return { email, password, user: userType, forename, surname };
    }

    throw new Error(
      `Failed to update user: ${await response.text()} (Status Code: ${response.status()})`,
    );
  }
}
