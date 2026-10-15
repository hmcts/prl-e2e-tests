import { expect, Page } from "@playwright/test";
import { Selectors } from "../../../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";

interface otherPersonDetailsConfidentialityOptions {
  page: Page;
  accessibilityTest: boolean;
  C100YesNoConfidentiality: boolean;
}

enum UniqueSelectors {
  yes = "#confidentiality",
  no = "#confidentiality-2",
}

export class OtherPersonDetailsConfidentiality {
  public static async otherPersonDetailsConfidentiality({
    page: page,
    accessibilityTest: accessibilityTest,
    C100YesNoConfidentiality: C100YesNoConfidentiality,
  }: otherPersonDetailsConfidentialityOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await this.fillInFields({
      page: page,
      C100YesNoConfidentiality: C100YesNoConfidentiality,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: Partial<otherPersonDetailsConfidentialityOptions>): Promise<void> {
    if (!page) {
      throw new Error("Missing the page object.");
    }
    await expect(
      page.getByRole("heading", {
        name: /Keeping .* identity private/,
      }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "The information you give us will be shared with the other people named in this application.",
      ),
    ).toBeVisible();
    await expect(
      page.getByText(
        /As you have told us that .* lives with .*, you can choose to keep .* identity private. This includes their address./,
      ),
    ).toBeVisible();
    await expect(
      page.getByText(
        /Do you want to keep .* identity private from the other people named in the application\?/,
      ),
    ).toBeVisible();
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields({
    page: page,
    C100YesNoConfidentiality: C100YesNoConfidentiality,
  }: Partial<otherPersonDetailsConfidentialityOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page object not initialised.");
    }
    if (C100YesNoConfidentiality) {
      await page.check(UniqueSelectors.yes);
    } else {
      await page.check(UniqueSelectors.no);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
