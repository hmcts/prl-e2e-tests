import { Page } from "@playwright/test";
import { DummyCreateInitial } from "./dummyCreateInitial";
import { Fl401StatementOfTruth } from "../FL401StatementOfTruth/fl401StatementOfTruth";
import { DummyFL401ApplicantDetails } from "./dummyFL401ApplicantDetails";
import { Helpers } from "../../../../common/helpers.ts";

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
    await Fl401StatementOfTruth.fl401StatementOfTruth(
      {
        page: page,
        accessibilityTest: false,
        errorMessaging: false,
        fl401YesNoToEverything: false,
        subJourney: false,
      },
      true,
    );

    const caseRef: string = await Helpers.getCaseNumberFromUrl(page);
    // wait for statement of truth event to complete before performing next actions
    await page.waitForResponse(
      (response) =>
        response.url() ===
          `https://manage-case.aat.platform.hmcts.net/data/cases/${caseRef}/events` &&
        response.status() === 201,
    );

    return caseRef;
  }
}
