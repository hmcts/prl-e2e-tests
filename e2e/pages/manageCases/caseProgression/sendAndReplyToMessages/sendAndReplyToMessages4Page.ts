import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { SendAndReplyToMessages4Content } from "../../../../fixtures/manageCases/caseProgression/sendAndReplyToMessages/sendAndReplyToMessages4Content.ts";
import { CommonContent } from "../../../../fixtures/manageCases/commonContent.ts";
import { solicitorCaseCreateType } from "../../../../common/types.ts";

enum UniqueSelectors {
  respondToMessageYesRadio = "#respondToMessage_Yes",
  respondToMessageNoRadio = "#respondToMessage_No",
}

export class SendAndReplyToMessages4Page {
  public static async sendAndReplyToMessages4Page(
    page: Page,
    responseRequired: boolean,
    caseType: solicitorCaseCreateType,
  ) {
    await this.checkPageLoads(page, caseType);
    await this.fillInFields(page, responseRequired);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    caseType: solicitorCaseCreateType,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukFormLabel, {
        hasText: SendAndReplyToMessages4Content.formLabel1,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${SendAndReplyToMessages4Content.govUkHeadingL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${SendAndReplyToMessages4Content.formHint}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        8,
        SendAndReplyToMessages4Content,
        "formLabel",
        Selectors.GovukFormLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonContent.judgeName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonContent.judgeEmail}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        14,
        SendAndReplyToMessages4Content,
        "headingH4",
        Selectors.headingH4,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SendAndReplyToMessages4Content.DuplicateFormLabelNo}")`,
        2,
      ),
      Helpers.checkGroup(
        page,
        2,
        SendAndReplyToMessages4Content,
        "caseFieldLabel",
        Selectors.GovukTextFieldLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${SendAndReplyToMessages4Content.addNew}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:has-text("${Helpers.todayDate()}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.previous}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
        1,
      ),
    ]);
    if (caseType === "C100") {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${SendAndReplyToMessages4Content.c100FormLabel}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.a}:text-is("${SendAndReplyToMessages4Content.c100Anchor}")`,
          1,
        ),
      ]);
    } else {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${SendAndReplyToMessages4Content.fl401FormLabel}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.a}:text-is("${SendAndReplyToMessages4Content.fl401Anchor}")`,
          1,
        ),
      ]);
    }
    // TODO Disabled pending ticket FPET:1211
    // if (accessibilityTest) {
    //   await new AxeUtils(page).audit();
    // }
  }

  private static async fillInFields(
    page: Page,
    responseRequired: boolean,
  ): Promise<void> {
    if (responseRequired) {
      await page.check(UniqueSelectors.respondToMessageYesRadio);
    } else {
      await page.check(UniqueSelectors.respondToMessageNoRadio);
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
