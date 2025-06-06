import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";

enum content {
  button = "I don't want to answer these questions",
}

interface EqualityAndDiversityPageOptions {
  page: Page;
}

export class EqualityAndDiversityPage {
  public static async equalityAndDiversityPage({
    page,
  }: EqualityAndDiversityPageOptions): Promise<void> {
    await page.click(`${Selectors.GovukButton}:text-is("${content.button}")`);
  }
}
