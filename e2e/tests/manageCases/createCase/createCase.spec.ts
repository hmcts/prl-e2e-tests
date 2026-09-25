import { test } from "../../fixtures.ts";
import { SolicitorPagesGroup } from "../../../pageObjects/roleBasedGroupedPages/solicitorPages.ts";

// Bilingual task links that only render once the case has been created.
const c100TaskLinks: string[] = [
  "Type of application / Math o gais",
  "Applicant details / Manylion y ceisydd",
  "View PDF application / Gweld y cais PDF",
];

const fl401TaskLinks: string[] = [
  "Type of application / Math o gais",
  "Applicant details / Manylion y ceisydd",
  "Upload documents / Uwchlwytho dogfennau",
];

test.describe("Create case initial journey tests", (): void => {
  test.describe.configure({ mode: "default" });

  test(`Create a C100 case as a solicitor with the following options:
  Accessibility testing,
  Error message testing, @smoke @regression @accessibility @errorMessage`, async ({
    solicitor,
  }): Promise<void> => {
    const {
      caseFilterPage,
      typeOfApplicationPage,
      c100ConfidentialityStatementPage,
      c100CaseNamePage,
    } = solicitor.createCase;

    await caseFilterPage.goToPage();
    await caseFilterPage.assertPageContents();
    await caseFilterPage.verifyAccessibility();
    await caseFilterPage.selectSolicitorApplication();
    await caseFilterPage.clickStart();

    await typeOfApplicationPage.assertPageContents();
    await typeOfApplicationPage.verifyAccessibility();
    await typeOfApplicationPage.assertValidationError(
      typeOfApplicationPage.fieldRequiredError,
    );
    await typeOfApplicationPage.selectCaseType("C100");
    await typeOfApplicationPage.clickContinue();

    await c100ConfidentialityStatementPage.assertPageContents();
    await c100ConfidentialityStatementPage.verifyAccessibility();
    await c100ConfidentialityStatementPage.assertValidationError(
      c100ConfidentialityStatementPage.fieldRequiredError,
    );
    await c100ConfidentialityStatementPage.confirmStatementUnderstood();
    await c100ConfidentialityStatementPage.clickContinue();

    await c100CaseNamePage.assertPageContents();
    await c100CaseNamePage.verifyAccessibility();
    await c100CaseNamePage.clickSaveAndContinue();

    await assertCaseCreated(solicitor, c100TaskLinks);
  });

  test(`Create an FL401 case as a solicitor with the following options:
  Accessibility testing,
  Error message testing,
  Case received from CourtNav, @smoke @regression @accessibility @errorMessage`, async ({
    solicitor,
  }): Promise<void> => {
    const {
      caseFilterPage,
      typeOfApplicationPage,
      fl401ConfidentialityStatementPage,
      selectFamilyCourtPage,
      fl401CaseNamePage,
    } = solicitor.createCase;

    await caseFilterPage.goToPage();
    await caseFilterPage.assertPageContents();
    await caseFilterPage.verifyAccessibility();
    await caseFilterPage.selectSolicitorApplication();
    await caseFilterPage.clickStart();

    await typeOfApplicationPage.assertPageContents();
    await typeOfApplicationPage.verifyAccessibility();
    await typeOfApplicationPage.selectCaseType("FL401");
    // Selecting FL401 reveals a second, mandatory CourtNav question.
    await typeOfApplicationPage.assertCourtNavQuestion();
    await typeOfApplicationPage.assertValidationError(
      typeOfApplicationPage.courtNavRequiredError,
    );
    await typeOfApplicationPage.selectReceivedFromCourtNav();
    await typeOfApplicationPage.clickContinue();

    await fl401ConfidentialityStatementPage.assertPageContents();
    await fl401ConfidentialityStatementPage.verifyAccessibility();
    await fl401ConfidentialityStatementPage.assertValidationError(
      fl401ConfidentialityStatementPage.fieldRequiredError,
    );
    await fl401ConfidentialityStatementPage.confirmStatementUnderstood();
    await fl401ConfidentialityStatementPage.clickContinue();

    await selectFamilyCourtPage.assertPageContents("FL401");
    await selectFamilyCourtPage.verifyAccessibility();
    await selectFamilyCourtPage.selectFamilyCourt();
    await selectFamilyCourtPage.clickContinue();

    await fl401CaseNamePage.assertPageContents();
    await fl401CaseNamePage.verifyAccessibility();
    await fl401CaseNamePage.clickSaveAndContinue();

    await assertCaseCreated(solicitor, fl401TaskLinks);
  });
});

async function assertCaseCreated(
  solicitor: SolicitorPagesGroup,
  taskLinks: string[],
): Promise<void> {
  const { tasksPage } = solicitor;

  await tasksPage.caseHeader.assertCaseHeaderIsVisible();
  await tasksPage.goToPage();
  await tasksPage.assertTaskLinksVisible(taskLinks);
}
