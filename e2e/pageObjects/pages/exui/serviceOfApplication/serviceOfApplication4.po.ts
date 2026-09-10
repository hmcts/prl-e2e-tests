import { expect, Locator, Page } from "@playwright/test";
import { solicitorCaseCreateType } from "../../../../common/types.ts";
import { PageUtils } from "../../../../utils/page.utils.ts";
import { EventPage } from "../eventPage.po.ts";

export class ServiceOfApplication4Page extends EventPage {
  private readonly pageUtils = new PageUtils(this.page);
  private readonly personalServiceOptions: Locator = this.page.getByRole(
    "group",
    {
      name: "Does this application need to be personally served on the respondent?",
      exact: true,
    },
  );
  private readonly personalServiceYes: Locator =
    this.personalServiceOptions.getByRole("radio", {
      name: "Yes",
      exact: true,
    });
  private readonly personalServiceNo: Locator =
    this.personalServiceOptions.getByRole("radio", {
      name: "No",
      exact: true,
    });
  private readonly recipients: Locator = this.page
    .locator("#soaRecipientsOptions")
    .getByRole("checkbox");
  private readonly servingPartyOptions: Locator = this.page.getByRole("group", {
    name: "Who is responsible for serving the respondent?",
    exact: true,
  });
  private readonly courtBailiff: Locator = this.servingPartyOptions.getByRole(
    "radio",
    {
      name: "Court bailiff",
      exact: true,
    },
  );
  private readonly courtAdmin: Locator = this.servingPartyOptions.getByRole(
    "radio",
    {
      name: "Court admin",
      exact: true,
    },
  );
  private readonly localAuthorityNo: Locator = this.page.locator(
    "#soaServeLocalAuthorityYesOrNo_No",
  );
  private readonly cafcassServiceOptions: Locator = this.page.getByRole(
    "group",
    {
      name: "Does Cafcass Cymru need to be served?",
      exact: true,
    },
  );
  private readonly cafcassEmail: Locator = this.page.getByRole("textbox", {
    name: "Cafcass Cymru email address",
    exact: true,
  });
  private readonly localAuthorityServiceOptions: Locator = this.page.getByRole(
    "group",
    {
      name: "Does the local Authority need to be served?",
      exact: true,
    },
  );

  constructor(page: Page) {
    super(page, "Service of application");
  }

  async assertPageContents(caseType: solicitorCaseCreateType): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.personalServiceOptions).toBeVisible();
    await expect(this.personalServiceYes).toBeVisible();
    await expect(this.personalServiceNo).toBeVisible();

    if (caseType === "C100") {
      await expect(
        this.personalServiceOptions.getByRole("radio", {
          name: "Not applicable",
          exact: true,
        }),
      ).toBeVisible();
      await expect(this.cafcassServiceOptions).toBeVisible();
      await expect(this.cafcassEmail).toBeVisible();
      await expect(this.localAuthorityServiceOptions).toBeVisible();
      await expect(
        this.page.getByRole("radio", { name: "Yes", exact: true }),
      ).toHaveCount(3);
      await expect(
        this.page.getByRole("radio", { name: "No", exact: true }),
      ).toHaveCount(3);
    }
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectPersonalServiceByCourtBailiff(): Promise<void> {
    await this.personalServiceYes.check();
    await expect(this.servingPartyOptions).toBeVisible();
    await expect(this.courtBailiff).toBeVisible();
    await expect(this.courtAdmin).toBeVisible();
    await this.courtBailiff.check();
  }

  async selectNonPersonalServiceForAllRecipients(): Promise<void> {
    await this.personalServiceNo.check();
    await this.pageUtils.assertStrings(["Confirm Recipients"]);
    await expect(this.recipients.first()).toBeVisible();
    for (const recipient of await this.recipients.all()) {
      await recipient.check();
    }
  }

  async selectDoNotServeLocalAuthority(): Promise<void> {
    await this.localAuthorityNo.check();
  }

  async selectServiceOptions(
    caseType: solicitorCaseCreateType,
    personallyServed: boolean,
  ): Promise<void> {
    if (personallyServed) {
      await this.selectPersonalServiceByCourtBailiff();
      return;
    }

    await this.selectNonPersonalServiceForAllRecipients();
    if (caseType === "C100") {
      await this.selectDoNotServeLocalAuthority();
    }
  }
}
