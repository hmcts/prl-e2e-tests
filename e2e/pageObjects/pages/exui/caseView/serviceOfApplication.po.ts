import { expect, Locator, Page } from "@playwright/test";
import { CaseAccessViewPage } from "./caseAccessView.po.js";
import {
  OrderTypes,
  PersonalServiceTypes,
  solicitorCaseCreateType,
  YesNoNotApplicable,
} from "../../../../common/types.ts";
import { DateHelperUtils } from "../../../../utils/dateHelpers.utils.js";
import config from "../../../../utils/config.utils.js";
import { getPackDocuments } from "../../../../testData/ui/serviceOfApplicationPacks.js";

export interface ServedDetails {
  whoServed: string;
  servedBy: string;
}

export interface ServiceOptions {
  personallyServed: YesNoNotApplicable;
  servedBy?: PersonalServiceTypes;
  serveCafcass?: boolean;
  serveLocalAuthority?: boolean;
}

export interface ServicePackParams {
  caseType: solicitorCaseCreateType;
  orderType: OrderTypes;
  isCitizenCase: boolean;
  isWelshLanguageRequired: boolean;
  serviceOptions: ServiceOptions;
  areConfidentialDetailsChecked: boolean;
}

export class ServiceOfApplicationPage extends CaseAccessViewPage {
  private readonly statementOfServiceTable: Locator = this.page.locator(
    "#case-viewer-field-read--stmtOfServiceForApplication",
  );
  private dateHelper: DateHelperUtils = new DateHelperUtils();

  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
    await this.page
      .getByRole("tab", { name: "Service of application" })
      .click();
  }

  async assertStatementOfServiceDetails(
    servedDetails: ServedDetails[],
  ): Promise<void> {
    for (let i = 0; i < servedDetails.length; i++) {
      const servedDetail: ServedDetails = servedDetails[i];
      const sosTable: Locator = this.statementOfServiceTable.getByRole("cell", {
        name: `Statement of Service ${i + 1}`,
      });
      const sosHeading: Locator = sosTable.getByText(
        `Statement of Service ${i + 1}`,
      );
      await expect(sosHeading).toBeVisible();
      await this.assertTableRow(
        sosTable,
        "Who was served?",
        servedDetail.whoServed,
      );
      await this.assertTableRow(
        sosTable,
        "When were they served?",
        this.dateHelper.todayDate() as string,
      );
      await this.assertTableRow(sosTable, "Served by", servedDetail.servedBy);

      // Statement of service document details
      const sosDocHeading: Locator = sosTable.getByText(
        "Statement of service document",
      );
      await expect(sosDocHeading).toBeVisible();
      await this.assertTableRow(
        sosTable,
        "Upload document(PDF, .doc)",
        config.testPdfFile.split("/").pop(),
      );
    }
  }

  private async assertTableRow(
    sosTable: Locator,
    label: string,
    value: string,
  ): Promise<void> {
    const labelLocator: Locator = sosTable
      .getByRole("rowheader", {
        name: label,
        exact: true,
      })
      .first();
    //const exactValue: boolean = !label.includes("When");
    const valueLocator: Locator = sosTable
      .getByRole("cell", {
        name: value,
        exact: false,
      })
      .first();
    await expect(labelLocator).toBeVisible();
    await expect(valueLocator).toBeVisible();
  }

  async assertServicePacks({
    caseType,
    orderType,
    isCitizenCase,
    isWelshLanguageRequired,
    serviceOptions,
    areConfidentialDetailsChecked,
  }: ServicePackParams): Promise<void> {
    const packDocuments = getPackDocuments({
      caseType: caseType,
      orderType: orderType,
      isCitizenCase: isCitizenCase,
      isWelshLanguageRequired: isWelshLanguageRequired,
      serviceOptions: serviceOptions,
    });

    console.log("APPLICANT PACK");
    console.log(packDocuments.applicantPack);

    console.log("RESPONDENT PACK");
    console.log(packDocuments.respondentPack);

    if (packDocuments) {
      await this.assertPackDocuments(
        "Applicants pack",
        packDocuments.applicantPack,
        areConfidentialDetailsChecked,
        serviceOptions.personallyServed === "yes",
        "Applicant",
      );
      await this.assertPackDocuments(
        "Respondents pack",
        packDocuments.respondentPack,
        areConfidentialDetailsChecked,
        serviceOptions.personallyServed === "yes",
        "Respondent",
      );
    }

    // Need to fix the servedBy issues in the following ticket FPVTL-3643 before we can assert the servedBy is correct in the tests

    if (serviceOptions.serveCafcass) {
      await this.assertCafcassPack();
    }

    if (serviceOptions.serveLocalAuthority) {
      await this.assertLocalAuthorityPack();
    }
  }

  private async assertPackDocuments(
    packName: "Applicants pack" | "Respondents pack",
    documents: string[],
    areConfidentialDetailsChecked: boolean,
    isPersonallyServed: boolean,
    party: "Applicant" | "Respondent",
  ): Promise<void> {
    const shouldUseServedPack =
      areConfidentialDetailsChecked &&
      (party === "Applicant" ||
        (party === "Respondent" && !isPersonallyServed));

    if (shouldUseServedPack) {
      await expect(
        this.page.getByRole("heading", {
          name: "Served pack",
          exact: true,
          level: 2,
        }),
      ).toBeVisible();

      await this.expandServedPackDetails();

      const pack = this.page
        .locator("ccd-read-complex-field-table", {
          hasText: `Served party${party}`,
        })
        .first();

      await this.assertDocuments(pack, documents);
      return;
    }

    await expect(
      this.page.getByRole("heading", {
        name: "Unserved pack",
        exact: true,
        level: 2,
      }),
    ).toBeVisible();

    const pack = this.page.locator("ccd-read-complex-field-table", {
      hasText: packName,
    });

    await this.assertDocuments(pack, documents);
  }

  private async assertDocuments(
    pack: Locator,
    documents: string[],
  ): Promise<void> {
    await expect(pack).toBeVisible();
    await expect(pack.getByRole("button")).toHaveCount(documents.length);
    for (const document of documents) {
      await expect(
        pack
          .getByRole("button", {
            name: document,
            exact: true,
          })
          .first(),
      ).toBeVisible();
    }
  }

  private async expandServedPackDetails(): Promise<void> {
    // Served packs is already expanded if print details is showing
    const printDetailsLocator: Locator = this.page.getByText("Print details", {
      exact: true,
    });
    if (await printDetailsLocator.isHidden()) {
      const expanders: Locator = this.page.getByRole("link", {
        name: "accordion-img",
      });
      for (let index = 0; index < (await expanders.count()); index++) {
        await expanders.nth(index).click();
      }
    }
  }

  private async assertCafcassPack(): Promise<void> {
    const pack: Locator = this.page.locator("ccd-read-complex-field-table", {
      hasText: "Cafcass cymru",
    });
    await expect(pack).toBeVisible();
  }

  private async assertLocalAuthorityPack(): Promise<void> {
    const pack: Locator = this.page.locator("ccd-read-complex-field-table", {
      hasText: "Local Authority pack",
    });
    await expect(pack).toBeVisible();
    await expect(pack.getByRole("button")).toHaveCount(3);
    await expect(
      pack
        .getByRole("button", {
          name: "Draft_C100_application.pdf",
          exact: true,
        })
        .first(),
    ).toBeVisible();
    await expect(
      pack
        .getByRole("button", {
          name: /^Confidential_C8.*(?<! Welsh)\.pdf$/,
          exact: true,
        })
        .first(),
    ).toBeVisible();
    await expect(
      pack
        .getByRole("button", {
          name: /^Confidential_C8.* Welsh\.pdf$/,
          exact: true,
        })
        .first(),
    ).toBeVisible();
  }
}
