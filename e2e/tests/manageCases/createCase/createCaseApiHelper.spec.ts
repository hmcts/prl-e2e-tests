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

    test("test case creation api"){ 
        page.goto("https://idam-web-public.aat.platform.hmcts.net/login?client_id=xuiwebapp&redirect_uri=https://manage-case.aat.platform.hmcts.net/oauth2/callback&state=OmWwqtb_Ptg3pqlQ39H05Mof9wtBCSuzswTstLMH2Cs&nonce=rxwf7vEFjWPDE3TJyLyCe_RepM_0wT0-XxXIaGcRK90&response_type=code&scope=profile%20openid%20roles%20manage-user%20create-user%20search-user&prompt=")

    }
}

