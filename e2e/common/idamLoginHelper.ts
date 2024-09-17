import Config from "../config.ts";
import { Page } from "@playwright/test";
import { UserCredentials, UserLoginInfo } from "./types.ts";

export class IdamLoginHelper {
  private static fields: UserLoginInfo = {
    username: "#username",
    password: "#password",
  };
  private static submitButton: string = 'input[value="Sign in"]';

  public static async signInUser(
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
}

export default IdamLoginHelper;
