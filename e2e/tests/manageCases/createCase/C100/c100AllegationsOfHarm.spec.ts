import { test } from "@playwright/test";
import { C100AllegationsOfHarm } from "../../../../journeys/manageCases/createCase/C100AllegationsOfHarm/c100AllegationsOfHarm";
import { SolicitorCreateInitial } from "../../../../journeys/manageCases/createCase/solicitorCreateInitial.ts";
import { C100ChildDetails } from "../../../../journeys/manageCases/createCase/C100ChildDetails/c100ChildDetails.ts";
import { C100ApplicantDetails } from "../../../../journeys/manageCases/createCase/C100ApplicantDetails/c100ApplicantDetails.ts";

test.describe("C100 Create case Allegations of harm tests", (): void => {
  test.beforeEach(async ({ page }) => {
    await SolicitorCreateInitial.createUserAndCase({
      page,
      solicitorCaseType: "C100",
    });
    //must complete applicant details and child details before allegations of harm
    await C100ApplicantDetails.C100ApplicantDetails({
      page,
      accessibilityTest: false,
      errorMessaging: false,
      yesNoApplicantDetails: true,
      applicantGender: "male",
    });
    await C100ChildDetails.c100ChildDetails({
      page: page,
      accessibilityTest: false,
      c100ChildGender: "male",
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: "yes",
    });
  });
  test(`Complete the C100 allegations of harm event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Setting the abuse type to Physical @regression`, async ({
    page,
  }): Promise<void> => {
    await C100AllegationsOfHarm.c100AllegationsOfHarm({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100YesNoAllegationsOfHarm: true,
      c100DomesticAbuseTypePage3: "Physical abuse",
    });
  });

  test(`Complete the C100 allegations of harm event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Setting the abuse type to Psychological. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100AllegationsOfHarm.c100AllegationsOfHarm({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100YesNoAllegationsOfHarm: true,
      c100DomesticAbuseTypePage3: "Psychological abuse",
    });
  });

  test(`Complete the C100 allegations of harm event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Setting the abuse type to Emotional. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100AllegationsOfHarm.c100AllegationsOfHarm({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100YesNoAllegationsOfHarm: true,
      c100DomesticAbuseTypePage3: "Emotional abuse",
    });
  });

  test(`Complete the C100 allegations of harm event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Setting the abuse type to Financial. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100AllegationsOfHarm.c100AllegationsOfHarm({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100YesNoAllegationsOfHarm: true,
      c100DomesticAbuseTypePage3: "Financial abuse",
    });
  });

  test(`Complete the C100 allegations of harm event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Setting the abuse type to Sexual. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100AllegationsOfHarm.c100AllegationsOfHarm({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100YesNoAllegationsOfHarm: true,
      c100DomesticAbuseTypePage3: "Sexual abuse",
    });
  });

  test(`Complete the C100 allegations of harm event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options. @regression`, async ({ page }): Promise<void> => {
    await C100AllegationsOfHarm.c100AllegationsOfHarm({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100YesNoAllegationsOfHarm: false,
      c100DomesticAbuseTypePage3: "Sexual abuse",
    });
  });

  test(`Complete the C100 allegations of harm event as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Saying yes to all options,
  Setting the abuse type to Physical. @regression @errorMessage`, async ({
    page,
  }): Promise<void> => {
    await C100AllegationsOfHarm.c100AllegationsOfHarm({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      c100YesNoAllegationsOfHarm: true,
      c100DomesticAbuseTypePage3: "Physical abuse",
    });
  });
});

test(`C100 allegations of harm event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Setting the abuse type to Physical. @accessibility @nightly`, async ({
  page,
}): Promise<void> => {
  await C100AllegationsOfHarm.c100AllegationsOfHarm({
    page: page,
    accessibilityTest: true,
    errorMessaging: false,
    c100YesNoAllegationsOfHarm: true,
    c100DomesticAbuseTypePage3: "Physical abuse",
  });
});
