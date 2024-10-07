import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import {
  ViewPDFApplication1Content
} from "../../../../../fixtures/manageCases/createCase/C100/viewPDFApplication/viewPDFApplication1Content";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import {
  EnglishMediaContentYesToAll
} from "../../../../../fixtures/manageCases/createCase/C100/viewPDFApplication/englishMediaContentYesToAll";
import {
  WelshMediaContent
} from "../../../../../fixtures/manageCases/createCase/C100/viewPDFApplication/welshMediaContent";
import {
  EnglishMediaContentNoToAll
} from "../../../../../fixtures/manageCases/createCase/C100/viewPDFApplication/englishMediaContentNoToAll";

enum inputIDs {
  mvDownBtn = "#mvDownBtn",
  numPages = "#numPages",
}

interface ViewPDFApplication1PageOptions {
  page: Page;
  accessibilityTest: boolean;
  c100YesNoToAll: boolean
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
  c100YesNoToAll: boolean
}

interface CheckEnglishPDFContentOptions {
  page: Page;
  c100YesNoToAll: boolean
}

interface CheckPDFContentOptions {
  page: Page;
  c100YesNoToAll: boolean
}

export class ViewPDFApplication1Page {
  public static async viewPDFApplication1Page({
    page,
    accessibilityTest,
    c100YesNoToAll
  }: ViewPDFApplication1PageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
      c100YesNoToAll
    });
    await this.checkPDFContent({
      page,
      c100YesNoToAll
    });
    await this.checkPDFContent({
      page,
      c100YesNoToAll
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
    c100YesNoToAll
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${ViewPDFApplication1Content.pageTitle}")`
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${ViewPDFApplication1Content.p}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukTextFieldLabel}:text-is("${ViewPDFApplication1Content.fieldLabel}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${ViewPDFApplication1Content.h3}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ViewPDFApplication1Content.pdfLink}")`,
        1
      ),
    ]);
    if (c100YesNoToAll) {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.a}:text-is("${ViewPDFApplication1Content.welshPdfLink}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukTextFieldLabel}:text-is("${ViewPDFApplication1Content.welshFieldLabel}")`,
          1
        ),
      ]);
    }
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkPDFContent({
    page,
    c100YesNoToAll
  }: CheckPDFContentOptions): Promise<void> {
    if (c100YesNoToAll) {
      await this.checkEnglishPDFContentYesToAll(page)
      await this.checkWelshPDFContent(
        page
      );
    } else {
      await this.checkEnglishPDFContentNoToAll(page);
    }
  }

  private static async checkEnglishPDFContentYesToAll(
    page: Page
  ): Promise<void> {
    const [pdfPage] = await Promise.all([
      page.waitForEvent("popup"),
      page.click(`${Selectors.a}:text-is("${ViewPDFApplication1Content.pdfLink}")`),
    ]);
    await pdfPage.waitForLoadState();
    await Promise.all([
      Helpers.checkGroup(
        page,
        177,
        EnglishMediaContentYesToAll,
        'span',
        `${Selectors.Span}`
      ),
      Helpers.checkGroup(
        page,
        47,
        EnglishMediaContentYesToAll,
        'filledSpan',
        `${Selectors.Span}`
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.caseNumber}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.ordersAppliedFor}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.arrangementOrder}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.prohibitedStepsOrder}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.specificIssueOrder}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.loremIpsumLine1}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.loremIpsumLine2}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.loremIpsumLine3}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.yes}")`,
        43
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.attached}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.loremIpsumLine4}")`,
        4
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.firstNames}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.lastName}")`,
        4
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.gender}")`,
        4
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.male}")`,
        4
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.dobFormat}")`,
        4
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.jan2020}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.placeOfBirth}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.london}")`,
        5
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.informationConfidential}")`,
        6
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.confidentialQuestion}")`,
        4
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.than5Years}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.loremLast5Years}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.emailAddressIfAvailable}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.contactNumber}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.repFirstName}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.automatedRepresentative}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.repLastname}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.testRepLastName}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.emailAddress}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.repEmailAddress}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.solicitorReference}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.organisationName}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.udayTestOrg}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.organisationAddress}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.bpAddress}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.bpPostcode}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.uk}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.dxNumber}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.dxNumberInput}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.previousName}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.currentAddress}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.phoneNumberInput}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.confidentialAddress}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.childName}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.childNameInput}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.father}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.childLiveWithPerson}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.reasonsProvided}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentYesToAll.loremIpsum}")`,
        5
      ),
    ])
  }

  private static async checkEnglishPDFContentNoToAll(
    page: Page
  ): Promise<void> {
    const [pdfPage] = await Promise.all([
      page.waitForEvent("popup"),
      page.click(`${Selectors.a}:text-is("${ViewPDFApplication1Content.pdfLink}")`),
    ]);
    await this.scrollToBottom(page)
    await pdfPage.waitForLoadState();
    console.log('bruh')
    await Promise.all([
      Helpers.checkGroup(
        page,
        151,
        EnglishMediaContentNoToAll,
        'span',
        `${Selectors.Span}`
      ),
      Helpers.checkGroup(
        page,
        159,
        EnglishMediaContentNoToAll,
        'filledSpan',
        `${Selectors.Span}`
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.no}")`,
        32
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.firstNames}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.lastName}")`,
        4
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.gender}")`,
        5
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.female}")`,
        5
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.dateOfBirth}")`,
        4
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.placeOfBirth}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.london}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.buckinghamPalace}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.postalCodeSW1A1AA}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.unitedKingdom}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.isConfidential}")`,
        4
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.lessThan5Years}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.emailAddressIfAvailable}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.contactNumber}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.emailAddress}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.previousName}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.currentAddress}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.needToKeepAddressConfidential}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.childName}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.automatedChildFullName}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.doesChildLiveWithPerson}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.loremIpsum}")`,
        6
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.yes}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.offence}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.party}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.prospectiveParty}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${EnglishMediaContentNoToAll.reasonsProvided}")`,
        3
      ),
    ])
  }

  private static async checkWelshPDFContent(
    page: Page
  ): Promise<void> {
    const [pdfPage] = await Promise.all([
      page.waitForEvent("popup"),
      page.click(`${Selectors.a}:text-is("${ViewPDFApplication1Content.welshPdfLink}")`),
    ]);
    await pdfPage.waitForLoadState();
    await this.scrollToBottom(page);
    await Promise.all([
      Helpers.checkGroup(
        page,
        200,
        EnglishMediaContentYesToAll,
        'span',
        `${Selectors.Span}`
      ),
      Helpers.checkGroup(
        page,
        40,
        EnglishMediaContentYesToAll,
        'filledSpan',
        `${Selectors.Span}`
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.caseNumber}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.startDateFormat}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.ddmmyyyFormat}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.ordersAppliedFor}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.aboutHimHer}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.arrangementOrder}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.prohibitedStepsOrder}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.specificIssueOrder}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.loremIpsumLine1}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.loremIpsumLine2}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.loremIpsumLine3}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.yesYdy}")`,
        28
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.attached}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.loremIpsumLine4}")`,
        4
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.yesYdw}")`,
        6
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.firstNames2}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.lastName}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.gender}")`,
        4
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.male}")`,
        4
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.dobFormatLine1}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.dobFormatLine2}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.childrenQuestion}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.jan2020}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.placeOfBirth}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.london}")`,
        6
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.informationConfidential}")`,
        4
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.confidentialQuestion}")`,
        6
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.than5Years}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.loremLast5Years}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.yesOes}")`,
        4
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.emailAddressIfAvailable}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.contactNumber}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.repFirstName}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.automatedRepresentative}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.repLastName}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.testRepLastName}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.emailAddress}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.repEmailAddress}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.solicitorReference}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.organisationName}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.udayTestOrg}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.organisationAddress}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.bpAddress}")`,
        4
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.bpPostcode}")`,
        4
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.uk}")`,
        4
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.dxNumber}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.dxNumberInput}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.firstNames}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.previousName}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.phoneNumberInput}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.englishYes}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.childName}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.childNameInput}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.father}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.childLiveWithPerson}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.reasonsProvided}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${WelshMediaContent.loremIpsum}")`,
        5
      ),
    ])
  }

  private static async scrollToBottom(page: Page) {
    const numOfPagesLocator = page.locator(inputIDs.numPages);
    await expect(numOfPagesLocator).not.toHaveText(/0/); // <- Wait for number of pages not to be 0 (i.e., page has loaded)

    const numOfPageText = await numOfPagesLocator.textContent();
    const numOfPages = parseInt(numOfPageText?.replace("/", "").trim(), 10); // <- numOfPageText is in format "/ 7", strip
    //                                 the '/' out and convert to int so can
    //                                 be used in loop
    for (let i = 0; i < numOfPages - 1; i++) {
      await page.click(inputIDs.mvDownBtn);
    }
  }
}