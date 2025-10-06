import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import {
  JudgeOrMagistrateTitles,
  JudgeOrMagistrateTitlesArray,
  OrderTypes,
} from "../../../../../common/types.js";
import { Selectors } from "../../../../../common/selectors.js";
import { CommonStaticText } from "../../../../../common/commonStaticText.js";

interface DayMonthYear {
  day: string;
  month: string;
  year: string;
}

interface DraftAnOrderParams {
  isOrderByConsent: boolean;
  wasOrderApprovedAtAHearing: boolean;
  judgeOrMagistratesTitle?: JudgeOrMagistrateTitles;
  judgeFullName?: string;
  justicesLegalAdviserFullName?: string;
  dateOrderMade?: DayMonthYear; // this is autofilled to today's date
  isOrderAboutTheChildren: boolean;
  recitalsAndPreamble?: string;
  directions?: string;
  allChildrenInOrder?: string[];
  hearing?: string; // No hearings available is a valid hearing
}

export class DraftAnOrder4Page extends EventPage {
  private readonly consentLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    { hasText: "Is the order by consent?" },
  );
  private readonly yesAndNoLabels: string[] = ["Yes", "No"];
  private readonly approvedAtHearingLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    { hasText: "Was the order approved at a hearing?" },
  );
  private readonly orderMadeByParagraph: Locator = this.page.locator(
    Selectors.p,
    { hasText: "Order made by" },
  );
  private readonly judgeOrMagistratesTitle: Locator = this.page.locator(
    Selectors.p,
    { hasText: "Judge or Magistrate's title" },
  );
  private readonly amendTitleLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText:
        "Select or amend the title of the Judge or magistrate (Optional)",
    },
  );
  private readonly judgeFullNameLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Judge's full name (Optional)",
    },
  );
  private readonly justicesLegalAdviserFullNameLabel: Locator =
    this.page.locator(Selectors.GovukFormLabel, {
      hasText: "Full name of Justices' Legal Adviser (Optional)",
    });
  private readonly dateOrderMadeLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Date order made (Optional)",
    },
  );
  private readonly dayMonthYearLabels: string[] = ["Day", "Month", "Year"];
  private readonly orderAboutChildrenLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Is the order about the children?",
    },
  );
  private readonly recitalsOrPreamblesLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Add recitals or preamble (Optional)",
    },
  );
  private readonly directionsLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Add directions (Optional)",
    },
  );
  private readonly whichChildrenAreIncludedInTheOrderLabel: Locator =
    this.page.locator(Selectors.GovukFormLabel, {
      hasText: "Which children are included in the order?",
    });
  private readonly whichHearingWasOrderApprovedLabel: Locator =
    this.page.locator(Selectors.GovukFormLabel, {
      hasText: "At which hearing was the order approved?",
    });
  private readonly continueButton: Locator = this.page.locator(
    Selectors.button,
    {
      hasText: CommonStaticText.continue,
    },
  );
  private readonly previousButton: Locator = this.page.locator(
    Selectors.button,
    {
      hasText: CommonStaticText.previous,
    },
  );

  constructor(page: Page) {
    super(page, "Draft an order");
  }

  async assertPageContents(orderType: OrderTypes): Promise<void> {
    await this.assertPageHeadings();
    await expect(
      this.page.locator(Selectors.headingH3, { hasText: orderType }),
    ).toBeVisible();
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
      .locator("#isTheOrderByConsent")
      .getByRole("radio", { name: isOrderByConsent ? "Yes" : "No" })
      .check();
    await this.page
      .locator("#wasTheOrderApprovedAtHearing")
      .getByRole("radio", { name: wasOrderApprovedAtAHearing ? "Yes" : "No" })
      .check();
    if (wasOrderApprovedAtAHearing) {
      await expect(this.whichHearingWasOrderApprovedLabel).toBeVisible();
      await this.page.selectOption("#hearingsType", hearing);
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
      await this.page.locator("#dateOrderMade-day").fill(dateOrderMade.day);
      await this.page.locator("#dateOrderMade-month").fill(dateOrderMade.month);
      await this.page.locator("#dateOrderMade-year").fill(dateOrderMade.year);
    }
    await this.page
      .locator("#isTheOrderAboutChildren")
      .getByRole("radio", { name: isOrderAboutTheChildren ? "Yes" : "No" })
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
          await expect(
            this.page.locator(Selectors.p, { hasText: child }),
          ).toBeVisible();
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

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}
