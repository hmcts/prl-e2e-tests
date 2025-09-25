import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class AllocatedJudge1Page extends EventPage {
  readonly heading2: Locator = this.page.locator(Selectors.h2, {
    hasText: "Allocated judge",
  });
  readonly p: Locator = this.page.locator(Selectors.p, {
    hasText: "You can update this at any point in the case",
  });
  readonly actionFormLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Do you want to allocate a specific judge or legal adviser?",
    },
  );
  readonly isJudgeOrLegalAdviserFormLabels: string[] = [
    "Please select judge or legal adviser",
    "Judge",
    "Legal adviser",
  ];
  readonly nameOfJudgeLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Name of judge",
    },
  );
  readonly nameOfLegalAdviserLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Name of legal adviser",
    },
  );
  readonly tierOfJudiciaryLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Select the tier of judiciary",
    },
  );
  readonly judiciaryTierFormLabels: string[] = [
    "Magistrates",
    "District Judge",
    "Circuit Judge",
    "High Court Judge",
  ];
  readonly formLabelYes: Locator = this.page.locator(Selectors.GovukFormLabel, {
    hasText: CommonStaticText.yes,
  });
  readonly formLabelNo: Locator = this.page.locator(Selectors.GovukFormLabel, {
    hasText: CommonStaticText.no,
  });
  readonly radioYes: Locator = this.page.locator(
    "#isSpecificJudgeOrLegalAdviserNeeded_Yes",
  );
  readonly radioNo: Locator = this.page.locator(
    "#isSpecificJudgeOrLegalAdviserNeeded_No",
  );
  readonly judgeRadio: Locator = this.page.locator(
    "#isJudgeOrLegalAdviser-judge",
  );
  readonly legalAdviserRadio: Locator = this.page.locator(
    "#isJudgeOrLegalAdviser-legalAdviser",
  );
  readonly judgeNameInput: Locator = this.page.locator("#judgeNameAndEmail");
  readonly legalAdviserDropdown: Locator =
    this.page.locator("#legalAdviserList");
  readonly judgeNameDropdownOption: Locator = this.page.locator(
    ".mat-option-text",
    { hasText: "Ms Elizabeth Williams" },
  );
  readonly magistratesJudgeRadio: Locator = this.page.locator(
    "#tierOfJudiciary-magistrates",
  );
  readonly districtJudgeRadio: Locator = this.page.locator(
    "#tierOfJudiciary-districtJudge",
  );
  readonly circuitJudgeRadio: Locator = this.page.locator(
    "#tierOfJudiciary-circuitJudge",
  );
  readonly highCourtJudgeRadio: Locator = this.page.locator(
    "#tierOfJudiciary-highCourtJudge",
  );
  readonly continueButton: Locator = this.page.locator(Selectors.button, {
    hasText: CommonStaticText.continue,
  });
  readonly previousButton: Locator = this.page.locator(Selectors.button, {
    hasText: CommonStaticText.previous,
  });

  constructor(page: Page) {
    super(page, "Allocated judge");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.heading2).toBeVisible();
    await expect(this.p).toBeVisible();
    await expect(this.actionFormLabel).toBeVisible();
    await expect(this.formLabelYes).toBeVisible();
    await expect(this.formLabelNo).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectIsJudgeOrLegalAdviser(
    isSpecificJudgeOrLegalAdviser: boolean,
  ): Promise<void> {
    if (isSpecificJudgeOrLegalAdviser) {
      await this.radioYes.click();
      await this.checkStrings(
        Selectors.GovukFormLabel,
        this.isJudgeOrLegalAdviserFormLabels,
      );
    } else {
      await this.radioNo.click();
      await expect(this.tierOfJudiciaryLabel).toBeVisible();
      await this.checkStrings(
        Selectors.GovukFormLabel,
        this.judiciaryTierFormLabels,
      );
    }
  }

  async selectJudgeOrLegalAdviser(
    isJudge: boolean,
    judgeOrLegalAdviserName: string,
  ): Promise<void> {
    if (isJudge) {
      await this.judgeRadio.click();
      await expect(this.nameOfJudgeLabel).toBeVisible();
      await this.judgeNameInput.fill(judgeOrLegalAdviserName);
      // Wait for the judge option in the dropdown to become visible using dynamic content
      await expect(this.judgeNameDropdownOption).toBeVisible();
      // Click the option containing the judge name (dynamic value)
      await this.judgeNameDropdownOption.click();
    } else {
      await this.legalAdviserRadio.click();
      await expect(this.nameOfLegalAdviserLabel).toBeVisible();
      await this.legalAdviserDropdown.selectOption(judgeOrLegalAdviserName);
    }
  }

  async selectJudiciaryTier(judiciaryTier: string): Promise<void> {
    switch (judiciaryTier) {
      case "Magistrates":
        await this.magistratesJudgeRadio.click();
        break;
      case "District Judge":
        await this.districtJudgeRadio.click();
        break;
      case "Circuit Judge":
        await this.circuitJudgeRadio.click();
        break;
      case "High Court Judge":
        await this.highCourtJudgeRadio.click();
        break;
    }
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}
