import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ManageOrders1DAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/orderDA/manageOrders1DAContent";
import { Helpers } from "../../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import {
  CreateOrderFL401Options,
  CreateOrderManageOrders5Content,
} from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/orderDA/createOrderManageOrders5Content";
import {
  createOrderFL401Options,
  judgeTitles,
} from "../../../../../common/types";

interface ManageOrders5PageOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoManageOrders: boolean;
  createOrderFL401Options: createOrderFL401Options;
  judgeTitles: judgeTitles;
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

export class CreateOrderManageOrders5Page {
  public static async manageOrders5Page({
    page,
    accessibilityTest,
    yesNoManageOrders,
    createOrderFL401Options,
    judgeTitles,
  }: ManageOrders5PageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
      createOrderFL401Options,
    });
    await this.fillInFields({
      page,
      yesNoManageOrders,
      judgeTitles: judgeTitles,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
    createOrderFL401Options,
  }: Partial<ManageOrders5PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${ManageOrders1DAContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    switch (createOrderFL401Options) {
      case "power of arrest":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${CreateOrderFL401Options.spanPowerOfArrest}")`,
          1,
        );
        break;
      case "occupation order":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${CreateOrderFL401Options.spanOccupationOrder}")`,
          1,
        );
        break;
      case "non-molestation":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${CreateOrderFL401Options.spanNonMolestation}")`,
          1,
        );
        break;
      case "amend discharge varied order":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${CreateOrderFL401Options.spanAmendDischargeVariedOrder}")`,
          1,
        );
        break;
      case "blank order":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${CreateOrderFL401Options.spanBlankOrder}")`,
          1,
        );
        break;
      case "general form of undertaking":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${CreateOrderFL401Options.spanGeneralFormOfUndertaking}")`,
          1,
        );
        break;
      case "notice of proceedings":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${CreateOrderFL401Options.spanNoticeOfProceedings}")`,
          1,
        );
        break;
    }
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CreateOrderManageOrders5Content.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${CreateOrderManageOrders5Content.strong}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        22,
        CreateOrderManageOrders5Content,
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
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields({
    page,
    yesNoManageOrders,
    judgeTitles,
  }: Partial<ManageOrders5PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await page.fill(
      UniqueSelectors.judgeFullNameInput,
      CreateOrderManageOrders5Content.judgeName,
    );
    await page.fill(
      UniqueSelectors.fullNameJusticeLegalAdvisorInput,
      CreateOrderManageOrders5Content.testLegalAdvisor,
    );
    switch (judgeTitles) {
      case "Her Honour Judge":
        await page.click(UniqueSelectorsOrderMadeBy.herHonourJudge);
        break;
      case "His Honour Judge":
        await page.click(UniqueSelectorsOrderMadeBy.hisHonourJudge);
        break;
      case "Circuit Judge":
        await page.click(UniqueSelectorsOrderMadeBy.circuitJudge);
        break;
      case "Deputy Circuit Judge":
        await page.click(UniqueSelectorsOrderMadeBy.deputyCircuitJudge);
        break;
      case "Recorder":
        await page.click(UniqueSelectorsOrderMadeBy.recorder);
        break;
      case "District Judge":
        await page.click(UniqueSelectorsOrderMadeBy.districtJudge);
        break;
      case "Deputy District Judge":
        await page.click(UniqueSelectorsOrderMadeBy.deputyDistrictJudge);
        break;
      case "District Judge Magistrates Court":
        await page.click(
          UniqueSelectorsOrderMadeBy.districtJudgeMagistratesCourt,
        );
        break;
      case "Magistrates":
        await page.click(UniqueSelectorsOrderMadeBy.magistrates);
        break;
      case "Justices' Legal Adviser":
        await page.click(UniqueSelectorsOrderMadeBy.justicesLegalAdviser);
        break;
      case "Justices' Clerk":
        await page.click(UniqueSelectorsOrderMadeBy.justicesClerk);
        break;
      case "The Honourable Mrs Justice":
        await page.click(UniqueSelectorsOrderMadeBy.theHonourableMrsJustice);
        break;
      case "The Honourable Mr Justice":
        await page.click(UniqueSelectorsOrderMadeBy.theHonourableMrJustice);
        break;
      default:
        throw new Error("Invalid judge title");
    }
    await page.fill(UniqueSelectors.day, CreateOrderManageOrders5Content.day);
    await page.fill(
      UniqueSelectors.month,
      CreateOrderManageOrders5Content.month,
    );
    await page.fill(UniqueSelectors.year, CreateOrderManageOrders5Content.year);
    await page.fill(
      UniqueSelectors.addRecitalsOrPreamble,
      CreateOrderManageOrders5Content.loremIpsum,
    );
    await page.fill(
      UniqueSelectors.addDirections,
      CreateOrderManageOrders5Content.loremIpsum,
    );
    if (yesNoManageOrders) {
      await page.click(UniqueSelectors.isTheOrderByConsent_Yes);
      await page.click(UniqueSelectors.wasTheOrderApprovedAtHearing_Yes);
      await page.click(UniqueSelectors.isTheOrderAboutChildren_Yes);
      await page.selectOption(
        UniqueSelectors.selectOption,
        CreateOrderManageOrders5Content.noHearings,
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
        CreateOrderManageOrders5Content,
        "formLabelHidden",
        Selectors.GovukFormLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CreateOrderManageOrders5Content.formLabelHiddenJohnDoe}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CreateOrderManageOrders5Content.formLabelHiddenSimon}")`,
        1,
      ),
    ]);
  }
}
