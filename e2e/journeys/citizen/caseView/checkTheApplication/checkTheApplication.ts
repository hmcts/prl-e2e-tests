import { expect, Page } from "@playwright/test";
import { applicationSubmittedBy } from "../../../../common/types.js";

interface checkTheApplicationParams {
  page: Page;
  isApplicant: boolean;
  applicationSubmittedBy: applicationSubmittedBy;
}

export class CheckTheApplication {
  public static async checkTheApplication({
    page,
    isApplicant,
    applicationSubmittedBy,
  }: checkTheApplicationParams): Promise<void> {
    if (isApplicant) {
      if (applicationSubmittedBy === "Citizen") {
        // view the application pack
        await page
          .getByRole("link", { name: "View your application pack" })
          .click();
        // check the application pack
        await this.checkTheApplicationPack(
          page,
          isApplicant,
          applicationSubmittedBy,
        );
      } else {
        // view the orders
        await page.getByRole("link", { name: "View the order (PDF)" }).click();

        // check the order docs
        await expect(
          page.getByText("View all documents", { exact: true }),
        ).toBeVisible();
        await expect(
          page.getByRole("heading", { name: "Orders from the court" }),
        ).toBeVisible();
        await expect(page.getByText("Date order made")).toBeVisible();
        await expect(
          page.getByRole("link", { name: "Power_of_arrest.pdf", exact: true }),
        ).toBeVisible();
        await expect(
          page.getByRole("link", { name: "Welsh_Power_of_arrest.pdf" }),
        ).toBeVisible();
      }
    } else {
      if (applicationSubmittedBy === "Citizen") {
        // view the application pack
        await page
          .getByRole("link", { name: "View the application pack" })
          .click();
        // check the application pack
        await this.checkTheApplicationPack(
          page,
          isApplicant,
          applicationSubmittedBy,
        );
      } else {
        // view the served application pack
        await page
          .getByRole("link", { name: "View the court documents" })
          .click();
        // check the application pack
        await this.checkTheApplicationPack(
          page,
          isApplicant,
          applicationSubmittedBy,
        );
      }
    }
  }

  private static async checkTheApplicationPack(
    page: Page,
    isApplicant: boolean,
    applicationSubmittedBy: applicationSubmittedBy,
  ): Promise<void> {
    await expect(
      page.getByText("View all documents", { exact: true }),
    ).toBeVisible();
    if (!isApplicant && applicationSubmittedBy === "Solicitor") {
      // solicitor application respondents title is in a different structure for some reason
      await expect(
        page.getByRole("heading", {
          name: "View all documents Your served application pack",
        }),
      ).toBeVisible();
    } else {
      await expect(
        page.getByRole("heading", { name: "Your served application pack" }),
      ).toBeVisible();
    }
    await expect(page.getByText("Your served application pack")).toBeVisible();
    await expect(
      page.getByText(
        "You should read the cover letter first as this tells you what to do next. The cover letter also gives you more information on the other documents in your pack and what you need to do with them.",
      ),
    ).toBeVisible();
    if (applicationSubmittedBy === "Citizen") {
      // this is a citizen c100 case
      if (isApplicant) {
        await expect(
          page.getByRole("link", { name: "cover_letter_ap6.pdf" }),
        ).toBeVisible();
        await expect(
          page.getByRole("link", { name: "cover_letter_welsh_ap6.pdf" }),
        ).toBeVisible();
        await expect(
          page.getByRole("link", { name: "C100FinalDocument.pdf" }),
        ).toBeVisible();
        await expect(
          page.getByRole("link", { name: "C100FinalDocumentWelsh.pdf" }),
        ).toBeVisible();
        await expect(
          page.getByRole("link", { name: "C1A_Document.pdf" }),
        ).toBeVisible();
        await expect(
          page.getByRole("link", { name: "C1A_Document_Welsh.pdf" }),
        ).toBeVisible();
        await expect(
          page.getByRole("link", { name: "Special arrangements letter.docx" }),
        ).toBeVisible();
        await expect(
          page.getByRole("link", {
            name: "Parental_Responsibility_Order_C45A.pdf",
            exact: true,
          }),
        ).toBeVisible();
        await expect(
          page.getByRole("link", {
            name: "Welsh_Parental_Responsibility_Order_C45A.pdf",
          }),
        ).toBeVisible();
        await expect(
          page.getByRole("link", { name: "Privacy_Notice.pdf" }),
        ).toBeVisible();
        await expect(
          page.getByRole("link", { name: "Privacy_Notice_Welsh.pdf" }),
        ).toBeVisible();
        await expect(
          page.getByRole("link", {
            name: "Family Presidents letter to parties.pdf",
          }),
        ).toBeVisible();
        await expect(
          page.getByRole("link", {
            name: "Family Presidents letter to parties - Welsh.pdf",
          }),
        ).toBeVisible();
      } else {
        await expect(
          page.getByRole("link", { name: "coversheet.pdf" }),
        ).toBeVisible();
        await expect(
          page.getByRole("link", { name: "coversheet_welsh.pdf" }),
        ).toBeVisible();
        await expect(
          page.getByRole("link", { name: "cover_letter_re5.pdf" }),
        ).toBeVisible();
        await expect(
          page.getByRole("link", { name: "cover_letter_welsh_re5.pdf" }),
        ).toBeVisible();
        await expect(
          page.getByRole("link", { name: "C100FinalDocument.pdf" }),
        ).toBeVisible();
        await expect(
          page.getByRole("link", { name: "C100FinalDocumentWelsh.pdf" }),
        ).toBeVisible();
        await expect(
          page.getByRole("link", { name: "C1A_Document.pdf" }),
        ).toBeVisible();
        await expect(
          page.getByRole("link", { name: "C1A_Document_Welsh.pdf" }),
        ).toBeVisible();
        await expect(
          page.getByRole("link", { name: "Special arrangements letter.docx" }),
        ).toBeVisible();
        await expect(
          page.getByRole("link", {
            name: "Parental_Responsibility_Order_C45A.pdf",
            exact: true,
          }),
        ).toBeVisible();
        await expect(
          page.getByRole("link", {
            name: "Welsh_Parental_Responsibility_Order_C45A.pdf",
          }),
        ).toBeVisible();
        await expect(
          page.getByRole("link", { name: "Privacy_Notice.pdf" }),
        ).toBeVisible();
        await expect(
          page.getByRole("link", { name: "Privacy_Notice_Welsh.pdf" }),
        ).toBeVisible();
        await expect(
          page.getByRole("link", {
            name: "Family Presidents letter to parties.pdf",
          }),
        ).toBeVisible();
        await expect(
          page.getByRole("link", {
            name: "Family Presidents letter to parties - Welsh.pdf",
          }),
        ).toBeVisible();
        await expect(
          page.getByRole("link", { name: "Blank_C7.pdf" }),
        ).toBeVisible();
        await expect(
          page.getByRole("link", { name: "C1A_Blank.pdf" }),
        ).toBeVisible();
        await expect(
          page.getByRole("link", { name: "C1A_Blank_Welsh.pdf" }),
        ).toBeVisible();
      }
    } else {
      // this is a solicitor FL401 case
      await expect(
        page.getByRole("link", { name: "cover_letter_re1.pdf" }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: "cover_letter_welsh_re1.pdf" }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: "FL401FinalDocument.pdf", exact: true }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: "FL401FinalDocumentWelsh.pdf" }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: "Privacy_Notice.pdf" }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: "Privacy_Notice_Welsh.pdf" }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", {
          name: "Annex 1 - Confidential contact details notice.pdf",
        }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", {
          name: "Annex 1 - Confidential contact details notice - welsh.pdf",
        }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: "Power_of_arrest.pdf", exact: true }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: "Welsh_Power_of_arrest.pdf" }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: "mockFile.pdf" }),
      ).toBeVisible();
    }
  }
}
