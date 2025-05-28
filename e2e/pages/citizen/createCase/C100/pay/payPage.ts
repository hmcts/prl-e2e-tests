import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { PayContent } from "../../../../../fixtures/citizen/createCase/C100/pay/payContent.ts";
import { CommonContent } from "../../../../../fixtures/manageCases/commonContent.ts";

interface PayPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

enum inputIds {
  card_no = "#card-no",
  expiry_month = "#expiry-month",
  expiry_year = "#expiry-year",
  cardholder_name = "#cardholder-name",
  cvc = "#cvc",
  address_line_1 = "#address-line-1",
  address_line_2 = "#address-line-2",
  address_city = "#address-city",
  address_postcode = "#address-postcode",
  email = "#email",
}

export class PayPage {
  public static async payPage({
    page,
    accessibilityTest,
    errorMessaging,
  }: PayPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${PayContent.pageTitle}")`,
    );
    const formattedExpiryDate = Helpers.getFormattedCardExpiryDate(
      10,
      new Date().getFullYear() + 2,
    );

    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `#card-details-wrap div div div h2:text-is("${PayContent.heading1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `#card-details > div:nth-child(7) > fieldset > legend > h2:text-is("${PayContent.heading2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `#card-details > div > fieldset > legend > h2:text-is("${PayContent.heading3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `#payment-description:text-is("${PayContent.body1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `#card-details-wrap > div > div > div > p.govuk-body:text-is("${PayContent.body2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBody}:text-is("${PayContent.body3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBody}:text-is("${PayContent.body4}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${PayContent.hint1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:has-text("${PayContent.hintDynamicDate}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:has-text("${formattedExpiryDate}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        PayContent,
        "label",
        `${Selectors.GovukLabel}`,
      ),
      Helpers.checkGroup(page, 11, PayContent, "span", `${Selectors.Span}`),
      Helpers.checkVisibleAndPresent(
        page,
        `#amount:text-is("${CommonContent.c100Fee}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      //   await new AxeUtils(page).audit(); / TODO: Pending accessibility PRL-6654
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${PayContent.errorSummary}")`,
        1,
      ),
      Helpers.checkGroup(page, 8, PayContent, "errorMessage", `${Selectors.a}`),
      Helpers.checkGroup(
        page,
        8,
        PayContent,
        "errorMessage",
        `${Selectors.GovukErrorMessageCitizen}`,
      ),
    ]);
    await page.reload();
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.fill(`${inputIds.card_no}`, PayContent.mockCardNumber);
    await page.fill(`${inputIds.expiry_month}`, PayContent.mockExpMonth);
    await page.fill(`${inputIds.expiry_year}`, PayContent.mockExpYear);
    await page.fill(`${inputIds.cardholder_name}`, PayContent.mockCardName);
    await page.fill(`${inputIds.cvc}`, PayContent.mockCVC);
    await page.fill(
      `${inputIds.address_line_1}`,
      PayContent.exampleAddressLine1,
    );
    await page.fill(
      `${inputIds.address_line_2}`,
      PayContent.exampleAddressLine2,
    );
    await page.fill(`${inputIds.address_city}`, PayContent.exampleTownOrCity);
    await page.fill(`${inputIds.address_postcode}`, PayContent.examplePostCode);
    await page.fill(`${inputIds.email}`, PayContent.exampleEmail);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
