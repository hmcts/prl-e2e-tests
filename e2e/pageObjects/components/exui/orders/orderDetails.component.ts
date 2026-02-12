import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import {
  JudgeOrMagistrateTitles,
  JudgeOrMagistrateTitlesArray,
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../common/types.js";
import { PageUtils } from "../../../../utils/page.utils.js";

interface DayMonthYear {
  day: string;
  month: string;
  year: string;
}

export interface Order5Params {
  orderType: OrderTypes;
  isOrderByConsent: boolean;
  wasOrderApprovedAtAHearing: boolean;
  hearing?: string; // No hearings available is a valid hearing
  judgeOrMagistratesTitle?: JudgeOrMagistrateTitles;
  judgeFullName?: string;
  justicesLegalAdviserFullName?: string;
  dateOrderMade?: DayMonthYear; // this is autofilled to today's date
  isOrderAboutTheChildren?: boolean;
  isOrderAboutAllTheChildren?: boolean;
  allChildrenInOrder?: string[];
  recitalsAndPreamble?: string;
  directions?: string;
}

export class OrderDetailsComponent {
  private readonly consentLabel: Locator = this.page.getByText(
    "Is the order by consent?",
  );
  private readonly yesAndNoLabels: string[] = ["Yes", "No"];
  private readonly approvedAtHearingLabel: Locator = this.page.getByText(
    "Was the order approved at a hearing?",
  );
  private readonly orderMadeByParagraph: Locator =
    this.page.getByText("Order made by");
  private readonly judgeOrMagistratesTitle: Locator = this.page.getByText(
    "Judge or Magistrate's title",
  );
  private readonly amendTitleLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText:
        "Select or amend the title of the Judge or magistrate (Optional)",
    },
  );
  private readonly judgeFullNameLabel: Locator = this.page.getByText(
    "Judge's full name (Optional)",
  );
  private readonly justicesLegalAdviserFullNameLabel: Locator =
    this.page.getByText("Full name of Justices' Legal Adviser (Optional)");
  private readonly dateOrderMadeLabel: Locator = this.page.getByText(
    "Date order made (Optional)",
  );
  private readonly dayMonthYearLabels: string[] = ["Day", "Month", "Year"];
  private readonly orderAboutChildrenLabel: Locator = this.page.getByText(
    "Is the order about the children?",
  );
  private readonly orderAboutAllTheChildrenLabel: Locator = this.page.getByText(
    "Is the order about all the children?",
  );
  private readonly recitalsOrPreamblesLabel: Locator = this.page.getByText(
    "Add recitals or preamble (Optional)",
  );
  private readonly directionsLabel: Locator = this.page.getByText(
    "Add directions (Optional)",
  );
  private readonly whichChildrenAreIncludedInTheOrderLabel: Locator =
    this.page.getByText("Which children are included in the order?");
  private readonly whichHearingWasOrderApprovedLabel: Locator =
    this.page.getByText("At which hearing was the order approved?");

  //ManageOrders specific labels
  private readonly amendTitleLabel1: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Select or amend the title of the Judge or magistrate",
    },
  );
  private readonly judgeFullNameLabel1: Locator =
    this.page.getByText("Judge's full name");
  private readonly dateOrderMadeLabel1: Locator =
    this.page.getByText("Date order made");

  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  constructor(private page: Page) {}

  async assertOrderPageContents(
    caseType: solicitorCaseCreateType,
    orderType: OrderTypes,
    orderJourneyType: string,
  ): Promise<void> {
    await expect(this.page.getByText(orderType)).toBeVisible();
    await expect(this.consentLabel).toBeVisible();
    await this.pageUtils.assertStrings(
      this.yesAndNoLabels,
      this.page.locator(`#isTheOrderByConsent ${Selectors.GovukFormLabel}`),
    );
    await expect(this.approvedAtHearingLabel).toBeVisible();
    await this.pageUtils.assertStrings(
      this.yesAndNoLabels,
      this.page.locator(
        `#wasTheOrderApprovedAtHearing ${Selectors.GovukFormLabel}`,
      ),
    );
    await expect(this.orderMadeByParagraph).toBeVisible();
    await expect(this.judgeOrMagistratesTitle).toBeVisible();
    await this.pageUtils.assertStrings(JudgeOrMagistrateTitlesArray);
    await expect(this.justicesLegalAdviserFullNameLabel).toBeVisible();

    await this.pageUtils.assertStrings(
      this.dayMonthYearLabels,
      this.page.locator(`#dateOrderMade ${Selectors.GovukFormLabel}`),
    );
    if (orderJourneyType === "manageOrder") {
      await expect(this.amendTitleLabel1).toBeVisible();
      await expect(this.judgeFullNameLabel1).toBeVisible();
      await expect(this.dateOrderMadeLabel1).toBeVisible();
    } else {
      await expect(this.amendTitleLabel).toBeVisible();
      await expect(this.judgeFullNameLabel).toBeVisible();
      await expect(this.dateOrderMadeLabel).toBeVisible();
    }
    // if order is DA then check one label if order is CA then check another
    if (caseType === "C100") {
      await expect(this.orderAboutAllTheChildrenLabel).toBeVisible();
    } else {
      await expect(this.orderAboutChildrenLabel).toBeVisible();
    }
    await expect(this.recitalsOrPreamblesLabel).toBeVisible();
    await expect(this.directionsLabel).toBeVisible();
  }

  async fillInFields(
    caseType: solicitorCaseCreateType,
    {
      isOrderByConsent,
      wasOrderApprovedAtAHearing,
      judgeOrMagistratesTitle,
      judgeFullName,
      justicesLegalAdviserFullName,
      dateOrderMade,
      isOrderAboutTheChildren,
      isOrderAboutAllTheChildren,
      recitalsAndPreamble,
      directions,
      allChildrenInOrder,
      hearing,
    }: Order5Params,
  ): Promise<void> {
    await this.page
      .getByRole("group", { name: "Is the order by consent?" })
      .getByLabel(isOrderByConsent ? "Yes" : "No")
      .check();
    await this.page
      .getByRole("group", { name: "Was the order approved at a" })
      .getByLabel(wasOrderApprovedAtAHearing ? "Yes" : "No")
      .check();
    if (wasOrderApprovedAtAHearing) {
      await expect(this.whichHearingWasOrderApprovedLabel).toBeVisible();
      await this.page.getByRole("combobox").selectOption(hearing);
    }
    if (judgeOrMagistratesTitle) {
      await this.page
        .getByRole("radio", { name: judgeOrMagistratesTitle })
        .check();
    }
    if (judgeFullName) {
      await this.page
        .getByRole("textbox", { name: "Judge's full name (Optional)" })
        .fill(judgeFullName);
    }
    if (justicesLegalAdviserFullName) {
      await this.page
        .getByRole("textbox", {
          name: "Full name of Justices' Legal Adviser (Optional)",
        })
        .fill(justicesLegalAdviserFullName);
    }
    if (dateOrderMade) {
      await this.page
        .getByRole("textbox", { name: "Day" })
        .fill(dateOrderMade.day);
      await this.page
        .getByRole("textbox", { name: "Month" })
        .fill(dateOrderMade.month);
      await this.page
        .getByRole("textbox", { name: "Year" })
        .fill(dateOrderMade.year);
    }

    // this section is specific to FL401 or C100 orders
    if (caseType === "FL401") {
      await this.page
        .getByRole("group", { name: "Is the order about the children?" })
        .getByLabel(isOrderAboutTheChildren ? "Yes" : "No")
        .check();
      if (isOrderAboutTheChildren) {
        await expect(
          this.whichChildrenAreIncludedInTheOrderLabel,
        ).toBeVisible();
        if (allChildrenInOrder) {
          for (const child of allChildrenInOrder) {
            const childCheckbox: Locator = this.page.getByRole("checkbox", {
              name: child,
            });
            await expect(this.page.getByText(child)).toBeVisible();
            await childCheckbox.check();
          }
        } else {
          throw new Error(
            "If the order is about the children then you need to pass in the children involved",
          );
        }
      }
    } else {
      await this.page
        .getByRole("group", { name: "Is the order about all the children?" })
        .getByLabel(isOrderAboutAllTheChildren ? "Yes" : "No")
        .check();
      if (!isOrderAboutAllTheChildren) {
        await expect(
          this.whichChildrenAreIncludedInTheOrderLabel,
        ).toBeVisible();
        if (allChildrenInOrder) {
          for (const child of allChildrenInOrder) {
            const childCheckbox: Locator = this.page.getByRole("checkbox", {
              name: child,
            });
            await expect(this.page.getByText(child)).toBeVisible();
            await childCheckbox.check();
          }
        } else {
          throw new Error(
            "If the order is not about all the children then you need to pass in the children involved",
          );
        }
      }
    }

    if (recitalsAndPreamble) {
      await this.page
        .getByRole("textbox", {
          name: "Add recitals or preamble (Optional)",
        })
        .fill(recitalsAndPreamble);
    }
    if (directions) {
      await this.page
        .getByRole("textbox", {
          name: "Add directions (Optional)",
        })
        .fill(directions);
    }
  }
}
