import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import config from "../../../../utils/config.utils.js";
import { CreateCasePage } from "./createCase.po.js";

const JURISDICTION: string = "Family Private Law";
const CASE_TYPE: string = "C100 & FL401 Applications";
const SOLICITOR_EVENT: string = "Solicitor application";
const DUMMY_SOLICITOR_EVENT: string = "TS-Solicitor application";

/** The CCD "Create Case" filter screen: jurisdiction, case type and event. */
export class CaseFilterPage extends CreateCasePage {
  private readonly pageTitle: Locator = this.page.locator(
    `${Selectors.GovukHeadingXL}:text-is("Create Case")`,
  );
  private readonly jurisdictionDropdown: Locator =
    this.page.locator("#cc-jurisdiction");
  private readonly caseTypeDropdown: Locator =
    this.page.locator("#cc-case-type");
  private readonly eventDropdown: Locator = this.page.locator("#cc-event");
  private readonly startButton: Locator = this.page.locator(
    `${Selectors.button}:text-is("Start")`,
  );

  private readonly formLabels: string[] = [
    "Jurisdiction",
    "Case type",
    "Event",
  ];

  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
    await this.page.goto(`${config.manageCasesBaseURLCase}/case-filter`);
  }

  async assertPageContents(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
    await this.assertTextContent(Selectors.GovukFormLabel, this.formLabels);
  }

  async selectSolicitorApplication(
    isDummyCase: boolean = false,
  ): Promise<void> {
    await this.jurisdictionDropdown.selectOption(JURISDICTION);
    await this.caseTypeDropdown.selectOption(CASE_TYPE);
    await this.waitForEventDropdown();
    await this.eventDropdown.selectOption(
      isDummyCase ? DUMMY_SOLICITOR_EVENT : SOLICITOR_EVENT,
    );
  }

  async clickStart(): Promise<void> {
    await this.startButton.click();
  }

  /**
   * The event dropdown intermittently renders with only its placeholder
   * option. Reload rather than fail on an empty list - bug ticket FPVTL-60.
   */
  private async waitForEventDropdown(): Promise<void> {
    const MAX_ATTEMPTS: number = 3;
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      const optionCount: number = await this.eventDropdown
        .locator("option")
        .count();
      if (optionCount > 1) return;
      await this.reloadPage();
      await this.jurisdictionDropdown.selectOption(JURISDICTION);
      await this.caseTypeDropdown.selectOption(CASE_TYPE);
    }
    throw new Error(
      "The create case event dropdown did not load any events - see FPVTL-60.",
    );
  }
}
