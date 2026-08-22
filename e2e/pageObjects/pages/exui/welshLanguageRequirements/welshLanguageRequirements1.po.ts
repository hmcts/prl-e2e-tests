import { expect, Locator, Page } from "@playwright/test";
import { EventPage } from "../eventPage.po.js";
import { Selectors } from "../../../../common/selectors.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";
import { Language } from "../../../../common/types.js";

/** The answers that drive the Welsh language requirements event. */
export interface WelshLanguageRequirementsOptions {
  needDocumentsInWelsh: boolean;
  languageToCompleteApplication: Language;
  doesApplicationNeedTranslating: boolean;
}

type YesNo = "Yes" | "No";

interface RadioQuestion<Option extends string> {
  readonly label: string;
  readonly options: Readonly<Record<Option, string>>;
}

const NEEDS_WELSH: RadioQuestion<YesNo> = {
  label:
    "Does any person in this case want orders or documents in Welsh? (Optional)",
  options: {
    Yes: "#welshLanguageRequirement_Yes",
    No: "#welshLanguageRequirement_No",
  },
};

const LANGUAGE: RadioQuestion<Language> = {
  label:
    "*Which language are you using to complete this application? (Optional)",
  options: {
    English: "#welshLanguageRequirementApplication-english",
    Welsh: "#welshLanguageRequirementApplication-welsh",
  },
};

const TRANSLATE_INTO_WELSH: RadioQuestion<YesNo> = {
  label: "*Does this application need to be translated into Welsh? (Optional)",
  options: {
    Yes: "#languageRequirementApplicationNeedWelsh_Yes",
    No: "#languageRequirementApplicationNeedWelsh_No",
  },
};

const TRANSLATE_INTO_ENGLISH: RadioQuestion<YesNo> = {
  label:
    "*Does this application need to be translated into English? (Optional)",
  options: {
    Yes: "#welshLanguageRequirementApplicationNeedEnglish_Yes",
    No: "#welshLanguageRequirementApplicationNeedEnglish_No",
  },
};

export class WelshLanguageRequirements1Page extends EventPage {
  private readonly needsWelshLabel: Locator = this.page.locator(
    `${Selectors.GovukFormLabel}:text-is("${NEEDS_WELSH.label}")`,
  );
  private readonly needsWelshYesLabel: Locator = this.page.locator(
    `#welshLanguageRequirement_radio ${Selectors.GovukFormLabel}:text-is("${CommonStaticText.yes}")`,
  );
  private readonly needsWelshNoLabel: Locator = this.page.locator(
    `#welshLanguageRequirement_radio ${Selectors.GovukFormLabel}:text-is("${CommonStaticText.no}")`,
  );

  constructor(page: Page) {
    super(page, "Welsh language requirements");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await Promise.all([
      expect.soft(this.needsWelshLabel).toBeVisible(),
      expect.soft(this.needsWelshYesLabel).toBeVisible(),
      expect.soft(this.needsWelshNoLabel).toBeVisible(),
      expect.soft(this.previousButton).toBeVisible(),
      expect.soft(this.continueButton).toBeVisible(),
    ]);
  }

  /**
   * Answers the event's conditional radio chain. Each answer reveals the next
   * question, and CCD keeps a question that has not been reached in the DOM but
   * hidden, so waiting for its label to become visible is the wait for the
   * question actually being revealed.
   *
   * @param options the answers to give.
   */
  async selectWelshLanguageRequirements({
    needDocumentsInWelsh,
    languageToCompleteApplication,
    doesApplicationNeedTranslating,
  }: WelshLanguageRequirementsOptions): Promise<void> {
    await this.answer(NEEDS_WELSH, needDocumentsInWelsh ? "Yes" : "No");
    if (!needDocumentsInWelsh) {
      return;
    }

    await this.answer(LANGUAGE, languageToCompleteApplication);
    await this.answer(
      languageToCompleteApplication === "English"
        ? TRANSLATE_INTO_WELSH
        : TRANSLATE_INTO_ENGLISH,
      doesApplicationNeedTranslating ? "Yes" : "No",
    );
  }

  private async answer<Option extends string>(
    question: RadioQuestion<Option>,
    option: Option,
  ): Promise<void> {
    await this.label(question).waitFor();
    await this.page.locator(question.options[option]).check();
  }

  private label(question: { readonly label: string }): Locator {
    return this.page.locator(Selectors.GovukFormLabel, {
      hasText: question.label,
    });
  }
}
