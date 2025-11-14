import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import {
  JudgeOrMagistrateTitles,
  JudgeOrMagistrateTitlesArray,
  OrderTypes,
} from "../../../../../common/types.js";
import { Selectors } from "../../../../../common/selectors.js";

interface DayMonthYear {
  day: string;
  month: string;
  year: string;
}

interface DraftAnOrderParams {
  isOrderByConsent: boolean;
  wasOrderApprovedAtAHearing: boolean;
  hearing?: string; // No hearings available is a valid hearing
  judgeOrMagistratesTitle?: JudgeOrMagistrateTitles;
  judgeFullName?: string;
  justicesLegalAdviserFullName?: string;
  dateOrderMade?: DayMonthYear; // this is autofilled to today's date
  isOrderAboutTheChildren: boolean;
  allChildrenInOrder?: string[];
  recitalsAndPreamble?: string;
  directions?: string;
}

export class DraftAnOrder4Page extends EventPage {
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

  constructor(page: Page) {
    super(page, "Draft an order");
  }

  async assertPageContents(orderType: OrderTypes): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.page.getByText(orderType)).toBeVisible();
    await expect(this.consentLabel).toBeVisible();
    await this.checkStrings(
      `#isTheOrderByConsent ${Selectors.GovukFormLabel}`,
      this.yesAndNoLabels,
    );
    await expect(this.approvedAtHearingLabel).toBeVisible();
    await this.checkStrings(
      `#wasTheOrderApprovedAtHearing ${Selectors.GovukFormLabel}`,
      this.yesAndNoLabels,
    );
    await expect(this.orderMadeByParagraph).toBeVisible();
    await expect(this.judgeOrMagistratesTitle).toBeVisible();
    await expect(this.amendTitleLabel).toBeVisible();
    await this.checkStrings(
      Selectors.GovukFormLabel,
      JudgeOrMagistrateTitlesArray,
    );
    await expect(this.judgeFullNameLabel).toBeVisible();
    await expect(this.justicesLegalAdviserFullNameLabel).toBeVisible();
    await expect(this.dateOrderMadeLabel).toBeVisible();
    await this.checkStrings(
      `#dateOrderMade ${Selectors.GovukFormLabel}`,
      this.dayMonthYearLabels,
    );
    await expect(this.orderAboutChildrenLabel).toBeVisible();
    await expect(this.recitalsOrPreamblesLabel).toBeVisible();
    await expect(this.directionsLabel).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async fillInFields({
    isOrderByConsent,
    wasOrderApprovedAtAHearing,
    judgeOrMagistratesTitle,
    judgeFullName,
    justicesLegalAdviserFullName,
    dateOrderMade,
    isOrderAboutTheChildren,
    recitalsAndPreamble,
    directions,
    allChildrenInOrder,
    hearing,
  }: DraftAnOrderParams): Promise<void> {
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
    await this.page
      .getByRole("group", { name: "Is the order about the children?" })
      .getByLabel(isOrderAboutTheChildren ? "Yes" : "No")
      .check();

    // This may change based on C100 or FL401
    if (isOrderAboutTheChildren) {
      await expect(this.whichChildrenAreIncludedInTheOrderLabel).toBeVisible();
      // select all children by default - this functionality can be changed in the future if required
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
          "If the order is about the children then ou need to pass in the children involved",
        );
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
