import { expect, Page } from "@playwright/test";
import { randomUUID } from "crypto";
import os from "os";
import path from "path";
import sharp from "sharp";
import Tesseract from "tesseract.js";

interface checkTheApplicationParams {
  page: Page;
  isApplicant: boolean;
}

export class CheckTheApplication {
  public static async checkTheApplication({
    page,
    isApplicant,
  }: checkTheApplicationParams): Promise<void> {
    if (isApplicant) {
      // view the application pack
      await page
        .getByRole("link", { name: "View your application pack" })
        .click();
      // check the application pack
      await this.checkTheApplicationPack(page, isApplicant);
    } else {
      // view the application pack
      await page
        .getByRole("link", { name: "View the application pack" })
        .click();
      // check the application pack
      await this.checkTheApplicationPack(page, isApplicant);
    }
  }

  private static async checkTheApplicationPack(
    page: Page,
    isApplicant: boolean,
  ): Promise<void> {
    await expect(
      page.getByText("View all documents", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Your served application pack" }),
    ).toBeVisible();
    await expect(page.getByText("Your served application pack")).toBeVisible();
    await expect(
      page.getByText(
        "You should read the cover letter first as this tells you what to do next. The cover letter also gives you more information on the other documents in your pack and what you need to do with them.",
      ),
    ).toBeVisible();
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
      // Snapshot: coversheet.pdf
      const coversheetHref = await page
        .getByRole("link", { name: "coversheet.pdf" })
        .evaluate((element) => (element as HTMLAnchorElement).href);
      if (!coversheetHref) {
        throw new Error("coversheet.pdf link does not have an href");
      }
      const [coversheetPage] = await Promise.all([
        page.context().waitForEvent("page"),
        page.getByRole("link", { name: "coversheet.pdf" }).click(),
      ]);
      await coversheetPage.waitForLoadState("load");

      const extractedText = await this.logPdfTextFromScreenshot(coversheetPage, "coversheet.pdf");
      //expect extractedText to not contain address
      await expect(extractedText).not.toContain('Your address');
      await coversheetPage.close();

      // Snapshot: coversheet_welsh.pdf
      const coversheetWelshHref = await page
        .getByRole("link", { name: "coversheet_welsh.pdf" })
        .evaluate((element) => (element as HTMLAnchorElement).href);
      if (!coversheetWelshHref) {
        throw new Error("coversheet_welsh.pdf link does not have an href");
      }
      const [coversheetWelshPage] = await Promise.all([
        page.context().waitForEvent("page"),
        page.getByRole("link", { name: "coversheet_welsh.pdf" }).click(),
      ]);
      await coversheetWelshPage.waitForLoadState("load");

      await page.waitForTimeout(5000)
      const extractedWelshText = await this.logPdfTextFromScreenshot(coversheetWelshPage, "coversheet_welsh.pdf");
      //expect extractedText to not contain address
      await expect(extractedWelshText).toContain('Eich rhif achos yw:');
      await expect(extractedWelshText).not.toContain('Eich cyfeiriad');
      await coversheetWelshPage.close();

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
  }

  private static async logPdfTextFromScreenshot(
    page: Page,
    fileName: string,
  ): Promise<string> {
    const screenshotPath = path.join(
      os.tmpdir(),
      `check-the-application-${fileName}-${randomUUID()}.png`,
    );

    await page.waitForLoadState("load");
    await page.waitForTimeout(5000); // Wait for 1 second to ensure the page is fully rendered  
    const screenshot = await page.screenshot({ fullPage: true, path: screenshotPath });
    console.log(`Screenshot saved to ${screenshotPath}`);
    const processedImage = await sharp(screenshot)
      .greyscale()
      .normalize()
      .sharpen()
      .toBuffer();

    const {
      data: { text, confidence },
    } = await Tesseract.recognize(processedImage, "eng");

    console.log(`OCR text for ${fileName}:`);
    const extractedText = text.trim();
    if (!extractedText) {
      console.log("<no text extracted>");
    } else {
      console.log(extractedText);
    }
    return extractedText
  }
}
