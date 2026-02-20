import { Browser, expect, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { CreateBundleSubmitPage } from "../../../../pages/manageCases/caseProgression/createBundle/createBundleSubmitPage";
import { CreateBundle1Page } from "../../../../pages/manageCases/caseProgression/createBundle/createBundle1Page";
import { jsonDatas } from "../../../../common/caseHelpers/jsonDatas";
import {
  c100CompleteEventsUpToServiceOfApplication,
  fl401CompleteEventsUpToServiceOfApplication,
} from "../../../../common/caseHelpers/caseEventsHelper";
import {
  applicationSubmittedBy,
  createOrderFL401Options,
} from "../../../../common/types";
import { Selectors } from "../../../../common/selectors.js";

interface ServiceOfApplicationJourneyParams {
  page: Page;
  accessibilityTest: boolean;
  ccdRef: string;
  browser: Browser;
  manageOrderData: typeof jsonDatas;
  createOrderFL401Options: createOrderFL401Options;
  applicationSubmittedBy: applicationSubmittedBy;
}

interface C100ServiceOfApplicationJourneyParams {
  page: Page;
  accessibilityTest: boolean;
  ccdRef: string;
  browser: Browser;
  manageOrderData: typeof jsonDatas;
  applicationSubmittedBy: applicationSubmittedBy;
}

const bundleContents: string[] = [
  "Bundle Details",
  "Bundle Creation Date and Time",
  "Case Bundles",
  "Case Bundles 1",
  "Stitch status",
  "DONE",
  "Stitched document",
  "Bundle ID",
];

export class CreateABundleJourney {
  public static async FL401CreateABundleJourney({
    page,
    accessibilityTest,
    ccdRef,
    browser,
    manageOrderData,
    createOrderFL401Options,
    applicationSubmittedBy,
  }: ServiceOfApplicationJourneyParams): Promise<void> {
    await fl401CompleteEventsUpToServiceOfApplication(
      page,
      browser,
      ccdRef,
      manageOrderData,
      createOrderFL401Options,
      applicationSubmittedBy,
    );
    await page.reload();
    await Helpers.chooseEventFromDropdown(page, "Create a bundle");
    await CreateBundle1Page.createBundle1Page({
      page,
      accessibilityTest,
    });
    await CreateBundleSubmitPage.createBundleSubmitPage({
      page,
      accessibilityTest,
    });
    await this.checkBundleTab(page);
  }

  public static async C100CreateABundleJourney({
    page,
    accessibilityTest,
    browser,
    ccdRef,
    manageOrderData,
    applicationSubmittedBy,
  }: C100ServiceOfApplicationJourneyParams): Promise<void> {
    await c100CompleteEventsUpToServiceOfApplication(
      page,
      ccdRef,
      browser,
      manageOrderData,
      applicationSubmittedBy,
    );
    await page.reload();
    await Helpers.chooseEventFromDropdown(page, "Create a bundle");
    await CreateBundle1Page.createBundle1Page({
      page,
      accessibilityTest,
    });
    await CreateBundleSubmitPage.createBundleSubmitPage({
      page,
      accessibilityTest,
    });
    await this.checkBundleTab(page);
  }

  private static async checkBundleTab(page: Page): Promise<void> {
    await page
      .locator(Selectors.tab, {
        hasText: "Bundles",
      })
      .click();
    await expect
      .poll(
        async () => {
          const bundleGenerated = await page.getByText("DONE").isVisible();
          if (!bundleGenerated) {
            await page.reload();
          }
          return bundleGenerated;
        },
        {
          // Allow 5s delay before retrying
          intervals: [5_000],
          // Allow up to a minute
          timeout: 60_000,
        },
      )
      .toBeTruthy();
    for (const bundleString of bundleContents) {
      await expect(page.getByText(bundleString, { exact: true })).toBeVisible();
    }
  }
}
