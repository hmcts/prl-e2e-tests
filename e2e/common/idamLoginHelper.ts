import Config from "../config.ts";
import { Page } from "@playwright/test";
import { UserCredentials, UserLoginInfo } from "./types.ts";
import { setupUser } from "./idamCreateCitizenUserApiHelper.ts";

export class IdamLoginHelper {
  private static fields: UserLoginInfo = {
    username: "#username",
    password: "#password",
  };

  private static submitButton: string = 'input[value="Sign in"]';

  // private static userInfo: { email: string; password: string } | null = null;

  public static async signInSolicitorUser(
    page: Page,
    user: keyof typeof Config.userCredentials,
    application: string,
  ): Promise<void> {
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
    const userCredentials: UserCredentials = Config.getUserCredentials(user);
    if (userCredentials) {
      await page.fill(this.fields.username, userCredentials.email);
      await page.fill(this.fields.password, userCredentials.password);
      await page.click(this.submitButton);
      await page
        .context()
        .storageState({ path: Config.sessionStoragePath + `${user}.json` });
    } else {
      console.error("Invalid credential type");
    }
  }

  public static async signInCitizenUser(
    page: Page,
    application: string,
  ): Promise<void> {
    const token = process.env.BEARER_TOKEN;
    if (!token) {
      console.error("Bearer token is not defined in the environment variables");
      return;
    }
    const userInfo = await setupUser(token);
    if (!userInfo) {
      console.error("Failed to set up citizen user");
      return;
    }
    if (!page.url().includes("idam-web-public.")) {
      await page.goto(application);
    }
    await page.fill(this.fields.username, userInfo.email);
    await page.fill(this.fields.password, userInfo.password);
    await page.click(this.submitButton);
  }
}

export default IdamLoginHelper;
