import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { solicitorCaseCreateType } from "../../../../../common/types.js";
import { Selectors } from "../../../../../common/selectors.js";
import { PageUtils } from "../../../../../utils/page.utils.js";

export interface ManageOrder26Params {
  orderType: string;
  cafcassReport: boolean;
  cafcassInvolvement: boolean;
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

  private readonly reportDurationText = this.page.getByText(
    "When must the reports be filed?",
  );
  private readonly timeOptions: string[] = ["Day", "Month", "Year"];
  private readonly day = this.page.locator("#whenReportsMustBeFiled-day");
  private readonly month = this.page.locator("#whenReportsMustBeFiled-month");
  private readonly year = this.page.locator("#whenReportsMustBeFiled-year");

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
      await this.pageUtils.assertStrings(this.cafcassDocOptions);
      await expect(this.reportDurationText).toBeVisible();
      await this.pageUtils.assertStrings(this.timeOptions);
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
        for (const cafcassReportName of this.cafcassDocOptions) {
          const cafcassReportCheckbox: Locator = this.page.getByRole(
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
