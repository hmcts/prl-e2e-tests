import { Cookie, expect, Page } from "@playwright/test";
import fs, { existsSync, readFileSync } from "fs";
import Config from "../../utils/config.utils.ts";
import { setupUser } from "./idamCreateUserApiHelper.ts";
import { UserCredentialsLong, UserLoginInfo } from "../types.ts";
import process from "node:process";
import { IdamUtils } from "@hmcts/playwright-common";
import { UserInfoParams } from "@hmcts/playwright-common/dist/utils/idam.utils.js";

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
  ): Promise<UserCredentialsLong | void> {
    const token = process.env.CREATE_USER_BEARER_TOKEN as string;
    if (!token) return;
    const userInfo = await setupUser(token, userType);
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

  private static async addAnalyticsCookie(
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
        // when using preview environment the __userid__ cookie is undefined so need to fetch user ID a different way
        const token = process.env.CREATE_USER_BEARER_TOKEN as string;
        const userDetails: UserInfoParams = await new IdamUtils().getUserInfo({
          email: username,
          bearerToken: token,
        });
        userId = userDetails.id;
      } else {
        userId = state.cookies.find(
          (cookie: Cookie) => cookie.name === "__userid__",
        )?.value;
      }
      state.cookies.push({
        name: `hmcts-exui-cookies-${userId}-mc-accepted`,
        value: "true",
        domain: `${domain}`,
        path: "/",
        expires: -1,
        httpOnly: false,
        secure: false,
        sameSite: "Lax",
      });
      fs.writeFileSync(sessionPath, JSON.stringify(state, null, 2));
    } catch (error) {
      throw new Error(`Failed to read or write session data: ${error}`);
    }
  }
}

export default IdamLoginHelper;
