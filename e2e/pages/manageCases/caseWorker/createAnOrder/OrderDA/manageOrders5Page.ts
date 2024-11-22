import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ManageOrders1DAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders1DAContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { ManageOrders5DAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders5DAContent";

interface ManageOrders5PageOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoManageOrders: boolean;
}

enum UniqueSelectors {
  isTheOrderByConsent_Yes = "#isTheOrderByConsent_Yes",
  isTheOrderByConsent_No = "#isTheOrderByConsent_No",
  wasTheOrderApprovedAtHearing_Yes = "#wasTheOrderApprovedAtHearing_Yes",
  wasTheOrderApprovedAtHearing_No = "#wasTheOrderApprovedAtHearing_No",
  isTheOrderAboutChildren_Yes = "#isTheOrderAboutChildren_Yes",
  isTheOrderAboutChildren_No = "#isTheOrderAboutChildren_No",
  judgeFullNameInput = "#judgeOrMagistratesLastName",
  fullNameJusticeLegalAdvisorInput = "#justiceLegalAdviserFullName",
  day = "#dateOrderMade-day",
  month = "#dateOrderMade-month",
  year = "#dateOrderMade-year",
  addRecitalsOrPreamble = "#recitalsOrPreamble",
  addDirections = "#orderDirections",
  selectOption = "#hearingsType",
}

enum UniqueSelectorsOrderMadeBy {
  herHonourJudge = "#judgeOrMagistrateTitle-herHonourJudge",
  hisHonourJudge = "#judgeOrMagistrateTitle-hisHonourJudge",
  circuitJudge = "#judgeOrMagistrateTitle-circuitJudge",
  deputyCircuitJudge = "#judgeOrMagistrateTitle-deputyCircuitJudge",
  recorder = "#judgeOrMagistrateTitle-recorder",
  districtJudge = "#judgeOrMagistrateTitle-districtJudge",
  deputyDistrictJudge = "#judgeOrMagistrateTitle-deputyDistrictJudge",
  districtJudgeMagistratesCourt = "#judgeOrMagistrateTitle-districtJudgeMagistratesCourt",
  magistrates = "#judgeOrMagistrateTitle-magistrates",
  justicesLegalAdviser = "#judgeOrMagistrateTitle-justicesLegalAdviser",
  justicesClerk = "#judgeOrMagistrateTitle-justicesClerk",
  theHonourableMrsJustice = "#judgeOrMagistrateTitle-theHonourableMrsJustice",
  theHonourableMrJustice = "#judgeOrMagistrateTitle-theHonourableMrJustice",
}

enum childrenIncludedInOrder {
  johnDoe = "#childOption_ac193d35-bcd1-4abf-8402-929295c9545c",
  simonAnderson = "#childOption_5f9a3c81-f6ec-48c6-bd3a-ace5751a6229",
}

export class ManageOrders5Page {
  public static async manageOrders5Page({
    page,
    accessibilityTest,
    yesNoManageOrders,
  }: ManageOrders5PageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page, yesNoManageOrders });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<ManageOrders5PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${ManageOrders1DAContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ManageOrders5DAContent.span}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${ManageOrders5DAContent.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${ManageOrders5DAContent.strong}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        22,
        ManageOrders5DAContent,
        "formLabel",
        Selectors.GovukFormLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.yes}"):visible`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.no}"):visible`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.day}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.month}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.year}"):visible`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
    yesNoManageOrders,
  }: Partial<ManageOrders5PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await page.fill(
      UniqueSelectors.judgeFullNameInput,
      ManageOrders5DAContent.judgeName,
    );
    await page.fill(
      UniqueSelectors.fullNameJusticeLegalAdvisorInput,
      ManageOrders5DAContent.testLegalAdvisor,
    );
    await page.click(UniqueSelectorsOrderMadeBy.herHonourJudge);
    // await page.click(${SelectType}); #TODO once type is created we can use it as an argument
    await page.fill(UniqueSelectors.day, ManageOrders5DAContent.day);
    await page.fill(UniqueSelectors.month, ManageOrders5DAContent.month);
    await page.fill(UniqueSelectors.year, ManageOrders5DAContent.year);
    await page.fill(
      UniqueSelectors.addRecitalsOrPreamble,
      ManageOrders5DAContent.loremIpsum,
    );
    await page.fill(
      UniqueSelectors.addDirections,
      ManageOrders5DAContent.loremIpsum,
    );
    if (yesNoManageOrders) {
      await page.click(UniqueSelectors.isTheOrderByConsent_Yes);
      await page.click(UniqueSelectors.wasTheOrderApprovedAtHearing_Yes);
      await page.click(UniqueSelectors.isTheOrderAboutChildren_Yes);
      await page.selectOption(
        UniqueSelectors.selectOption,
        ManageOrders5DAContent.noHearings,
      );
      for (const selector of Object.values(childrenIncludedInOrder)) {
        await page.click(selector);
      }
      await this.hiddenFormLabels(page);
    } else {
      await page.click(UniqueSelectors.isTheOrderByConsent_No);
      await page.click(UniqueSelectors.wasTheOrderApprovedAtHearing_No);
      await page.click(UniqueSelectors.isTheOrderAboutChildren_No);
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }

  private static async hiddenFormLabels(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        ManageOrders5DAContent,
        "formLabelHidden",
        Selectors.GovukFormLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${ManageOrders5DAContent.formLabelHiddenJohnDoe}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${ManageOrders5DAContent.formLabelHiddenSimon}")`,
        1,
      ),
    ]);
  }
}
