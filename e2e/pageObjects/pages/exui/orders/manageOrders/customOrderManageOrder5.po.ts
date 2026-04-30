import { EventPage } from "../../eventPage.po.ts";
import { expect, Locator, Page } from "@playwright/test";
import { DateHelperUtils } from "../../../../../utils/dateHelpers.utils.ts";
import { PageUtils } from "../../../../../utils/page.utils.ts";
import {
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../../common/types.ts";
import config from "../../../../../utils/config.utils.ts";

interface CustomOrdersManageOrder5PageParams {
  orderType: OrderTypes;
  isOrderByConsent: boolean;
  judgeOrMagistratesTitle?: string;
  judgeName?: string;
  legalAdviserName?: string;
  isOrderAboutChildren?: boolean;
  isOrderAboutAllTheChildren?: boolean;
  caseType: solicitorCaseCreateType;
}

// this page does use the same ManageOrders5 page in the backend but is significantly different so is a separate page
export class CustomOrdersManageOrder5Page extends EventPage {
  private readonly pageUtils: PageUtils = new PageUtils(this.page);
  private readonly dateUtils: DateHelperUtils = new DateHelperUtils();

  private readonly selectOrderNameLabel: Locator =
    this.page.getByText("Select order name");
  private readonly orderNames: string[] = [
    "Standard directions order",
    "Directions on issue",
    "Blank order or directions (C21)",
    "Child arrangements, specific issue or prohibited steps order (C43)",
    "Parental responsibility order (C45A)",
    "Special guardianship order (C43A)",
    "Notice of proceedings (C6) (Notice to parties)",
    "Notice of proceedings (C6a) (Notice to non-parties)",
    "Appointment of a guardian (C47A)",
    "Non-molestation order (FL404A)",
    "Occupation order (FL404)",
    "Power of arrest (FL406)",
    "Amended, discharged or varied order (FL404B)",
    "Blank order (FL404B)",
    "General form of undertaking (N117)",
    "Notice of proceedings (FL402)",
  ];
  private readonly uploadCustomOrderTemplateLabel: Locator =
    this.page.getByText("Upload custom order template (.docx only)");
  private readonly uploadOrderAdviceLabel: Locator = this.page.getByText(
    "Please upload a .docx file. Other formats will be rejected.",
  );
  private readonly uploadCustomOrderTemplateInput: Locator =
    this.page.locator("#customOrderDoc");
  private readonly cancelUploadButton: Locator = this.page.getByRole("button", {
    name: "Cancel upload",
  });
  private readonly isOrderByConsentLabel: Locator = this.page.getByText(
    "Is the order by consent?",
  );
  private readonly isOrderByConsentYesLabel: Locator = this.page
    .locator("#isTheOrderByConsent_radio")
    .getByText("Yes");
  private readonly isOrderByConsentNoLabel: Locator = this.page
    .locator("#isTheOrderByConsent_radio")
    .getByText("No", { exact: true });
  private readonly orderMadeByLabel: Locator =
    this.page.getByText("Order made by");
  private readonly judgeOrMagistrateLabel: Locator = this.page.getByText(
    "Select or amend the title of the Judge or magistrate",
  );
  private readonly judgeOrMagistratesTitles: string[] = [
    "Her Honour Judge",
    "His Honour Judge",
    "Circuit Judge",
    "Deputy Circuit Judge",
    "Recorder",
    "District Judge",
    "Deputy District Judge",
    "District Judge Magistrates Court",
    "Magistrates",
    "Justices' Legal Adviser",
    "Justices' Clerk",
    "The Honourable Mrs Justice",
    "The Honourable Mr Justice",
  ];
  private readonly judgesFullNameLabel: Locator =
    this.page.getByText("Judge's full name");
  private readonly judgeNameInput: Locator = this.page.getByRole("textbox", {
    name: "Judge's full name",
  });
  private readonly legalAdviserNameLabel: Locator = this.page.getByText(
    "Full name of Justices' Legal Adviser (Optional)",
  );
  private readonly legalAdviserNameInput: Locator = this.page.getByRole(
    "textbox",
    { name: "Full name of Justices' Legal Adviser" },
  );
  private readonly dateOrderMadeLabel: Locator =
    this.page.getByText("Date order made");
  private readonly dayLabel: Locator = this.page
    .locator("#dateOrderMade")
    .getByText("Day");
  private readonly monthLabel: Locator = this.page
    .locator("#dateOrderMade")
    .getByText("Month");
  private readonly yearLabel: Locator = this.page
    .locator("#dateOrderMade")
    .getByText("Year");
  private readonly dayInput: Locator = this.page
    .locator("#dateOrderMade")
    .getByRole("textbox", {
      name: "Day",
    });
  private readonly monthInput: Locator = this.page
    .locator("#dateOrderMade")
    .getByRole("textbox", {
      name: "Month",
    });
  private readonly yearInput: Locator = this.page
    .locator("#dateOrderMade")
    .getByRole("textbox", {
      name: "Year",
    });
  private readonly isOrderAboutChildrenLabel: Locator = this.page.getByText(
    "Is the order about the children?",
  );
  private readonly isOrderAboutChildrenYesLabel: Locator = this.page
    .locator("#isTheOrderAboutChildren_radio")
    .getByText("Yes");
  private readonly isOrderAboutChildrenNoLabel: Locator = this.page
    .locator("#isTheOrderAboutChildren_radio")
    .getByText("No");
  private readonly isOrderAboutAllTheChildrenLabel: Locator =
    this.page.getByText("Is the order about all the children?");
  private readonly isOrderAboutAllTheChildrenYesLabel: Locator = this.page
    .locator("#isTheOrderAboutAllChildren_radio")
    .getByText("Yes");
  private readonly isOrderAboutAllTheChildrenNoLabel: Locator = this.page
    .locator("#isTheOrderAboutAllChildren_radio")
    .getByText("No");

  constructor(page: Page) {
    super(page, "Manage orders");
  }

  async assertPageContents(caseType: solicitorCaseCreateType): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.selectOrderNameLabel).toBeVisible();
    await this.pageUtils.assertStrings(this.orderNames);
    await expect(this.uploadCustomOrderTemplateLabel).toBeVisible();
    await expect(this.uploadOrderAdviceLabel).toBeVisible();
    await expect(this.cancelUploadButton).toBeVisible();
    await expect(this.isOrderByConsentLabel).toBeVisible();
    await expect(this.isOrderByConsentYesLabel).toBeVisible();
    await expect(this.isOrderByConsentNoLabel).toBeVisible();
    await expect(this.orderMadeByLabel).toBeVisible();
    await expect(this.judgeOrMagistrateLabel).toBeVisible();
    await expect(this.judgeOrMagistrateLabel).toBeVisible();
    await this.pageUtils.assertStrings(this.judgeOrMagistratesTitles);
    // check judge title pre-selected
    await expect(
      this.page.getByRole("radio", { name: "Circuit Judge", exact: true }),
    ).toBeChecked();
    await expect(this.judgesFullNameLabel).toBeVisible();
    // check judge name pre-filled
    await expect(this.judgeNameInput).toHaveValue("Elizabeth Williams");
    await expect(this.legalAdviserNameLabel).toBeVisible();
    await expect(this.dateOrderMadeLabel).toBeVisible();
    await expect(this.dayLabel).toBeVisible();
    await expect(this.monthLabel).toBeVisible();
    await expect(this.yearLabel).toBeVisible();
    // check date pre-filled
    const todayDate: string[] = this.dateUtils.todayDate(
      false,
      true,
    ) as string[];
    await expect(this.dayInput).toHaveValue(todayDate[0]);
    await expect(this.monthInput).toHaveValue(todayDate[1]);
    await expect(this.yearInput).toHaveValue(todayDate[2]);
    if (caseType === "C100") {
      await expect(this.isOrderAboutAllTheChildrenLabel).toBeVisible();
      await expect(this.isOrderAboutAllTheChildrenYesLabel).toBeVisible();
      await expect(this.isOrderAboutAllTheChildrenNoLabel).toBeVisible();
    } else {
      await expect(this.isOrderAboutChildrenLabel).toBeVisible();
      await expect(this.isOrderAboutChildrenYesLabel).toBeVisible();
      await expect(this.isOrderAboutChildrenNoLabel).toBeVisible();
    }
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async fillInFields(
    params: CustomOrdersManageOrder5PageParams,
  ): Promise<void> {
    await this.page.getByRole("radio", { name: params.orderType }).check();
    await this.uploadCustomOrderTemplateInput.setInputFiles(
      config.testWordFile,
    );
    await expect(
      this.page.locator(".error-message", { hasText: "Uploading..." }),
    ).toBeHidden();
    await this.page
      .getByRole("group", { name: "Is the order by consent?" })
      .getByLabel(params.isOrderByConsent ? "Yes" : "No", { exact: true })
      .check();
    if (params.judgeOrMagistratesTitle) {
      await this.page
        .getByRole("radio", { name: params.judgeOrMagistratesTitle })
        .check();
    }
    if (params.judgeName) {
      await this.judgeNameInput.fill(params.judgeName);
    }
    if (params.legalAdviserName) {
      await this.legalAdviserNameInput.fill(params.legalAdviserName);
    }
    if (params.caseType === "C100") {
      if (typeof params.isOrderAboutAllTheChildren !== "undefined") {
        await this.page
          .getByRole("group", { name: "Is the order about all the children" })
          .getByLabel(params.isOrderAboutAllTheChildren ? "Yes" : "No", {
            exact: true,
          })
          .check();
      }
    } else {
      if (typeof params.isOrderAboutChildren !== "undefined") {
        await this.page
          .getByRole("group", { name: "Is the order about the children" })
          .getByLabel(params.isOrderAboutChildren ? "Yes" : "No", {
            exact: true,
          })
          .check();
      }
    }
  }
}
