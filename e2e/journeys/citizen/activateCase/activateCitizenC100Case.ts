import { expect, Locator, Page } from "@playwright/test";
import Config from "../../../utils/config.utils.ts";
import { EnterPinPage } from "../../../pages/citizen/activateCase/enterPinPage.ts";
import { CaseActivatedPage } from "../../../pages/citizen/activateCase/caseActivatedPage.ts";
import { Selectors } from "../../../common/selectors.ts";
import process from "node:process";
import { CreateUserUtil } from "../../../utils/createUser.utils.ts";
import { CitizenC100CaseUtils } from "../../../utils/citizenC100CaseUtils.ts";
import IdamLoginHelper from "../../../utils/idamLoginHelper.utils.ts";
import { AccessCodeHelper } from "../../../utils/accessCode.utils.ts";

type UserInfo = {
  email: string;
  password: string;
};

interface Params {
  page: Page;
  citizenC100CaseUtils: CitizenC100CaseUtils;
  idamLoginHelper: IdamLoginHelper;
  accessCodeHelper: AccessCodeHelper;
  isApplicant: boolean;
}

export class ActivateCitizenC100Case {
  public static async activateCase({
    page,
    citizenC100CaseUtils,
    idamLoginHelper,
    accessCodeHelper,
    isApplicant,
  }: Params): Promise<string> {
    // setup initial case
    const token = process.env.CREATE_USER_BEARER_TOKEN as string;
    const citizenUserInfo: UserInfo = await CreateUserUtil.createUser(
      token,
      "citizen",
    );
    const caseNumber =
      await citizenC100CaseUtils.setupCitizenC100Application(citizenUserInfo);

    //activate case
    await idamLoginHelper.signIn(
      page,
      citizenUserInfo.email,
      citizenUserInfo.password,
      Config.citizenFrontendBaseURL as string,
      "citizen",
    );
    const activateAccessCodeLocator = page.getByRole("link", {
      name: "Activate access code",
    });
    await activateAccessCodeLocator.click();
    let accessCode: string;
    if (isApplicant) {
      accessCode = await accessCodeHelper.getApplicantAccessCode(caseNumber);
    } else {
      accessCode = await accessCodeHelper.getRespondentAccessCode(caseNumber);
    }
    await EnterPinPage.enterPinPage(page, caseNumber, accessCode, false);
    await CaseActivatedPage.caseActivatedPage(page, caseNumber, false);

    // check dashboard is correct
    if (isApplicant) {
      await page
        .locator(Selectors.GovukHeadingXL, {
          hasText: "John Doe",
        })
        .waitFor();

      // check notification banner
      const notificationBanner: Locator = page.locator(
        ".govuk-notification-banner",
      );
      await expect(
        notificationBanner.locator("#govuk-notification-banner-title", {
          hasText: "Important",
        }),
      ).toBeVisible();
      await expect(
        notificationBanner.getByRole("heading", {
          name: "The court has issued your application",
        }),
      ).toBeVisible();
      await expect(
        notificationBanner.getByText(
          "This means the court will provide your application to the other people in the case (the respondents). The respondents will have a chance to reply to what you have said. The case will proceed whether or not they respond.",
        ),
      ).toBeVisible();
      await expect(
        notificationBanner.getByRole("link", {
          name: "View your application pack",
        }),
      ).toBeVisible();
      await expect(
        notificationBanner.getByText(
          "If you’re coming to a court or tribunal for a hearing, bring your hearing letter with your case number – the case number helps you find where you need to go in the building.",
        ),
      ).toBeVisible();
      await expect(
        notificationBanner.getByText(
          "You must bring all the papers you need for your hearing. The court will not give you an electronic device to read your documents, and it will not print your papers for you. Papers will only be printed if a judge gives specific permission, and only when you cannot print them yourself.",
        ),
      ).toBeVisible();
      await expect(
        notificationBanner.getByText(
          "You may bring your own electronic device to court to view case papers during the hearing. The device should have a suitably sized screen, such as a laptop rather than a mobile phone. You must be familiar with the device and ensure it is fully charged. The court cannot guarantee access to power points, and staff cannot assist with your device. Security staff may inspect or temporarily remove any device if required. Recording or filming any part of the hearing without permission is contempt of court, which means you can be fined or sent to prison.",
        ),
      ).toBeVisible();
    } else {
      await page
        .locator(Selectors.GovukHeadingXL, {
          hasText: "Mary Richards",
        })
        .waitFor();

      // check notification banner
      const notificationBanner: Locator = page.locator(
        ".govuk-notification-banner",
      );
      await expect(
        notificationBanner.locator("#govuk-notification-banner-title", {
          hasText: "Important",
        }),
      ).toBeVisible();
      await expect(
        notificationBanner.getByRole("heading", {
          name: "Respond to an application about a child",
        }),
      ).toBeVisible();
      await expect(
        notificationBanner.getByText(
          "Another person (the applicant) has applied to the court to make a decision about a child.",
        ),
      ).toBeVisible();
      await expect(
        notificationBanner.getByText(
          "You should respond within 14 days of receiving the application unless the court has asked you to respond sooner.",
        ),
      ).toBeVisible();
      await expect(
        notificationBanner.getByRole("link", {
          name: "View the application pack",
        }),
      ).toBeVisible();
      await expect(
        notificationBanner.getByRole("link", {
          name: "Respond to the application",
        }),
      ).toBeVisible();
      await expect(
        notificationBanner.getByText(
          "If you’re coming to a court or tribunal for a hearing, bring your hearing letter with your case number – the case number helps you find where you need to go in the building.",
        ),
      ).toBeVisible();
      await expect(
        notificationBanner.getByText(
          "You must bring all the papers you need for your hearing. The court will not give you an electronic device to read your documents, and it will not print your papers for you. Papers will only be printed if a judge gives specific permission, and only when you cannot print them yourself.",
        ),
      ).toBeVisible();
      await expect(
        notificationBanner.getByText(
          "You may bring your own electronic device to court to view case papers during the hearing. The device should have a suitably sized screen, such as a laptop rather than a mobile phone. You must be familiar with the device and ensure it is fully charged. The court cannot guarantee access to power points, and staff cannot assist with your device. Security staff may inspect or temporarily remove any device if required. Recording or filming any part of the hearing without permission is contempt of court, which means you can be fined or sent to prison.",
        ),
      ).toBeVisible();
    }

    return caseNumber;
  }
}
