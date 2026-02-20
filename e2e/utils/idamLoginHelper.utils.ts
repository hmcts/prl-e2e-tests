import { Cookie, expect, Page } from "@playwright/test";
import fs, { existsSync, readFileSync } from "fs";
import Config from "./config.utils";
import { CreateUserUtil } from "./createUser.utils";
import { UserCredentialsLong, UserLoginInfo } from "../common/types";
import process from "node:process";
import { IdamUtils } from "@hmcts/playwright-common";
import { UserInfoParams } from "@hmcts/playwright-common/dist/utils/idam.utils.js";

export class IdamLoginHelper {
  private fields: UserLoginInfo = {
    username: "#username",
    password: "#password",
  };
  private submitButton = 'input[value="Sign in"]';

  /**
   * Signs a user into the application. It attempts to reuse an existing session if valid.
   * @param page Playwright Page object.
   * @param username The user's email/username.
   * @param password The user's password.
   * @param application The URL of the application to sign into.
   * @param userType The type of user (e.g., "citizen", "solicitor").
   */
  public async signIn(
    page: Page,
    username: string,
    password: string,
    application: string,
    userType: string,
  ): Promise<void> {
    const sessionPath = `${Config.sessionStoragePath}${userType}.json`;
    if (
      userType !== "citizen" &&
      existsSync(sessionPath) &&
      this.isSessionValid(sessionPath)
    ) {
      return;
    } else {
      if (!page.url().includes("idam-web-public.")) {
        await page.goto(application);
      }
      if (page.url().includes("demo")) {
        await page.waitForSelector(`#skiplinktarget:text("Sign in")`);
      } else {
        await page.waitForSelector(
          `#skiplinktarget:text("Sign in or create an account")`,
        );
      }
      await page.fill(this.fields.username, username);
      await page.fill(this.fields.password, password);
      await page.click(this.submitButton);

      await expect
        .poll(() => !page.url().includes("idam-web-public."), {
          intervals: [1_000],
          timeout: 100_000,
          message: `Unable to sign in as ${userType} user`,
        })
        .toBeTruthy();

      if (userType !== "citizen") {
        await page.context().storageState({ path: sessionPath });
        await this.addAnalyticsCookie(sessionPath, username);
      }
    }
  }

  /**
   * Signs in a long-lived user based on predefined credentials in Config.
   * @param page Playwright Page object.
   * @param user Key of the user credentials in Config.
   * @param application The URL of the application.
   */
  public async signInLongLivedUser(
    page: Page,
    user: keyof typeof Config.userCredentials,
    application: string,
  ): Promise<void> {
    const userCredentials = Config.getUserCredentials(user);
    if (!userCredentials) return;

    await this.signIn(
      page,
      userCredentials.email,
      userCredentials.password,
      application,
      user,
    );
  }

  /**
   * Sets up a new user via API and then signs them into the application.
   * @param page Playwright Page object.
   * @param application The URL of the application.
   * @param userType The type of user to create and sign in.
   * @param returnUserInfo Optional. If true, returns the created user's credentials.
   * @returns The user's credentials if `returnUserInfo` is true, otherwise void.
   */
  public async setupAndSignInUser(
    page: Page,
    application: string,
    userType: string,
    returnUserInfo?: boolean,
  ): Promise<UserCredentialsLong | void> {
    const token = process.env.CREATE_USER_BEARER_TOKEN as string;
    if (!token) return;
    // Directly call the static createUser method from CreateUserUtil
    const userInfo = await CreateUserUtil.createUser(token, userType);
    await this.signIn(
      page,
      userInfo.email,
      userInfo.password,
      application,
      userType,
    );
    if (returnUserInfo)
      return {
        forename: userInfo.forename,
        surname: userInfo.surname,
        email: userInfo.email,
        password: userInfo.password,
      };
  }

  /**
   * Checks if a session file is valid (i.e., the 'xui-webapp' cookie has at least 4 hours left).
   * @param path The path to the session storage JSON file.
   * @returns True if the session is valid, false otherwise.
   * @private
   */
  private isSessionValid(path: string): boolean {
    try {
      const data = JSON.parse(readFileSync(path, "utf-8"));
      const cookie = data.cookies.find(
        (cookie: Cookie) => cookie.name === "xui-webapp",
      );
      if (!cookie) return false; // No session cookie found
      const expiry = new Date(cookie.expires * 1000);
      // Check there is at least 4 hours left before the session expires
      return expiry.getTime() - Date.now() > 4 * 60 * 60 * 1000;
    } catch (error) {
      console.error(
        `Error reading or parsing session data for ${path}:`,
        error,
      );
      return false; // Treat any error as an invalid session
    }
  }

  /**
   * Adds a specific analytics cookie to the session storage file.
   * @param sessionPath The path to the session storage JSON file.
   * @param username The username for which to add the cookie.
   * @private
   */
  private async addAnalyticsCookie(
    sessionPath: string,
    username: string,
  ): Promise<void> {
    try {
      const domain = (Config.manageCasesBaseURL as string).replace(
        "https://",
        "",
      );
      const state = JSON.parse(fs.readFileSync(sessionPath, "utf-8"));
      let userId: string;
      if (process.env.MANAGE_CASES_TEST_ENV === "preview") {
        const token = process.env.CREATE_USER_BEARER_TOKEN as string;
        const idamUtils = new IdamUtils(); // Instantiate IdamUtils
        const userDetails: UserInfoParams = await idamUtils.getUserInfo({
          email: username,
          bearerToken: token,
        });
        userId = userDetails.id;
      } else {
        userId = state.cookies.find(
          (cookie: Cookie) => cookie.name === "__userid__",
        )?.value;
      }

      // Prevent adding duplicate cookies if it already exists
      const cookieName = `hmcts-exui-cookies-${userId}-mc-accepted`;
      if (!state.cookies.some((cookie: Cookie) => cookie.name === cookieName)) {
        state.cookies.push({
          name: cookieName,
          value: "true",
          domain: `${domain}`,
          path: "/",
          expires: -1, // -1 typically means session cookie or never expires
          httpOnly: false,
          secure: false,
          sameSite: "Lax",
        });
        fs.writeFileSync(sessionPath, JSON.stringify(state, null, 2));
      }
    } catch (error) {
      throw new Error(`Failed to read or write session data: ${error}`);
    }
  }
}

export default IdamLoginHelper;
