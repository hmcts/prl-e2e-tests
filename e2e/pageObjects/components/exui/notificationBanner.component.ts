import { expect, Locator, Page } from "@playwright/test";

export class NotificationBannerComponent {
  private readonly banner: Locator = this.page.locator(
    ".govuk-notification-banner",
  );
  private readonly bannerTitle: Locator = this.banner.getByRole("heading", {
    name: "Important",
  });
  private readonly viewCaseFlagsLink: Locator = this.page.getByRole("link", {
    name: "View case flags",
  });

  constructor(private page: Page) {}

  async assertNotificationBannerPresent(
    numberOfActiveFlags: number,
  ): Promise<void> {
    await expect(this.bannerTitle).toBeVisible();
    const bannerText: string =
      numberOfActiveFlags > 1
        ? ` There are ${numberOfActiveFlags} active flags on this case. View case flags`
        : ` There is ${numberOfActiveFlags} active flag on this case. View case flags`;
    await expect(this.banner.getByText(bannerText)).toBeVisible();
  }

  async clickViewCaseFlags(): Promise<void> {
    await this.viewCaseFlagsLink.click();
  }
}
