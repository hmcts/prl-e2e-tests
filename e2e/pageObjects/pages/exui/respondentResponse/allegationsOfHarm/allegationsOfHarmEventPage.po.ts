import { expect, Locator, Page } from "@playwright/test";
import { RespondentResponseEventPage } from "../respondentResponseEventPage.po.js";
import { PageUtils } from "../../../../../utils/page.utils.js";

/** A fixed date for CCD day/month/year inputs. */
export interface AohDate {
  day: string;
  month: string;
  year: string;
}

export enum RespondentNamePrefix {
  respondent = "Respondent name:",
  activeRespondent = "Active respondent name:",
}

export abstract class AllegationsOfHarmEventPage extends RespondentResponseEventPage {
  protected readonly pageUtils: PageUtils = new PageUtils(this.page);

  protected constructor(page: Page) {
    super(page, "Allegations of harm");
  }

  protected async assertCommonContents(
    pageId: string,
    respondentName: string,
    namePrefix: RespondentNamePrefix,
  ): Promise<void> {
    await expect(this.page).toHaveURL(
      new RegExp(`/c100ResSolAllegationsOfHarm${pageId}$`),
    );
    await this.assertPageHeadings();
    await expect(
      this.page.getByRole("heading", {
        level: 3,
        name: `${namePrefix} ${respondentName}`,
        exact: true,
      }),
    ).toBeVisible();
  }

  protected question(legend: string): Locator {
    return this.page.getByRole("group", { name: legend, exact: true });
  }

  protected async answerYesNo(legend: string, yes: boolean): Promise<void> {
    await this.checkUntilChecked(
      this.question(legend).getByRole("radio", {
        name: yes ? "Yes" : "No",
        exact: true,
      }),
    );
  }

  protected async checkUntilChecked(option: Locator): Promise<void> {
    await expect(async () => {
      await option.check({ timeout: 5_000 });
      await expect(option).toBeChecked({ timeout: 1_000 });
    }).toPass({ timeout: 30_000 });
  }

  protected async fillDate(fieldId: string, date: AohDate): Promise<void> {
    await this.page.locator(`#${fieldId}-day`).fill(date.day);
    await this.page.locator(`#${fieldId}-month`).fill(date.month);
    await this.page.locator(`#${fieldId}-year`).fill(date.year);
  }
}
