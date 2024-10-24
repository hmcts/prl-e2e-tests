import { Page } from "@playwright/test";
import { DummyCreateInitial } from "./dummyCreateInitial";
import { Fl401StatementOfTruth } from "../FL401StatementOfTruth/fl401StatementOfTruth";

interface dummyFL401Options {
  page: Page;
}

export class DummyFL401 {
  public static async dummyFL401({
    page
  }: dummyFL401Options): Promise<void> {
    await DummyCreateInitial.createDummyCase({
      page: page,
      solicitorCaseType: "FL401",
    });
    await Fl401StatementOfTruth.fl401StatementOfTruth(
      {
        page: page,
        accessibilityTest: false,
        errorMessaging: false,
        fl401YesNoToEverything: false,
        subJourney: false,
      },
      true
    );
  }
}
