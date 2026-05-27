import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { solicitorCaseCreateType } from "../../../../../common/types.js";
import { Selectors } from "../../../../../common/selectors.js";
import { PageUtils } from "../../../../../utils/page.utils.js";

export interface DateParams {
  day: string;
  month: string;
  year: string;
}

export interface ManageOrder26Params {
  orderType: string;
  cafcassReport: boolean | undefined;
  cafcassInvolvement: boolean | undefined;
  serveOrderNow: boolean;
  whatToDoWithOrder: string | undefined;
  localAuthorityReport: boolean | undefined;
  cafcassReportDate?: DateParams;
  localAuthorityReportDate?: DateParams;
}

export class ManageOrder26Page extends EventPage {
  private readonly serveTheOrderHeading = this.page.getByRole("heading", {
    name: "When do you want to serve the order?",
  });

  private readonly orderTypeLabel = "What type of order is this?";
  private readonly orderTypeText = this.page.getByText(this.orderTypeLabel);

  private readonly serveOrderNowText = this.page.getByText(
    "Do you want to serve the order now?",
  );
  private readonly cafcassReportText = this.page.getByText(
    "Does Cafcass or Cafcass Cymru need to provide a report?",
  );
  private readonly cafcassDocText = this.page.getByText(
    "Cafcass or Cafcass Cymru needs to produce the following documentation:",
  );
  private readonly cafcassInvolvementText = this.page.getByText(
    "Does this order end the involvement of Cafcass or Cafcass Cymru in this case?",
  );
  private readonly cafcassDocOptions: string[] = [
    "Child Impact Report 1",
    "Child Impact Report 2",
    "Safeguarding letter",
    "Section 7 report",
    "S7 addendum report",
    "16.4 report",
    "Update to safeguarding letter",
    "S16A risk assessment",
    "Child Impact report",
    "Other reports",
  ];

  private readonly cafcassCymruDocumentsContainer = this.page.locator(
    "#cafcassCymruDocuments",
  );

  private readonly localAuthorityReportNeededText = this.page.getByText(
    "Does local authority need to provide a report?",
  );

  private readonly localAuthorityReportText = this.page.getByText(
    "Local authority needs to produce the following documentation:",
  );

  private readonly localAuthorityReportOptions: string[] = [
    "Child Impact Report 1",
    "Child Impact Report 2",
    "Section 37 Report",
    "Section 7 Report",
    "Section 7 Addendum",
    "Local Authority Involvement Letter",
    "Section 47 Enquiry",
    "Other",
  ];

  private readonly localAuthorityDocumentsContainer = this.page.locator(
    "#localAuthorityMultipleDocuments",
  );

  private readonly cafcassReportDurationText = this.page
    .locator("#whenReportsMustBeFiled")
    .getByText("When must the reports be filed?");

  private readonly laReportDurationText = this.page
    .locator("#whenReportsMustBeFiledByLocalAuthority")
    .getByText("When must the reports be filed?");

  private readonly cafcassReportContainer = this.page.locator(
    "#whenReportsMustBeFiled",
  );

  private readonly laReportContainer = this.page.locator(
    "#whenReportsMustBeFiledByLocalAuthority",
  );

  private readonly timeOptions: string[] = ["Day", "Month", "Year"];
  private readonly cafcassDay = this.page.locator(
    "#whenReportsMustBeFiled-day",
  );
  private readonly cafcassMonth = this.page.locator(
    "#whenReportsMustBeFiled-month",
  );
  private readonly cafcassYear = this.page.locator(
    "#whenReportsMustBeFiled-year",
  );

  private readonly laDay = this.page.locator(
    "#whenReportsMustBeFiledByLocalAuthority-day",
  );
  private readonly laMonth = this.page.locator(
    "#whenReportsMustBeFiledByLocalAuthority-month",
  );
  private readonly laYear = this.page.locator(
    "#whenReportsMustBeFiledByLocalAuthority-year",
  );

  private readonly orderOptionsFormLabels: string[] = [
    "What would you like to do with the order?",
    "Finalise the order, and save to serve later",
    "Save the order as a draft",
  ];

  private readonly yesAndNoLabels: string[] = ["Yes", "No"];

  constructor(page: Page) {
    super(page, "Manage orders");
  }

  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  async assertPageContents(caseType: solicitorCaseCreateType): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.serveTheOrderHeading).toBeVisible();
    await expect(this.orderTypeText).toBeVisible();

    if (caseType === "C100") {
      await expect(this.cafcassReportText).toBeVisible();
      await expect(this.localAuthorityReportNeededText).toBeVisible();
      await expect(this.cafcassInvolvementText).toBeVisible();

      await this.pageUtils.assertStrings(
        this.yesAndNoLabels,
        this.page.locator(
          `#cafcassOrCymruNeedToProvideReport ${Selectors.GovukFormLabel}`,
        ),
      );
      await this.pageUtils.assertStrings(
        this.yesAndNoLabels,
        this.page.locator(
          `#orderEndsInvolvementOfCafcassOrCymru ${Selectors.GovukFormLabel}`,
        ),
      );
      await this.pageUtils.assertStrings(
        this.yesAndNoLabels,
        this.page.locator(`#doYouWantToServeOrder ${Selectors.GovukFormLabel}`),
      );
    }
    await expect(this.serveOrderNowText).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectServeOrderOptions(
    caseType: solicitorCaseCreateType,
    params: ManageOrder26Params,
  ): Promise<void> {
    await this.page
      .getByLabel(this.orderTypeLabel)
      .selectOption(params.orderType);
    await this.selectRadioById("doYouWantToServeOrder", params.serveOrderNow);

    if (caseType === "C100") {
      if (params.cafcassReport !== undefined) {
        await this.page
          .getByRole("group", {
            name: "Does Cafcass or Cafcass Cymru need to provide a report?",
          })
          .getByLabel(params.cafcassReport ? "Yes" : "No")
          .check();

        if (params.cafcassReport) {
          await expect(this.cafcassDocText).toBeVisible();
          await expect(this.cafcassReportDurationText).toBeVisible();
          await this.pageUtils.assertStrings(
            this.timeOptions,
            this.cafcassReportContainer,
          );
          for (const cafcassReportName of this.cafcassDocOptions) {
            const cafcassReportCheckbox: Locator =
              this.cafcassCymruDocumentsContainer.getByRole("checkbox", {
                name: cafcassReportName,
                exact: true,
              });
            await cafcassReportCheckbox.check();
          }
          const date = params.cafcassReportDate || {
            day: "01",
            month: "01",
            year: "2035",
          };
          await this.cafcassDay.fill(date.day);
          await this.cafcassMonth.fill(date.month);
          await this.cafcassYear.fill(date.year);
        }
      }

      if (params.localAuthorityReport !== undefined) {
        await this.page
          .getByRole("group", {
            name: "Does local authority need to provide a report?",
          })
          .getByLabel(params.localAuthorityReport ? "Yes" : "No")
          .check();

        if (params.localAuthorityReport) {
          await expect(this.localAuthorityReportText).toBeVisible();
          await expect(this.laReportDurationText).toBeVisible();
          await this.pageUtils.assertStrings(
            this.timeOptions,
            this.laReportContainer,
          );
          for (const localAuthorityReportName of this
            .localAuthorityReportOptions) {
            const localAuthorityReportCheckbox: Locator =
              this.localAuthorityDocumentsContainer.getByRole("checkbox", {
                name: localAuthorityReportName,
                exact: true,
              });
            await localAuthorityReportCheckbox.check();
          }

          // Parameterized dates with fallback
          const date = params.localAuthorityReportDate || {
            day: "01",
            month: "01",
            year: "2035",
          };
          await this.laDay.fill(date.day);
          await this.laMonth.fill(date.month);
          await this.laYear.fill(date.year);
        }
      }

      if (params.cafcassInvolvement !== undefined) {
        await this.selectRadioById(
          "orderEndsInvolvementOfCafcassOrCymru",
          params.cafcassInvolvement,
        );
      }
    }

    if (!params.serveOrderNow && params.whatToDoWithOrder) {
      await this.pageUtils.assertStrings(this.orderOptionsFormLabels);
      await this.page
        .getByRole("radio", { name: params.whatToDoWithOrder })
        .check();
    }
  }

  private async selectRadioById(baseId: string, flag: boolean): Promise<void> {
    const optionId = `${baseId}_${flag ? "Yes" : "No"}`;

    const input = this.page.locator(`#${optionId}`);
    const label = this.page.locator(`label[for="${optionId}"]`);

    await expect(input).toBeVisible();
    await expect(label).toBeVisible();

    await label.click();
  }
}
