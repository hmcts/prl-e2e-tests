import { test } from "@playwright/test";
import Config from "../../../../config";
import { C100AllegationsOfHarm } from "../../../../journeys/manageCases/createCase/C100AllegationsOfHarm/c100AllegationsOfHarm";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("C100 Create case Allegations of harm tests ", (): void => {
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
      subJourney: true,
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
      subJourney: true,
      c100DomesticAbuseTypePage3: "Psychological abuse",
    });
  });

  test(`Complete the C100 allegations of harm event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Setting the abuse type to Emotional. @regression`, async ({ page }): Promise<void> => {
    await C100AllegationsOfHarm.c100AllegationsOfHarm({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100YesNoAllegationsOfHarm: true,
      subJourney: true,
      c100DomesticAbuseTypePage3: "Emotional abuse",
    });
  });

  test(`Complete the C100 allegations of harm event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Setting the abuse type to Financial. @regression`, async ({ page }): Promise<void> => {
    await C100AllegationsOfHarm.c100AllegationsOfHarm({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100YesNoAllegationsOfHarm: true,
      subJourney: true,
      c100DomesticAbuseTypePage3: "Financial abuse",
    });
  });

  test(`Complete the C100 allegations of harm event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Setting the abuse type to Sexual. @regression`, async ({ page }): Promise<void> => {
    await C100AllegationsOfHarm.c100AllegationsOfHarm({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100YesNoAllegationsOfHarm: true,
      subJourney: true,
      c100DomesticAbuseTypePage3: "Sexual abuse",
    });
  });

  test(`Complete the C100 allegations of harm event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options. @regression @nightly`, async ({ page }): Promise<void> => {
    await C100AllegationsOfHarm.c100AllegationsOfHarm({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100YesNoAllegationsOfHarm: false,
      subJourney: true,
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
      subJourney: true,
    });
  });
});

test(`Accessibility test the C100 allegations of harm event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Setting the abuse type to Physical. @accessibility`, async ({
  page,
}): Promise<void> => {
  await C100AllegationsOfHarm.c100AllegationsOfHarm({
    page: page,
    accessibilityTest: true,
    errorMessaging: false,
    c100YesNoAllegationsOfHarm: true,
    subJourney: true,
    c100DomesticAbuseTypePage3: "Physical abuse",
  });
});
