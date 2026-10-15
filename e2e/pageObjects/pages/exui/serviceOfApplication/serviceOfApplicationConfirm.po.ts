import { expect, Locator, Page } from "@playwright/test";
import { PageUtils } from "../../../../utils/page.utils.ts";
import { EventPage } from "../eventPage.po.ts";

export type ServiceOfApplicationConfirmation =
  "confidentiality review" | "personal service" | "non-personal service";

const confirmationDetails: Record<
  ServiceOfApplicationConfirmation,
  { heading: string; content: string[] }
> = {
  "confidentiality review": {
    heading: "The application will be reviewed for confidential details",
    content: [
      "The service pack needs to be reviewed for confidential details before it can be served.",
    ],
  },
  "personal service": {
    heading: "The application is ready to be personally served",
    content: [
      "You need to arrange for a court bailiff to personally serve the respondent.",
      "The service pack has been served on the applicant.",
    ],
  },
  "non-personal service": {
    heading: "The application has been served",
    content: ["The service pack has been served on the parties selected."],
  },
};

export class ServiceOfApplicationConfirmPage extends EventPage {
  private readonly pageUtils = new PageUtils(this.page);
  private readonly whatHappensNextHeading: Locator = this.page.getByRole(
    "heading",
    { name: "What happens next", exact: true },
  );
  private readonly serviceOfApplicationLink: Locator = this.page.getByRole(
    "link",
    { name: "service of application", exact: true },
  );

  constructor(page: Page) {
    super(page, "Service of application");
  }

  async assertPageContents(
    confirmation: ServiceOfApplicationConfirmation = "confidentiality review",
  ): Promise<void> {
    const { heading, content } = confirmationDetails[confirmation];

    await this.assertPageHeadings();
    await expect(
      this.page.getByRole("heading", { name: heading, exact: true }),
    ).toBeVisible();
    await expect(this.whatHappensNextHeading).toBeVisible();
    await this.pageUtils.assertStrings(content);
    await expect(
      this.page.locator('p:text-is("You can view the service packs in the")'),
    ).toBeVisible();
    await expect(this.page.locator('p:text-is("tab.")')).toBeVisible();
    await expect(this.serviceOfApplicationLink).toBeVisible();
    await expect(this.closeAndReturnToCaseDetailsButton).toBeVisible();
  }
}
