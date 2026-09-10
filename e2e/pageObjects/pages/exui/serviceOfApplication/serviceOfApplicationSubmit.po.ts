import { expect, Locator, Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { solicitorCaseCreateType } from "../../../../common/types.ts";
import config from "../../../../utils/config.utils.ts";
import { PageUtils } from "../../../../utils/page.utils.ts";
import { CheckYourAnswersPage } from "../checkYourAnswers.po.ts";

export class ServiceOfApplicationSubmitPage extends CheckYourAnswersPage {
  private readonly pageUtils = new PageUtils(this.page);
  private readonly answersTable: Locator = this.page.locator(".form-table");

  constructor(page: Page) {
    super(page, "Service of application", CommonStaticText.saveAndContinue);
  }

  async assertServiceDetails(
    caseType: solicitorCaseCreateType,
    orderName: string,
    recipients?: string[],
  ): Promise<void> {
    await expect(
      this.page.getByRole("heading", {
        name: "Select and upload orders and documents to be served",
        exact: true,
      }),
    ).toBeVisible();
    await this.pageUtils.assertStrings(["Documents served in the pack"]);
    await expect(
      this.answersTable.locator('.text-16:text-is("Select orders")'),
    ).toBeVisible();
    await this.pageUtils.assertStrings(
      [
        caseType === "C100"
          ? "Special arrangements letter"
          : "Upload notice of safety letter",
      ],
      this.answersTable,
    );
    await expect(this.answersTable.getByText(orderName).first()).toBeVisible();
    await expect(
      this.answersTable.getByRole("button", {
        name: config.testPdfFile.split("/").pop(),
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      this.answersTable.locator('.text-16:text-is("Change"):visible'),
    ).toHaveCount(caseType === "C100" ? 6 : 3);

    if (caseType === "C100") {
      await expect(
        this.page.getByRole("heading", {
          name: "Select orders",
          exact: true,
          level: 3,
        }),
      ).toBeVisible();
    }

    if (recipients) {
      await this.pageUtils.assertStrings(
        ["Confirm Recipients", ...recipients],
        this.answersTable,
      );
    } else {
      await this.pageUtils.assertStrings(
        ["Who is responsible for serving the respondent?", "Court bailiff"],
        this.answersTable,
      );
    }
  }
}
