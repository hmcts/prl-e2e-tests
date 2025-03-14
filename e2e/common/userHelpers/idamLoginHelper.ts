import { Cookie, expect, Page } from "@playwright/test";
import { existsSync, readFileSync } from "fs";
import Config from "../../config.ts";
import { setupUser } from "./idamCreateCitizenUserApiHelper.ts";
import { UserCredentials, UserLoginInfo } from "../types.ts";

export class IdamLoginHelper {
  private static fields: UserLoginInfo = {
    username: "#username",
    password: "#password",
  };
  private static submitButton: string = 'input[value="Sign in"]';

  public static async signIn(
    page: Page,
    username: string,
    password: string,
    application: string,
    userType: string,
  ): Promise<void> {
    const sessionPath = Config.sessionStoragePath + `${userType}.json`;

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
        .poll(
          async () => {
            return !page.url().includes("idam-web-public.");
          },
          {
            intervals: [1_000],
            timeout: 100_000,
            message: `Unable to sign in as ${userType} user`,
          },
        )
        .toBeTruthy();

      if (userType !== "citizen") {
        await page.context().storageState({ path: sessionPath });
      }
    }
  }

  public static async signInUser(
    page: Page,
    user: keyof typeof Config.userCredentials,
    application: string,
  ): Promise<void> {
    const userCredentials: UserCredentials = Config.getUserCredentials(user);
    if (userCredentials) {
      await this.signIn(
        page,
        userCredentials.email,
        userCredentials.password,
        application,
        user,
      );
    } else {
      console.error("Invalid credential type");
    }
  }

  public static async signInCitizenUser(
    page: Page,
    application: string,
    returnUserInfo: boolean = false,
  ): Promise<{ email: string; password: string } | void> {
    const token = process.env.CITIZEN_CREATE_USER_BEARER_TOKEN as string;
    if (!token) {
      console.error("Bearer token is not defined in the environment variables");
      return;
    }

    const userInfo = await setupUser(token);
    if (!userInfo) {
      console.error("Failed to set up citizen user");
      return;
    }

    await this.signIn(
      page,
      userInfo.email,
      userInfo.password,
      application,
      "citizen",
    );

    if (returnUserInfo) {
      return userInfo;
    }
  }

  private static isSessionValid(path: string): boolean {
    try {
      const data = JSON.parse(readFileSync(path, "utf-8"));
      const cookie = data.cookies.find(
        (cookie: Cookie) => cookie.name === "xui-webapp",
      );
      const expiry = new Date(cookie.expires * 1000);
      // Check there is at least 4 hours left before the session expires
      return expiry.getTime() - Date.now() > 4 * 60 * 60 * 1000;
    } catch (error) {
      throw new Error(`Could not read session data: ${error} for ${path}`);
    }
  }
}

export default IdamLoginHelper;
