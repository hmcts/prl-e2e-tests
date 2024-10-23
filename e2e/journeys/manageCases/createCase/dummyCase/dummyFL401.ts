import { Page } from "@playwright/test";
import { DummyCreateInitial } from "./dummyCreateInitial";
import { Fl401StatementOfTruth } from "../FL401StatementOfTruth/fl401StatementOfTruth";
import { solicitorCaseCreateType } from "../../../../common/types";

interface dummyFL401Options {
  page: Page;
  caseType: solicitorCaseCreateType;
}

export class DummyFL401 {
  public static async dummyFL401({ page, caseType }: dummyFL401Options): Promise<void> {
    await DummyCreateInitial.createDummyCase({
      page: page,
      solicitorCaseType: caseType,
    });
    await Fl401StatementOfTruth.fl401StatementOfTruth({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      fl401YesNoToEverything: false,
      subJourney: false,
    }, true);
  }
}
