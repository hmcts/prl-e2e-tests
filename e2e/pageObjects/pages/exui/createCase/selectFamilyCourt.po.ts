import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { solicitorCaseCreateType } from "../../../../common/types.js";
import { CreateCasePage } from "./createCase.po.js";

const FAMILY_COURT: string =
  "Aberystwyth Justice Centre - Trefechan - SY23 1AS";

/** Court selection screen shown while creating an FL401 application. */
export class SelectFamilyCourtPage extends CreateCasePage {
  private readonly courtDropdown: Locator = this.page.locator(
    "#submitCountyCourtSelection",
  );
  private readonly dropdownLabel: string =
    "Select the email address of the family court you want this application to go to";

  constructor(page: Page) {
    super(page);
  }

  /**
   * The "Select the family court" heading renders as an `<h2>` on C100 and as
   * the page `<h1>` on FL401.
   */
  async assertPageContents(caseType: solicitorCaseCreateType): Promise<void> {
    await expect(this.applicationHeading(false)).toBeVisible();
    await this.assertTextContent(
      caseType === "C100" ? Selectors.h2 : Selectors.h1,
      ["Select the family court"],
    );
    await this.assertTextContent(Selectors.GovukFormLabel, [
      this.dropdownLabel,
    ]);
  }

  async selectFamilyCourt(): Promise<void> {
    await this.courtDropdown.selectOption(FAMILY_COURT);
  }
}
