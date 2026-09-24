import { expect, Locator, Page } from "@playwright/test";
import { solicitorCaseCreateType } from "../../../../common/types.ts";
import { PageUtils } from "../../../../utils/page.utils.ts";
import { EventPage } from "../eventPage.po.ts";
import { ServiceOptions } from "../caseView/serviceOfApplication.po.js";

export class ServiceOfApplication4Page extends EventPage {
  private readonly pageUtils = new PageUtils(this.page);
  private readonly personalServiceOptions: Locator = this.page.getByRole(
    "group",
    {
      name: "Does this application need to be personally served on the respondent?",
      exact: true,
    },
  );
  private readonly personalServiceYesRadio: Locator =
    this.personalServiceOptions.getByRole("radio", {
      name: "Yes",
      exact: true,
    });
  private readonly personalServiceNoRadio: Locator =
    this.personalServiceOptions.getByRole("radio", {
      name: "No",
      exact: true,
    });
  private readonly personalServiceNotApplicableRadio: Locator =
    this.personalServiceOptions.getByRole("radio", {
      name: "Not applicable",
      exact: true,
    });
  private readonly recipients: Locator = this.page
    .locator("#soaRecipientsOptions")
    .getByRole("checkbox");
  private readonly servingPartyOptions: Locator = this.page.getByRole("group", {
    name: "Who is responsible for serving the respondent?",
    exact: true,
  });
  private readonly applicantsLegalRepresentativeRadio: Locator =
    this.servingPartyOptions.getByRole("radio", {
      name: "Applicant's legal representative",
      exact: true,
    });
  private readonly unrepresentedApplicantRadio: Locator =
    this.servingPartyOptions.getByRole("radio", {
      name: "Unrepresented applicant who is arranging service",
      exact: true,
    });
  private readonly courtBailiffRadio: Locator =
    this.servingPartyOptions.getByRole("radio", {
      name: "Court bailiff",
      exact: true,
    });
  private readonly courtAdminRadio: Locator =
    this.servingPartyOptions.getByRole("radio", {
      name: "Court admin",
      exact: true,
    });
  private readonly localAuthorityYes: Locator = this.page.locator(
    "#soaServeLocalAuthorityYesOrNo_Yes",
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
  private readonly cafcassYes: Locator = this.page.locator(
    "#soaCafcassCymruServedOptions_Yes",
  );
  private readonly cafcassNo: Locator = this.page.locator(
    "#soaCafcassCymruServedOptions_No",
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
  private readonly localAuthorityEmailAddressLabel: Locator =
    this.page.getByText("Email address", { exact: true });
  private readonly localAuthorityEmailInput: Locator = this.page.getByRole(
    "textbox",
    {
      name: "Email address",
      exact: true,
    },
  );
  private readonly localAuthorityDocumentInstructionHeading: Locator =
    this.page.getByRole("heading", {
      name: "Choose the documents to be served on the local authority",
      exact: true,
      level: 3,
    });
  private readonly localAuthorityDocumentSection: Locator = this.page.locator(
    "#soaDocumentDynamicListForLa",
  );
  private readonly localAuthorityDocumentsHeading: Locator =
    this.page.getByRole("heading", {
      name: "Document",
      exact: true,
      level: 2,
    });
  private readonly localAuthorityDocumentsAddNewButton: Locator =
    this.localAuthorityDocumentSection.getByRole("button", {
      name: "Add new",
      exact: true,
    });
  private readonly localAuthorityDocumentsSubHeading: Locator =
    this.page.getByRole("heading", {
      name: "Document",
      exact: true,
      level: 3,
    });
  private readonly localAuthorityDocumentsRemoveButton: Locator =
    this.localAuthorityDocumentSection.getByRole("button", {
      name: "Remove Document",
      exact: true,
    });
  private readonly localAuthorityDocumentsSelectADocumentLabel: Locator =
    this.localAuthorityDocumentSection.getByText("Select a document", {
      exact: true,
    });
  private readonly localAuthorityDocumentsSelectADocumentDropdown: Locator =
    this.page.locator("#soaDocumentDynamicListForLa_0_documentsListForLa");
  private readonly doesC8NeedServingToLocalAuthorityLabel: Locator =
    this.page.getByText(
      "Does the C8 need to be served on the local authority?",
      { exact: true },
    );
  private readonly localAuthorityC8ServingOptions: Locator =
    this.page.getByRole("group", {
      name: "Does the C8 need to be served on the local authority?",
      exact: true,
    });
  private readonly serveC8ToLocalAuthorityRadio: Locator =
    this.localAuthorityC8ServingOptions.getByRole("radio", {
      name: "Yes",
      exact: true,
    });
  private readonly doNotServeC8ToLocalAuthorityRadio: Locator =
    this.localAuthorityC8ServingOptions.getByRole("radio", {
      name: "Yes",
      exact: true,
    });

  constructor(page: Page) {
    super(page, "Service of application");
  }

  async assertPageContents(caseType: solicitorCaseCreateType): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.personalServiceOptions).toBeVisible();
    await expect(this.personalServiceYesRadio).toBeVisible();
    await expect(this.personalServiceNoRadio).toBeVisible();

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

  async selectPersonalService(isCitizenCase: boolean): Promise<void> {
    await this.personalServiceYesRadio.check();
    await expect(this.servingPartyOptions).toBeVisible();
    if (isCitizenCase) {
      await expect(this.unrepresentedApplicantRadio).toBeVisible();
    } else {
      await expect(this.applicantsLegalRepresentativeRadio).toBeVisible();
    }
    await expect(this.courtBailiffRadio).toBeVisible();
    await expect(this.courtAdminRadio).toBeVisible();
  }

  async selectNonPersonalService(): Promise<void> {
    await this.personalServiceNoRadio.check();
    await this.pageUtils.assertStrings(["Confirm Recipients"]);
    await expect(this.recipients.first()).toBeVisible();
  }

  async selectAllPartiesToServe(): Promise<void> {
    for (const recipient of await this.recipients.all()) {
      await recipient.check();
    }
  }

  async personalServiceNotApplicable(): Promise<void> {
    await this.personalServiceNotApplicableRadio.check();
  }

  async selectDoNotServeLocalAuthority(): Promise<void> {
    await this.localAuthorityNo.check();
  }

  async selectServiceOptions(
    caseType: solicitorCaseCreateType,
    serviceOptions: ServiceOptions,
    isCitizenCase: boolean,
  ): Promise<void> {
    await this.handlePersonalService(serviceOptions, isCitizenCase);

    if (caseType === "C100") {
      await this.handleC100ServiceOptions(serviceOptions);
    }
  }

  private async handlePersonalService(
    { personallyServed, servedBy }: Partial<ServiceOptions>,
    isCitizenCase: boolean,
  ): Promise<void> {
    switch (personallyServed) {
      case "yes":
        await this.selectPersonalService(isCitizenCase);
        switch (servedBy) {
          case "applicantsSolicitor":
            await this.applicantsLegalRepresentativeRadio.check();
            break;
          case "unrepresentedApplicant":
            await this.unrepresentedApplicantRadio.check();
            break;
          case "courtBailiff":
            await this.courtBailiffRadio.check();
            break;
          case "courtAdmin":
            await this.courtAdminRadio.check();
            break;
        }
        break;
      case "no":
        await this.selectNonPersonalService();
        await this.selectAllPartiesToServe();
        break;
      case "notApplicable":
        await this.personalServiceNotApplicable();
        break;
    }
  }

  private async handleC100ServiceOptions({
    serveCafcass,
    serveLocalAuthority,
  }: Partial<ServiceOptions>): Promise<void> {
    if (serveCafcass) {
      await this.cafcassYes.check();
      await this.cafcassEmail.fill("cafcass@automatedtest.com");
    } else {
      await this.cafcassNo.check();
    }

    if (serveLocalAuthority) {
      await this.localAuthorityYes.check();
      await this.handleServeLocalAuthority();
    } else {
      await this.localAuthorityNo.check();
    }
  }

  private async handleServeLocalAuthority(): Promise<void> {
    // check correct elements are shown
    await expect(this.localAuthorityEmailAddressLabel).toBeVisible();
    await expect(this.localAuthorityDocumentInstructionHeading).toBeVisible();
    await expect(this.localAuthorityDocumentsHeading).toBeVisible();
    await expect(this.localAuthorityDocumentsAddNewButton).toHaveCount(2);
    await expect(this.localAuthorityDocumentsSubHeading).toBeVisible();
    await expect(this.localAuthorityDocumentsRemoveButton).toBeVisible();
    await expect(
      this.localAuthorityDocumentsSelectADocumentLabel,
    ).toBeVisible();
    await expect(this.doesC8NeedServingToLocalAuthorityLabel).toBeVisible();
    await expect(this.serveC8ToLocalAuthorityRadio).toBeVisible();
    await expect(this.doNotServeC8ToLocalAuthorityRadio).toBeVisible();

    // use static inputs for local authority options
    await this.localAuthorityEmailInput.fill(
      "localauthority@automatedtest.com",
    );
    await this.localAuthorityDocumentsSelectADocumentDropdown.selectOption(
      "Applications -> Applicant documents -> Applicant application -> Draft_C100_application.pdf",
    );
    await this.serveC8ToLocalAuthorityRadio.check();
  }
}
