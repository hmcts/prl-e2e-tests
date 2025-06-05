import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { AllegationsOfHarmRevised4Content } from "../../../../../fixtures/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevised4Content.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";

interface AllegationsOfHarmRevised4PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class AllegationsOfHarmRevised4Page {
  public static async allegationsOfHarmRevised4Page({
    page: page,
    accessibilityTest: accessibilityTest,
  }: AllegationsOfHarmRevised4PageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await this.fillInFields(page);
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: AllegationsOfHarmRevised4PageOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${AllegationsOfHarmRevised4Content.h2}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${AllegationsOfHarmRevised4Content.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${AllegationsOfHarmRevised4Content.h2}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        6,
        AllegationsOfHarmRevised4Content,
        `formLabel`,
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    const generalAbuseSelector: string = "#childAbuses-";
    const typesOfAbuse: string[] = [
      "physicalAbuse",
      "psychologicalAbuse",
      "sexualAbuse",
      "emotionalAbuse",
      "financialAbuse",
    ];
    for (const abuseType of typesOfAbuse) {
      await page.click(`${generalAbuseSelector}${abuseType}`);
    }
    await page.click(
      `${Selectors.button}:text-is("${AllegationsOfHarmRevised4Content.button}")`,
    );
  }
}
