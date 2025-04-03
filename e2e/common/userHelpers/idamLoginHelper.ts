import { Cookie, expect, Page } from "@playwright/test";
import { existsSync, readFileSync } from "fs";
import Config from "../../config.ts";
import { setupUser } from "./idamCreateUserApiHelper.ts";
import { UserCredentials, UserLoginInfo } from "../types.ts";

export class IdamLoginHelper {
  private static fields: UserLoginInfo = {
    username: "#username",
    password: "#password",
  };
  private static submitButton = 'input[value="Sign in"]';

  public static async signIn(
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
      if (!page.url().includes("fis-ds-web")) {
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
      }
    }
  }

  public static async signInLongLivedUser(
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

  public static async setupAndSignInUser(
    page: Page,
    application: string,
    userType: string,
    returnUserInfo?: boolean,
  ): Promise<UserCredentials | void> {
    const token = process.env.CREATE_USER_BEARER_TOKEN as string;
    if (!token) return;
    const userInfo = await setupUser(token, userType);
    if (!userInfo) return;
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

  private static isSessionValid(path: string): boolean {
    try {
      const data = JSON.parse(readFileSync(path, "utf-8"));
      const cookie = data.cookies.find((c: Cookie) => c.name === "xui-webapp");
      return (
        cookie &&
        new Date(cookie.expires * 1000).getTime() - Date.now() >
          4 * 60 * 60 * 1000
      );
    } catch {
      return false;
    }
  }
}

export default IdamLoginHelper;
