import { expect, Locator, Page } from "@playwright/test";
import { solicitorCaseCreateType } from "../../../../common/types.ts";
import { PageUtils } from "../../../../utils/page.utils.ts";
import { FileUploadComponent } from "../../../components/exui/uploadFile.component.ts";
import { EventPage } from "../eventPage.po.ts";

export class ServiceOfApplication2Page extends EventPage {
  private readonly pageUtils = new PageUtils(this.page);
  private readonly documentsServedInPack: Locator = this.page.getByText(
    "Documents served in the pack",
    { exact: true },
  );
  private readonly specialArrangementsLetter = new FileUploadComponent(
    this.page,
    {
      uploadLabelText: "Special arrangements letter",
      chooseFileLocatorID: "#specialArrangementsLetter",
    },
  );
  private readonly noticeOfSafetyLetter = new FileUploadComponent(this.page, {
    uploadLabelText: "Upload notice of safety letter",
    chooseFileLocatorID: "#noticeOfSafetySupportLetter",
  });

  constructor(page: Page) {
    super(page, "Service of application");
  }

  async assertPageContents(caseType: solicitorCaseCreateType): Promise<void> {
    await this.assertPageHeadings();
    await expect(
      this.page.getByRole("heading", {
        name: "Select and upload orders and documents to be served",
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      this.page.getByRole("heading", {
        name: "Upload additional documents (Optional)",
        exact: true,
      }),
    ).toBeVisible();
    await this.pageUtils.assertStrings([
      "Select the orders and notices that you want to serve on parties.",
      "Upload any additional documents in your service pack that are due to be sent to both the applicant and the respondent.",
    ]);
    await expect(this.documentsServedInPack).toBeVisible();

    if (caseType === "C100") {
      for (const heading of [
        "Select orders",
        "Upload  additional documents",
        "Upload PD36ZE letter",
        "Upload special arrangements letter",
      ]) {
        await expect(
          this.page.getByRole("heading", { name: heading, exact: true }),
        ).toBeVisible();
      }
      await expect(
        this.page.locator('.form-label:text-is("Select orders")'),
      ).toBeVisible();
      await this.pageUtils.assertStrings([
        "There are confidential details on the case.",
        "Special arrangements letter",
        "PD36ZE letter (Optional)",
        "Upload the PD36ZE letter that is used by your court. This letter explains how the court manages child arrangements order cases",
        "Upload the special arrangement template letter that is used by your court. The letter explains what measures can be put in place by the court to support people in the case",
      ]);
    } else {
      await this.pageUtils.assertStrings([
        "Upload the version that is used by your court.",
      ]);
    }
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async expandDocumentsServedInPack(
    caseType: solicitorCaseCreateType,
  ): Promise<void> {
    await this.documentsServedInPack.click();
    const documents =
      caseType === "C100"
        ? [
            "Certain documents will be automatically included in the pack this is served on parties(the people in the case)",
            "This includes",
            "You do not need to upload these documents yourself",
            "C100",
            "C1A",
            "C7",
            "C1A (if applicable)",
            "C8 (Cafcass/Cafcass Cymru, if applicable)",
            "Any orders and hearing notices created at the initial gatekeeping stage",
          ]
        : [
            "Certain documents will be automatically included in the pack that is sent out on parties (the people in the case).",
            "This includes:",
            "You do not need to upload these documents yourself.",
            "an application form (FL401)",
            "witness statement",
          ];
    await this.pageUtils.assertStrings(documents);
  }

  async fillInFields(
    caseType: solicitorCaseCreateType,
    orderName: string,
  ): Promise<void> {
    await this.page.getByRole("checkbox", { name: orderName }).check();
    const letter =
      caseType === "C100"
        ? this.specialArrangementsLetter
        : this.noticeOfSafetyLetter;
    await letter.completeUpload();
  }
}
