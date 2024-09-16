import { test } from "@playwright/test";
import { C100HearingUrgency } from "../../../../journeys/manageCases/createCase/C100HearingUrgency/C100HearingUrgency";

test.describe("C100 Create case hearing urgency tests @manageCases", (): void => {
  test(`Complete the C100 hearing urgency event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options, @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await C100HearingUrgency.c100HearingUrgency(
      page,
      "solicitor",
      false,
      false,
      true,
      true,
    );
  });

  test(`Complete the C100 hearing urgency event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options,`, async ({ page }): Promise<void> => {
    await C100HearingUrgency.c100HearingUrgency(
      page,
      "solicitor",
      false,
      false,
      false,
      true,
    );
  });

  test(`Complete the C100 hearing urgency event as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Saying yes to all options, @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await C100HearingUrgency.c100HearingUrgency(
      page,
      "solicitor",
      false,
      true,
      false,
      true,
    );
  });
});

test(`Accessibility test the C100 hearing urgency event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying yes to all options, @accessibilityManageCases`, async ({
  page,
}): Promise<void> => {
  await C100HearingUrgency.c100HearingUrgency(
    page,
    "solicitor",
    true,
    false,
    true,
    true,
  );
});
