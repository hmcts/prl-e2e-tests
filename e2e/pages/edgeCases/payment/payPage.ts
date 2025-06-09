import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../common/commonStaticText.ts";
import { Helpers } from "../../../common/helpers.ts";
import { Selectors } from "../../../common/selectors.ts";
import { PayContent } from "../../../fixtures/edgeCases/payment/payContent.ts";
import { AxeUtils } from "@hmcts/playwright-common";

interface PayPageOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface FormattedExpiryDateType {
  month: string;
  year: string;
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
  }: PayPageOptions): Promise<void> {
    const formattedExpiryDateString = Helpers.getFormattedCardExpiryDate(
      10,
      new Date().getFullYear() + 2,
    );
    const [month, year] = formattedExpiryDateString.split("/");
    const formattedExpiryDate: FormattedExpiryDateType = { month, year };

    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await this.fillInFields(page, formattedExpiryDate);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${PayContent.pageTitle}")`,
    );
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(
    page: Page,
    formattedExpiryDate: FormattedExpiryDateType,
  ): Promise<void> {
    await page.fill(`${inputIds.card_no}`, PayContent.mockCardNumber);
    await page.fill(`${inputIds.expiry_month}`, formattedExpiryDate.month);
    await page.fill(`${inputIds.expiry_year}`, formattedExpiryDate.year);
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
