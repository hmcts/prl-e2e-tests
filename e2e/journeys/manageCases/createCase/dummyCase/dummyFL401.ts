import { Page } from "@playwright/test";
import { DummyCreateInitial } from "./dummyCreateInitial.ts";
import { Fl401StatementOfTruth } from "../FL401StatementOfTruth/fl401StatementOfTruth.ts";
import { DummyFL401ApplicantDetails } from "./dummyFL401ApplicantDetails.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { Selectors } from "../../../../common/selectors.ts";

interface dummyFL401Options {
  page: Page;
  applicantLivesInRefuge: boolean;
}

export class DummyFL401 {
  public static async dummyFL401({
    page,
    applicantLivesInRefuge,
  }: dummyFL401Options): Promise<string> {
    await DummyCreateInitial.createDummyCase({
      page: page,
      solicitorCaseType: "FL401",
    });
    await DummyFL401ApplicantDetails.dummyFL401ApplicantDetails(
      page,
      applicantLivesInRefuge,
    );
    await Fl401StatementOfTruth.fl401StatementOfTruth({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      fl401YesNoToEverything: false,
      subJourney: false,
    });

    // wait for statement of truth event to complete before performing next actions
    await page
      .locator(Selectors.alertMessage, {
        hasText: "Statement of Truth and submit",
      })
      .waitFor();

    return await Helpers.getCaseNumberFromUrl(page);
  }
}
