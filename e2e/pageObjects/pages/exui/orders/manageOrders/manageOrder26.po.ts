import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { solicitorCaseCreateType } from "../../../../../common/types.js";
import { Selectors } from "../../../../../common/selectors.js";
import { PageUtils } from "../../../../../utils/page.utils.js";

export interface ManageOrder26Params {
  orderType: string;
  cafcassReport: boolean;
  cafcassInvolvement: boolean;
  localAuthorityReport: boolean;
  serveOrderNow: boolean;
  whatToDoWithOrder: string;
}

export class ManageOrder26Page extends EventPage {
  private readonly serveTheOrderHeading = this.page.getByRole("heading", {
    name: "When do you want to serve the order?",
  });

  private readonly orderTypeText = this.page.getByText(
    "What type of order is this?",
  );
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

  // Cafcass date fields
  private readonly reportDurationText = this.page
    .locator("#whenReportsMustBeFiled")
    .getByText("When must the reports be filed?", { exact: true });
  private readonly cafcassDateSection = this.page.locator(
    "#whenReportsMustBeFiled",
  );
  private readonly timeOptions: string[] = ["Day", "Month", "Year"];
  private readonly day = this.page.locator("#whenReportsMustBeFiled-day");
  private readonly month = this.page.locator("#whenReportsMustBeFiled-month");
  private readonly year = this.page.locator("#whenReportsMustBeFiled-year");

  // Local Authority section
  private readonly localAuthorityReportText = this.page.getByText(
    "Does local authority need to provide a report?",
  );
  private readonly localAuthorityDocText = this.page.getByText(
    "Local authority needs to produce the following documentation:",
  );
  private readonly localAuthorityDocOptions: string[] = [
    "Child Impact Report 1",
    "Child Impact Report 2",
    "Section 37 Report",
    "Section 7 Report",
    "Section 7 Addendum",
    "Local Authority Involvement Letter",
    "Section 47 Enquiry",
    "Other",
  ];

  // Local Authority date fields
  private readonly laReportDurationText = this.page
    .locator("#whenReportsMustBeFiledByLocalAuthority")
    .getByText("When must the reports be filed?", { exact: true });
  private readonly laDateSection = this.page.locator(
    "#whenReportsMustBeFiledByLocalAuthority",
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
      await expect(this.cafcassDocText).toBeVisible();
      await this.pageUtils.assertStrings(
        this.cafcassDocOptions,
        this.page.locator("#cafcassCymruDocuments"),
      );
      await expect(this.reportDurationText).toBeVisible();
      await this.pageUtils.assertStrings(
        this.timeOptions,
        this.cafcassDateSection,
      );
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

      // Local Authority section assertions — only assert always-visible elements;
      // the doc list and date fields are hidden until Yes is selected
      await expect(this.localAuthorityReportText).toBeVisible();
      await this.pageUtils.assertStrings(
        this.yesAndNoLabels,
        this.page.locator(
          `#localAuthorityNeedToProvideReport ${Selectors.GovukFormLabel}`,
        ),
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
    await this.page.getByRole("combobox").selectOption(params.orderType);
    await this.selectRadioById("doYouWantToServeOrder", params.serveOrderNow);

    if (caseType === "C100") {
      await this.page
        .getByRole("group", {
          name: "Does Cafcass or Cafcass Cymru need to provide a report?",
        })
        .getByLabel(params.cafcassReport ? "Yes" : "No")
        .check();

      if (params.cafcassReport) {
        const cafcassCymruSection = this.page.locator("#cafcassCymruDocuments");
        for (const cafcassReportName of this.cafcassDocOptions) {
          const cafcassReportCheckbox: Locator = cafcassCymruSection.getByRole(
            "checkbox",
            {
              name: cafcassReportName,
              exact: true,
            },
          );
          await cafcassReportCheckbox.check();
        }
        await this.day.fill("12");
        await this.month.fill("12");
        await this.year.fill("2026");
      }
    }
    // Local Authority section
    await this.page
      .getByRole("group", {
        name: "Does local authority need to provide a report?",
      })
      .getByLabel(params.localAuthorityReport ? "Yes" : "No")
      .check();

    if (params.localAuthorityReport) {
      const localAuthoritySection = this.page.locator(
        "#localAuthorityMultipleDocuments",
      );
      for (const laDocName of this.localAuthorityDocOptions) {
        const laCheckbox: Locator = localAuthoritySection.getByRole(
          "checkbox",
          {
            name: laDocName,
            exact: true,
          },
        );
        await laCheckbox.check();
      }
      await this.laDay.fill("12");
      await this.laMonth.fill("12");
      await this.laYear.fill("2026");

      // Set cafcass involvement last — selecting LA Yes above can trigger
      // an Angular re-render that resets this radio, so it must be set after
      // all other interactions are complete
      await this.selectRadioById(
        "orderEndsInvolvementOfCafcassOrCymru",
        params.cafcassInvolvement,
      );
    }

    if (!params.serveOrderNow) {
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

    // Wait for the actual option to exist and be interactable
    await expect(input).toBeVisible();
    await expect(label).toBeVisible();

    // Click label (more reliable than clicking input in your DOM)
    await label.click();
  }
}
