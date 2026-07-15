import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { RenameDocuments1Page } from "../../../../pageObjects/pages/exui/renameDocuments/renameDocuments1.po.ts";
import { RenameDocuments2Page } from "../../../../pageObjects/pages/exui/renameDocuments/renameDocuments2.po.ts";
import { RenameDocumentsSubmitPage } from "../../../../pageObjects/pages/exui/renameDocuments/renameDocumentsSubmit.po.ts";

interface RenameDocumentParams {
  page: Page;
  documentToSelect: string;
  newCategory: string;
  newName: string;
}

export class RenameDocuments {
  public static async renameDocument({
    page,
    documentToSelect,
    newCategory,
    newName,
  }: RenameDocumentParams): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, "Rename documents");
    await new RenameDocuments1Page(page).selectDocument(documentToSelect);
    await new RenameDocuments2Page(page).changeCategoryAndName(
      newCategory,
      newName,
    );
    await new RenameDocumentsSubmitPage(page).submit();
  }
}
