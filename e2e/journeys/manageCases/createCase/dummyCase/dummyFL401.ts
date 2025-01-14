import { Page } from "@playwright/test";
import { DummyCreateInitial } from "./dummyCreateInitial";
import { Fl401StatementOfTruth } from "../FL401StatementOfTruth/fl401StatementOfTruth";
import { DummyFL401ApplicantDetails } from "./dummyFL401ApplicantDetails";

interface dummyFL401Options {
  page: Page,
  applicantLivesInRefuge: boolean,
}

export class DummyFL401 {
  public static async dummyFL401({ 
    page,
    applicantLivesInRefuge,
  }: dummyFL401Options): Promise<void> {
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
  }
}
