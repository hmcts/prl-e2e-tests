import { EventPage } from "../eventPage.po.ts";
import { expect, Locator, Page } from "@playwright/test";

export interface UserWithAccess {
  name: string;
  role: string;
  emailAddress: string;
}

export class RestrictedCaseAccess1Page extends EventPage {
  private readonly beforeYouStartHeading: Locator = this.page.getByRole(
    "heading",
    {
      name: "Before you start",
    },
  );
  private readonly paragraph1: Locator = this.page.getByText(
    "Restricted cases will not appear in search results.",
  );
  private readonly paragraph2: Locator = this.page.getByText(
    "They can only be accessed by people who have been given the right permissions.",
  );
  private readonly userWithAccessSection: Locator = this.page.locator(
    "#assignedUserDetailsLabel",
  );

  constructor(page: Page) {
    super(page, "Mark case as restricted");
  }

  async assertPageContents(usersWithAccess: UserWithAccess[]): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.beforeYouStartHeading).toBeVisible();
    await expect(this.paragraph1).toBeVisible();
    await expect(this.paragraph2).toBeVisible();
    await this.assertUserAccessSectionContents(usersWithAccess);
    await expect(this.beforeYouStartHeading).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  private async assertUserAccessSectionContents(
    usersWithAccess: UserWithAccess[],
  ): Promise<void> {
    // assert section heading
    await expect(
      this.userWithAccessSection.getByRole("heading", {
        name: "Users with access",
      }),
    ).toBeVisible();

    // assert table contents
    const table: Locator = this.userWithAccessSection.getByRole("table");
    await expect(
      table.getByRole("columnheader", { name: "User" }),
    ).toBeVisible();
    await expect(
      table.getByRole("columnheader", { name: "Case role" }),
    ).toBeVisible();
    await expect(
      table.getByRole("columnheader", { name: "Email address" }),
    ).toBeVisible();

    await expect(table.getByRole("row")).toHaveCount(usersWithAccess.length);
    for (let i = 0; i < usersWithAccess.length; i++) {
      const row: Locator = table.getByRole("row").nth(i);
      await expect(
        row.getByRole("cell", { name: usersWithAccess[i].name, exact: true }),
      ).toBeVisible();
      await expect(
        row.getByRole("cell", { name: usersWithAccess[i].role, exact: true }),
      ).toBeVisible();
      await expect(
        row.getByRole("cell", {
          name: usersWithAccess[i].emailAddress,
          exact: true,
        }),
      ).toBeVisible();
    }
  }
}
