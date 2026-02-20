import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { AllegationsOfHarmRevisedSubmitContent } from "../../../../../fixtures/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevisedSubmitContent";
import { Helpers } from "../../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";
import { AllegationsOfHarmRevised2Content } from "../../../../../fixtures/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevised2Content";
import path from "path";
import config from "../../../../../utils/config.utils";
import { AllegationsOfHarmRevised3Content } from "../../../../../fixtures/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevised3Content";
import { AllegationsOfHarmRevised5Content } from "../../../../../fixtures/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevised5Content";
import { AllegationsOfHarmRevised6Content } from "../../../../../fixtures/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevised6Content";
import { AllegationsOfHarmRevised7Content } from "../../../../../fixtures/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevised7Content";
import { AllegationsOfHarmRevised8Content } from "../../../../../fixtures/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevised8Content";
import { AllegationsOfHarmRevised9Content } from "../../../../../fixtures/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevised9Content";
import { AllegationsOfHarmRevised10Content } from "../../../../../fixtures/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevised10Content";
import { AllegationsOfHarmRevised11Content } from "../../../../../fixtures/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevised11Content";
import { C100AllegationsOfHarmTypeOfDomesticAbuse } from "./allegationsOfHarmRevised3Page";

interface AllegationsOfHarmRevisedSubmitPageOptions {
  page: Page;
  accessibilityTest: boolean;
  c100YesNoAllegationsOfHarm: boolean;
  c100DomesticAbuseTypePage3: C100AllegationsOfHarmTypeOfDomesticAbuse;
}

export class AllegationsOfHarmRevisedSubmitPage {
  public static async allegationsOfHarmRevisedSubmitPage({
    page: page,
    accessibilityTest: accessibilityTest,
    c100YesNoAllegationsOfHarm: c100YesNoAllegationsOfHarm,
    c100DomesticAbuseTypePage3: C100AllegationsOfHarmTypeOfDomesticAbuse,
  }: AllegationsOfHarmRevisedSubmitPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
      c100YesNoAllegationsOfHarm: c100YesNoAllegationsOfHarm,
      c100DomesticAbuseTypePage3: C100AllegationsOfHarmTypeOfDomesticAbuse,
    });
    await this.checkFilledFields({
      page: page,
      accessibilityTest: accessibilityTest,
      c100YesNoAllegationsOfHarm: c100YesNoAllegationsOfHarm,
      c100DomesticAbuseTypePage3: C100AllegationsOfHarmTypeOfDomesticAbuse,
    });
    await this.continueOn(page);
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
    c100YesNoAllegationsOfHarm: c100YesNoAllegationsOfHarm,
    c100DomesticAbuseTypePage3: c100DomesticAbuseTypePage3,
  }: AllegationsOfHarmRevisedSubmitPageOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text161}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${AllegationsOfHarmRevisedSubmitContent.pageTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        AllegationsOfHarmRevisedSubmitContent,
        `text16`,
        `${Selectors.GovukText16}`,
      ),
    ]);
    if (c100YesNoAllegationsOfHarm) {
      await Promise.all([
        Helpers.checkGroup(
          page,
          10,
          AllegationsOfHarmRevisedSubmitContent,
          `h2`,
          `${Selectors.h2}`,
        ),
        Helpers.checkGroup(
          page,
          2,
          AllegationsOfHarmRevisedSubmitContent,
          `h3`,
          `${Selectors.h3}`,
        ),
        Helpers.checkGroup(
          page,
          2,
          AllegationsOfHarmRevisedSubmitContent,
          `p`,
          `${Selectors.p}`,
        ),
        Helpers.checkGroup(
          page,
          25,
          AllegationsOfHarmRevisedSubmitContent,
          `text16Yes`,
          `${Selectors.GovukText16}`,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesGiveDetails}")`,
          4,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesDateIssued}")`,
          6,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesEndDate}")`,
          6,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesOrderCurrent}")`,
          6,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesNameOfCourt}")`,
          6,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesCaseNumber}")`,
          6,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesUploadOrder}")`,
          6,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesDescribeAbuseMandatory}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesDescribeAbuse}")`,
          5,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesDurationAbuseMandatory}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesDurationAbuse}")`,
          5,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesApplicantSoughtHelpMandatory}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesApplicantSoughtHelp}")`,
          5,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesApplicantSoughtHelpWhoMandatory}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesApplicantSoughtHelpWho}")`,
          5,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesTypeOfAbuseMandatory}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesTypeOfAbuse}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesAreAllChildrenAtRisk}")`,
          5,
        ),
      ]);
      switch (c100DomesticAbuseTypePage3) {
        case "Physical abuse":
          await Promise.all([
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesPhysicalAbuse}")`,
              2,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesPsychologicalAbuse}")`,
              1,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesSexualAbuse}")`,
              1,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesFinancial}")`,
              1,
            ),
          ]);
          break;
        case "Psychological abuse":
          await Promise.all([
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesPhysicalAbuse}")`,
              1,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesPsychologicalAbuse}")`,
              2,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesSexualAbuse}")`,
              1,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesFinancial}")`,
              1,
            ),
          ]);
          break;
        case "Sexual abuse":
          await Promise.all([
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesPhysicalAbuse}")`,
              1,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesPsychologicalAbuse}")`,
              1,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesSexualAbuse}")`,
              2,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesFinancial}")`,
              1,
            ),
          ]);
          break;
        case "Financial abuse":
          await Promise.all([
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesPhysicalAbuse}")`,
              1,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesPsychologicalAbuse}")`,
              1,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesSexualAbuse}")`,
              1,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesFinancial}")`,
              2,
            ),
          ]);
          break;
      }
    }
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkFilledFields({
    page: page,
    c100YesNoAllegationsOfHarm: c100YesNoAllegationsOfHarm,
  }: AllegationsOfHarmRevisedSubmitPageOptions): Promise<void> {
    if (!c100YesNoAllegationsOfHarm) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16No}")`,
        1,
      );
    } else {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevisedSubmitContent.text16YesYes}")`,
          37,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${AllegationsOfHarmRevised2Content.detailsAbuse}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${AllegationsOfHarmRevised2Content.detailsWelfare}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${Helpers.dayAbbreviatedMonthYear(AllegationsOfHarmRevised2Content.dayIssuedNMOrder, AllegationsOfHarmRevised2Content.monthIssuedNMOrder, AllegationsOfHarmRevised2Content.yearIssuedNMOrder)}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${Helpers.dayAbbreviatedMonthYear(AllegationsOfHarmRevised2Content.dayEndNMOrder, AllegationsOfHarmRevised2Content.monthEndNMOrder, AllegationsOfHarmRevised2Content.yearEndNMOrder)}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${AllegationsOfHarmRevised2Content.nameOfCourtNMOrder}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${AllegationsOfHarmRevised2Content.caseNumberNMOrder}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${Helpers.dayAbbreviatedMonthYear(AllegationsOfHarmRevised2Content.dayIssuedOOrder, AllegationsOfHarmRevised2Content.monthIssuedOOrder, AllegationsOfHarmRevised2Content.yearIssuedOOrder)}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${Helpers.dayAbbreviatedMonthYear(AllegationsOfHarmRevised2Content.dayEndOOrder, AllegationsOfHarmRevised2Content.monthEndOOrder, AllegationsOfHarmRevised2Content.yearEndOOrder)}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${AllegationsOfHarmRevised2Content.nameOfCourtOOrder}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${AllegationsOfHarmRevised2Content.caseNumberOOrder}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${Helpers.dayAbbreviatedMonthYear(AllegationsOfHarmRevised2Content.dayIssuedFMOrder, AllegationsOfHarmRevised2Content.monthIssuedFMOrder, AllegationsOfHarmRevised2Content.yearIssuedFMOrder)}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${Helpers.dayAbbreviatedMonthYear(AllegationsOfHarmRevised2Content.dayEndFMOrder, AllegationsOfHarmRevised2Content.monthEndFMOrder, AllegationsOfHarmRevised2Content.yearEndFMOrder)}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${AllegationsOfHarmRevised2Content.nameOfCourtFMOrder}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${AllegationsOfHarmRevised2Content.caseNumberFMOrder}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${Helpers.dayAbbreviatedMonthYear(AllegationsOfHarmRevised2Content.dayIssuedROrder, AllegationsOfHarmRevised2Content.monthIssuedROrder, AllegationsOfHarmRevised2Content.yearIssuedROrder)}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${Helpers.dayAbbreviatedMonthYear(AllegationsOfHarmRevised2Content.dayEndROrder, AllegationsOfHarmRevised2Content.monthEndROrder, AllegationsOfHarmRevised2Content.yearEndROrder)}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${AllegationsOfHarmRevised2Content.nameOfCourtROrder}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${AllegationsOfHarmRevised2Content.caseNumberROrder}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${Helpers.dayAbbreviatedMonthYear(AllegationsOfHarmRevised2Content.dayIssuedOIOrder, AllegationsOfHarmRevised2Content.monthIssuedOIOrder, AllegationsOfHarmRevised2Content.yearIssuedOIOrder)}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${Helpers.dayAbbreviatedMonthYear(AllegationsOfHarmRevised2Content.dayEndOIOrder, AllegationsOfHarmRevised2Content.monthEndOIOrder, AllegationsOfHarmRevised2Content.yearEndOIOrder)}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${AllegationsOfHarmRevised2Content.nameOfCourtOIOrder}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${AllegationsOfHarmRevised2Content.caseNumberOIOrder}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${Helpers.dayAbbreviatedMonthYear(AllegationsOfHarmRevised2Content.dayIssuedUIPOrder, AllegationsOfHarmRevised2Content.monthIssuedUIPOrder, AllegationsOfHarmRevised2Content.yearIssuedUIPOrder)}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${Helpers.dayAbbreviatedMonthYear(AllegationsOfHarmRevised2Content.dayEndUIPOrder, AllegationsOfHarmRevised2Content.monthEndUIPOrder, AllegationsOfHarmRevised2Content.yearEndUIPOrder)}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${AllegationsOfHarmRevised2Content.nameOfCourtUIPOrder}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${AllegationsOfHarmRevised2Content.caseNumberUIPOrder}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovLink}:text-is("${path.basename(config.testPdfFile)}")`,
          6,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${AllegationsOfHarmRevised3Content.natureOfBehaviour}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevised3Content.behaviourLength}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${AllegationsOfHarmRevised3Content.helpSoughtFrom}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${AllegationsOfHarmRevised5Content.natureOfBehaviour}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevised5Content.durationOfBehaviour}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${AllegationsOfHarmRevised5Content.seekHelp}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${AllegationsOfHarmRevised6Content.natureOfBehaviour}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevised6Content.durationOfBehaviour}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${AllegationsOfHarmRevised6Content.seekHelp}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${AllegationsOfHarmRevised7Content.natureOfBehaviour}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevised7Content.durationOfBehaviour}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${AllegationsOfHarmRevised7Content.seekHelp}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${AllegationsOfHarmRevised8Content.natureOfBehaviour}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevised8Content.durationOfBehaviour}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${AllegationsOfHarmRevised8Content.seekHelp}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${AllegationsOfHarmRevised9Content.natureOfBehaviour}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevised9Content.durationOfBehaviour}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${AllegationsOfHarmRevised9Content.seekHelp}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${AllegationsOfHarmRevised10Content.childrenAbducted}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${AllegationsOfHarmRevised10Content.previousThreats}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${AllegationsOfHarmRevised10Content.childrenLocation}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${AllegationsOfHarmRevised10Content.policeNotified}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${AllegationsOfHarmRevised10Content.otherParentPassport}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${AllegationsOfHarmRevised11Content.stepsForCourt}")`,
          1,
        ),
      ]);
    }
  }

  private static async continueOn(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${AllegationsOfHarmRevisedSubmitContent.continue}")`,
    );
  }
}
