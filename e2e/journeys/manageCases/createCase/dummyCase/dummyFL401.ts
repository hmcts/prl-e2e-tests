import { Page } from "@playwright/test";
import { DummyCreateInitial } from "./dummyCreateInitial";
import { Fl401StatementOfTruth } from "../FL401StatementOfTruth/fl401StatementOfTruth";
import { Selectors } from "../../../../common/selectors";
import { StatementOfTruthSummaryContent } from "../../../../fixtures/manageCases/createCase/FL401/statementOfTruth/statementOfTruthSummaryContent";

interface dummyFL401Options {
  page: Page;
}

export class DummyFL401 {
  public static async dummyFL401({ page }: dummyFL401Options): Promise<void> {
    await DummyCreateInitial.createDummyCase({
      page: page,
      solicitorCaseType: "FL401",
    });
    const accessibilityTest: boolean = false;
    const errorMessaging: boolean = false;
    const fl401YesNoToEverything: boolean = false;
    const subJourney: boolean = false;
    const isDummyCase: boolean = true;
    Fl401StatementOfTruth.fl401StatementOfTruth({
      page,
      accessibilityTest,
      errorMessaging,
      fl401YesNoToEverything,
      subJourney,
      isDummyCase,
    });
    await page.waitForSelector(
      `${Selectors.h1}:text-is("${StatementOfTruthSummaryContent.h1}")`,
    );
  }
}
