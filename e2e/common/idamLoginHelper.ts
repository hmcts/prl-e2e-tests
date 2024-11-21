import { Page } from "@playwright/test";
import Config from "../config.ts";
import { setupUser } from "./idamCreateCitizenUserApiHelper.ts";
import { UserCredentials, UserLoginInfo } from "./types.ts";

export class IdamLoginHelper {
  private static fields: UserLoginInfo = {
    username: "#username",
    password: "#password",
  };
  private static submitButton: string = 'input[value="Sign in"]';

  private static async signIn(
    page: Page,
    username: string,
    password: string,
    application: string,
    userType: string
  ): Promise<void> {
    if (!page.url().includes("idam-web-public.")) {
      await page.goto(application);
    }
    if (page.url().includes("demo")) {
      await page.waitForSelector(`#skiplinktarget:text("Sign in")`);
    } else {
      await page.waitForSelector(`#skiplinktarget:text("Sign in or create an account")`);
    }
    await page.fill(this.fields.username, username);
    await page.fill(this.fields.password, password);
    await page.click(this.submitButton);
    if (userType !== "citizen") {
      await page.context().storageState({ path: Config.sessionStoragePath + `${userType}.json` });
    }
  }

  public static async signInUser(
    page: Page,
    user: keyof typeof Config.userCredentials,
    application: string
  ): Promise<void> {
    const userCredentials: UserCredentials = Config.getUserCredentials(user);
    if (userCredentials) {
      await this.signIn(page, userCredentials.email, userCredentials.password, application, user);
    } else {
      console.error("Invalid credential type");
    }
  }

  public static async signInCitizenUser(
    page: Page,
    application: string
  ): Promise<void> {
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
    await this.signIn(page, userInfo.email, userInfo.password, application, "citizen");
  }
}

export default IdamLoginHelper;
