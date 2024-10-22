import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import {
  PhysicalAbuseContent
} from "../../../../../fixtures/citizen/createCase/C100/safetyConcerns/physicalAbuseContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";

enum checkboxIDs {
  child1 = '#childrenConcernedAbout'
}

enum radioInputIDs {
  ongoingBehaviorYes = "#isOngoingBehaviour",
  ongoingBehaviorNo = "#isOngoingBehaviour-2",
  seekHelpYes = "#seekHelpFromPersonOrAgency",
  seekHelpNo = "#seekHelpFromPersonOrAgency-2"
}

enum textFieldIDs {
  behaviourDetails = '#behaviourDetails',
  behaviourStartDate = '#behaviourStartDate',
  seekHelpDetails = '#seekHelpDetails'
}

interface PhysicalAbusePageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100PhysicalAbuseYesNoToAll: boolean;
}

interface FillInFieldsOptions {
  page: Page;
  c100PhysicalAbuseYesNoToAll: boolean;
}

interface SeekHelpOptions {
  page: Page;
  c100PhysicalAbuseYesNoToAll: boolean;
}

interface OngoingBehaviourOptions {
  page: Page;
  c100PhysicalAbuseYesNoToAll: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class PhysicalAbusePage {
  public static async physicalAbusePage({
    page,
    accessibilityTest,
    errorMessaging
  }: PhysicalAbusePageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest
    });
    if (errorMessaging) {
      await this.checkErrorMessaging(page)
    }
  }

  private static async checkPageLoads({
    page,
    accessibilityTest
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${PhysicalAbuseContent.pageTitle}")`
    );
    // There should also be a checkVisibleAndPresent for the child's name, but this is dynamic and not added yet
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionXL}:text-is("${PhysicalAbuseContent.caption}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:text-is("${PhysicalAbuseContent.injunctionLink}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${PhysicalAbuseContent.span}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${PhysicalAbuseContent.strong}")`,
        1
      ),
      Helpers.checkGroup(
        page,
        4,
        PhysicalAbuseContent,
        'body',
        `${Selectors.GovukBody}`
      ),
      Helpers.checkGroup(
        page,
        3,
        PhysicalAbuseContent,
        'legend',
        `${Selectors.GovukFieldsetLegend}`
      ),
      Helpers.checkGroup(
        page,
        3,
        PhysicalAbuseContent,
        'formHint',
        `${Selectors.GovukFormHint}`
      ),
      Helpers.checkGroup(
        page,
        2,
        PhysicalAbuseContent,
        'formLabel',
        `${Selectors.GovukLabel}`
      ),
    ])
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page)
    }
  }

  private static async checkErrorMessaging(
    page: Page
  ): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1
      ),
    ])
  }

  private static async fillInFields({
    page,
    c100PhysicalAbuseYesNoToAll
  }: FillInFieldsOptions): Promise<void> {
    for (let checkbox of Object.values(checkboxIDs)) {
      await page.check(
        checkbox
      );
    }
    const textToFill: [string, string] = [
      'behaviourDetails', 'behaviourStartDate'
    ];
    for (let key of textToFill) {
      let inputKey = key as keyof typeof textFieldIDs;
      let contentKey = key as keyof typeof PhysicalAbuseContent;
      await page.fill(
        textFieldIDs[inputKey],
        PhysicalAbuseContent[contentKey]
      )
    }
    await this.ongoingBehaviourFields({
      page,
      c100PhysicalAbuseYesNoToAll
    });
    await this.seekHelpFields({
      page,
      c100PhysicalAbuseYesNoToAll
    })
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`
    )
  }

  private static async ongoingBehaviourFields({
    page,
    c100PhysicalAbuseYesNoToAll
  }: OngoingBehaviourOptions): Promise<void> {
    if (c100PhysicalAbuseYesNoToAll) {
      await page.click(
        radioInputIDs.ongoingBehaviorYes
      );
      await Promise.all([
        Helpers.checkGroup(
          page,
          2,
          PhysicalAbuseContent,
          'ongoingBehaviourLink',
          `${Selectors.GovukLink}`
        ),
        Helpers.checkGroup(
          page,
          2,
          PhysicalAbuseContent,
          'ongoingBehaviourBody',
          `${Selectors.GovukBody}`
        ),
      ]);
    } else {
      await page.click(
        radioInputIDs.ongoingBehaviorNo
      );
    }
  }

  private static async seekHelpFields({
    page,
    c100PhysicalAbuseYesNoToAll
  }: SeekHelpOptions): Promise<void> {
    if (c100PhysicalAbuseYesNoToAll) {
      await page.click(
        radioInputIDs.seekHelpYes
      );
      await Helpers.checkGroup(
        page,
        2,
        PhysicalAbuseContent,
        'seekHelpBody',
        `${Selectors.GovukBody}`
      );
      await page.fill(
        textFieldIDs.seekHelpDetails,
        PhysicalAbuseContent.seekHelpDetails
      );
    } else {
      await page.click(
        radioInputIDs.seekHelpYes
      );
      await Promise.all([
        Helpers.checkGroup(
          page,
          2,
          PhysicalAbuseContent,
          'nspccGuidanceBody',
          `${Selectors.GovukBody}`
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukLink}:text-is("${PhysicalAbuseContent.nspccGuidanceLink}")`,
          1
        )
      ])
    }
  }
}