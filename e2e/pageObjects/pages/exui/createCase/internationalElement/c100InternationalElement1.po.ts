import { expect, Locator, Page } from "@playwright/test";
import { EventPage } from "../../eventPage.po.ts";
import { PageUtils } from "../../../../../utils/page.utils.js";

export class C100InternationalElement1Page extends EventPage {
  private readonly editForm: Locator = this.page.locator("#caseEditForm");
  private readonly habitualResidentInOtherStateRadioYes: Locator =
    this.page.locator("#habitualResidentInOtherState_Yes");
  private readonly habitualResidentInOtherStateRadioNo: Locator =
    this.page.locator("#habitualResidentInOtherState_No");
  private readonly jurisdictionIssueRadioYes: Locator = this.page.locator(
    "#jurisdictionIssue_Yes",
  );
  private readonly jurisdictionIssueRadioNo: Locator = this.page.locator(
    "#jurisdictionIssue_No",
  );
  private readonly requestToForeignAuthorityRadioYes: Locator =
    this.page.locator("#requestToForeignAuthority_Yes");
  private readonly requestToForeignAuthorityRadioNo: Locator =
    this.page.locator("#requestToForeignAuthority_No");
  private readonly habitualResidentTextArea: Locator = this.page.locator(
    "#habitualResidentInOtherStateGiveReason",
  );
  private readonly jurisdictionIssueTextArea: Locator = this.page.locator(
    "#jurisdictionIssueGiveReason",
  );
  private readonly requestToForeignAuthorityTextArea: Locator =
    this.page.locator("#requestToForeignAuthorityGiveReason");

  private readonly paraText: Locator = this.page.getByText(
    "You can save and return to this page at any time. Questions marked with a * need to be completed before you can send your application.",
  );

  private readonly formLabels: string[] = [
    "Do you have any reason to believe that any child, parent or potentially significant adult in the child's life may be habitually resident in another country abroad or in Scotland or Northern Ireland? (Optional)",
    "Do you have any reason to believe that there may be an issue as to jurisdiction, relating to a country abroad or to Scotland or Northern Ireland, in this case? (Optional)",
    "Has a request been made or should a request be made to a Central Authority or other competent authority in a foreign state or a consular authority in England and Wales? (Optional)",
  ];

  constructor(page: Page) {
    super(page, "International element");
  }

  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.paraText).toBeVisible();
    await this.pageUtils.assertStrings(this.formLabels);
    await expect(this.editForm.getByText("Yes", { exact: true })).toHaveCount(
      3,
    );
    await expect(this.editForm.getByText("No", { exact: true })).toHaveCount(3);
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async fillInFields(yesNoInternationalElement: boolean): Promise<void> {
    if (yesNoInternationalElement) {
      await this.habitualResidentInOtherStateRadioYes.click();
      await this.jurisdictionIssueRadioYes.click();
      await this.requestToForeignAuthorityRadioYes.click();
      await expect(
        this.editForm.getByText("*Give reason (Optional)", { exact: true }),
      ).toHaveCount(3);
      await this.giveReasons();
    } else {
      await this.habitualResidentInOtherStateRadioNo.click();
      await this.jurisdictionIssueRadioNo.click();
      await this.requestToForeignAuthorityRadioNo.click();
    }
  }

  async giveReasons() {
    await this.habitualResidentTextArea.fill("Test Reason");
    await this.jurisdictionIssueTextArea.fill("Test Reason");
    await this.requestToForeignAuthorityTextArea.fill("Test Reason");
  }
}
