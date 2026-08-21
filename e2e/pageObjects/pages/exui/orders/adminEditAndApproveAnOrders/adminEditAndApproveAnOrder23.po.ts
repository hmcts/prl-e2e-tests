import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.js";
import { solicitorCaseCreateType } from "../../../../../common/types.js";

export class AdminEditAndApproveAnOrder23Page extends EventPage {
  private readonly heading2: Locator = this.page.locator(Selectors.h2, {
    hasText: "Serve the order",
  });
  private readonly personallyServeText = this.page.getByText(
    "Does this order need to be personally served on the respondent?",
  );
  private readonly otherPeopleText = this.page.getByText(
    "Which other people in the case should the order be sent to? (Optional)",
  );
  private readonly serveCafcassText = this.page.getByText(
    "Does Cafcass Cymru need to be served?",
  );
  private readonly daOtherPartyText = this.page.getByText(
    "Any other party who needs to be served with this application (Optional)",
  );

  private readonly hint: Locator = this.page.locator(
    `${Selectors.GovukFormHint}:visible`,
    { hasText: "For example, DWP or the local authority" },
  );
  private readonly anotherText = this.page.getByText(
    "Another organisation (optional)",
  );
  private readonly hiddenWhoResponsibleText = this.page.getByText(
    "Who is responsible for serving the respondent?",
  );
  private readonly hiddenYesResponsibleText1 = this.page.getByText(
    "Applicant's legal representative",
  );
  private readonly hiddenYesResponsibleText2 =
    this.page.getByText("Court bailiff");
  private readonly hiddenYesResponsibleText3 =
    this.page.getByText("Court admin");
  private readonly hiddenResponsibleText = this.page.getByText(
    "(you must arrange for them to serve the order)",
  );
  private readonly hiddenCafcassYesText = this.page.getByText(
    "Cafcass Cymru email address",
  );
  private readonly hiddenConfirmRecipients =
    this.page.getByText("Confirm Recipients");

  constructor(page: Page) {
    super(page, "Edit and serve an order");
  }

  async assertPageContents(caseType: solicitorCaseCreateType): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.personallyServeText).toBeVisible();
    await expect(this.hint).toBeVisible();

    if (caseType === "C100") {
      await expect(this.heading2.nth(0)).toBeVisible();
      await expect(this.otherPeopleText).toBeVisible();
      await expect(this.serveCafcassText).toBeVisible();
      await expect(this.anotherText).toBeVisible();
    } else {
      await expect(this.heading2.nth(1)).toBeVisible();
    }
  }

  async serveOrderDetails(
    caseType: solicitorCaseCreateType,
    personallyServed: boolean,
    responsibleToServeRespondent: string,
    recipients: string[],
    serveCafcass: boolean,
  ): Promise<void> {
    await this.page
      .getByRole("group", {
        name: "Does this order need to be personally served on the respondent?",
      })
      .getByRole("radio", {
        name: personallyServed ? "Yes" : "No",
        exact: true,
      })
      .check();

    if (personallyServed) {
      await expect(this.hiddenWhoResponsibleText.first()).toBeVisible();
      await expect(this.hiddenYesResponsibleText1).toBeVisible();
      await expect(this.hiddenYesResponsibleText2.first()).toBeVisible();
      await expect(this.hiddenYesResponsibleText3.first()).toBeVisible();
      await this.page
        .getByRole("radio", { name: responsibleToServeRespondent })
        .check();
      await expect(this.hiddenResponsibleText).toBeVisible();
    } else {
      await expect(this.hiddenConfirmRecipients).toBeVisible();
      for (const recipient of recipients) {
        const recipientCheckbox: Locator = this.page.getByRole("checkbox", {
          name: recipient,
        });
        await expect(this.page.getByText(recipient)).toBeVisible();
        await recipientCheckbox.check();
      }
    }
    if (caseType === "C100") {
      await this.page
        .getByRole("group", {
          name: "Does Cafcass Cymru need to be served?",
        })
        .getByLabel(serveCafcass ? "Yes" : "No")
        .check();

      if (serveCafcass) {
        await expect(this.hiddenCafcassYesText).toBeVisible();
      }
    }
  }

  private async selectRadioById(baseId: string, flag: boolean): Promise<void> {
    const optionId = `${baseId}_${flag ? "Yes" : "No"}`;

    const input = this.page.locator(`#${optionId}`);
    const label = this.page.locator(`label[for="${optionId}"]`);

    // Wait for the actual option to exist and be interactable
    await expect(input).toBeVisible();
    await expect(label).toBeVisible();

    // poll clicking the radio buttons - it seems like there is a strange error linked to the report date input which causes the elements to become briefly unstable
    await expect
      .poll(
        async () => {
          const inputChecked = await input.isChecked();
          if (!inputChecked) {
            await label.click();
          }
          return inputChecked;
        },
        {
          intervals: [1_000],
          timeout: 10_000,
        },
      )
      .toBeTruthy();
  }
}
