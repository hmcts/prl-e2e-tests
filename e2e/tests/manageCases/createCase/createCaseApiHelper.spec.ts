import { test } from "@playwright/test";
import Config from "../../../config";
import { CreateCaseName } from "../../../common/apiHelper/createCaseName";
import { CaseManagerAPI } from "../../../common/apiHelper/apiHelper"

test.describe('manage orders', () => {
    let dateTime = new Date().toISOString();
    new Date().toTimeString()
    let caseNumber: string;
    let caseName: string;
    test.beforeEach(async () => {
        caseNumber = await CaseManagerAPI.createCase('e2e case', newSwanseaLocalAuthorityUserOne);
        return { caseNumber, caseName };
    });

    test("test case creation api")
    {
        page.goto()
}
