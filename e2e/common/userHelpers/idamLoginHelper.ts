import { Cookie, Page } from "@playwright/test";
import fs from "fs";
import Config from "../../utils/config.utils.ts";
import { setupUser } from "./idamCreateUserApiHelper.ts";
import { UserCredentialsLong, UserLoginInfo } from "../types.ts";
import { SessionUtils, IdamPage } from "@hmcts/playwright-common";

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
    const sessionFile = `${Config.sessionStoragePath}${userType}.json`;
    if (
      userType !== "citizen" &&
      userType !== "citizen_idam" &&
      SessionUtils.isSessionValid(sessionFile, "xui-webapp")
    ) {
      return;
    } else {
      if (!page.url().includes("idam-web-public.")) {
        await page.goto(application);
      }
      const idamPage = new IdamPage(page);
      await idamPage.login({ username, password, sessionFile });
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

    if (process.env.PWDEBUG) {
      console.log(userType + " email : " + userInfo.email);
    }

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

  private static async addAnalyticsCookie(sessionPath: string): Promise<void> {
    try {
      const domain = (Config.manageCasesBaseURL as string).replace(
        "https://",
        "",
      );
      const state = JSON.parse(fs.readFileSync(sessionPath, "utf-8"));
      const userId = state.cookies.find(
        (cookie: Cookie) => cookie.name === "__userid__",
      )?.value;

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
