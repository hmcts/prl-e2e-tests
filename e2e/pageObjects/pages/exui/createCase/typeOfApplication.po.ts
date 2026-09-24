import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { solicitorCaseCreateType } from "../../../../common/types.js";
import { CreateCasePage } from "./createCase.po.js";

/** First screen of the create-case event: which application is being made. */
export class TypeOfApplicationPage extends CreateCasePage {
  private readonly subTitle: Locator = this.page.locator(
    `${Selectors.h2}:text-is("Type of application")`,
  );
  private readonly retentionWarning: Locator = this.page.locator(
    `${Selectors.h3}:text-is("You have 28 days to submit your application from the date you started it, or it will be deleted and you will need to start the application again. This is to keep your information secure.")`,
  );
  private readonly question: Locator = this.page.locator(
    `${Selectors.p}:text-is("Which application are you applying for ?")`,
  );
  private readonly courtNavHint: Locator = this.page.locator(
    `${Selectors.GovukFormHint}:text-is("Questions marked with a * need to be completed before you can create a case")`,
  );

  private readonly caseTypeRadios: Record<solicitorCaseCreateType, Locator> = {
    C100: this.page.locator("#caseTypeOfApplication-C100"),
    FL401: this.page.locator("#caseTypeOfApplication-FL401"),
  };
  private readonly courtNavYesRadio: Locator = this.page.locator(
    "#caseFromCourtNav_Yes",
  );

  private readonly caseTypeLabels: string[] = [
    "C100 Child Arrangements Application",
    "FL401 Non-Molestation &/or Occupation Order Application",
  ];
  private readonly courtNavLabel: string =
    "*Did you receive the case from CourtNav?";

  /** Shown when nothing at all has been selected. */
  readonly fieldRequiredError: string = "Field is required";
  /** Shown when FL401 is selected but the CourtNav question is unanswered. */
  readonly courtNavRequiredError: string =
    "*Did you receive the case from CourtNav? is required";

  constructor(page: Page) {
    super(page);
  }

  async assertPageContents(isDummyCase: boolean = false): Promise<void> {
    await expect(this.subTitle).toBeVisible();
    await expect(this.applicationHeading(isDummyCase)).toBeVisible();
    await expect(this.question).toBeVisible();
    if (!isDummyCase) {
      await expect(this.retentionWarning).toBeVisible();
    }
    await this.assertTextContent(Selectors.GovukFormLabel, this.caseTypeLabels);
  }

  /** The CourtNav question only appears once FL401 has been selected. */
  async assertCourtNavQuestion(): Promise<void> {
    await this.assertTextContent(Selectors.GovukFormLabel, [
      this.courtNavLabel,
    ]);
    await expect(this.courtNavHint).toBeVisible();
  }

  async selectCaseType(caseType: solicitorCaseCreateType): Promise<void> {
    await this.caseTypeRadios[caseType].click();
  }

  async selectReceivedFromCourtNav(): Promise<void> {
    await this.courtNavYesRadio.click();
  }
}
