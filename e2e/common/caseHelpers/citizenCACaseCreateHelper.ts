import json from "../../caseData/citizenCA/c100-citizen-dummy-case-details.json";
import { Page, APIRequestContext, request } from "@playwright/test";
import IdamLoginHelper from "../../common/userHelpers/idamLoginHelper.ts";
import { setupUser } from "../userHelpers/idamCreateCitizenUserApiHelper.ts";
import { getS2SToken } from "./getAccessTokenHelper.ts";

export class CitizenCACaseCreator {
    public static async createDraftCitizenCACase(
        page: Page,
        application: string
    ): Promise<{ ccdRef: string; email: string; password: string }> {
        // Create citizen user
        const token = process.env.CITIZEN_CREATE_USER_BEARER_TOKEN as string;
        if (!token) {
            throw new Error("Bearer token is not defined in the environment variables");
        }
        const userInfo = await setupUser(token);
        if (!userInfo) {
            throw new Error("Failed to set up citizen user");
        }

        // Get IDAM citizen user token
        const microservice = process.env.CCD_DATA_STORE_CLIENT_ID as string;
        const apiContextCitizenUser: APIRequestContext = await request.newContext();
        const idamTokenUrl = process.env.IDAM_API_URL as string;
        const responseCitizenUser = await apiContextCitizenUser.post(idamTokenUrl, {
            form: {
                grant_type: "password",
                username: userInfo.email,
                password: userInfo.password,
                scope: "openid profile roles",
                client_id: microservice,
                client_secret: process.env.IDAM_SECRET as string,
                redirect_uri: process.env.PRL_COS_AAT_REDIRECT_URL as string,
            },
        });

        if (!responseCitizenUser.ok()) {
            throw new Error(
                `Failed to get user token: ${responseCitizenUser.status()} - ${responseCitizenUser.statusText()}`
            );
        }

        const responseCitizenUserBody = await responseCitizenUser.json();
        const accessToken = responseCitizenUserBody.access_token as string;
        if (!accessToken) {
            throw new Error("Failed to retrieve access token");
        }

        // Get S2S token
        const apiContextS2SToken: APIRequestContext = await request.newContext();
        const s2sToken = await getS2SToken(apiContextS2SToken, "ccd_data");

        // Create case
        const caseData = json;
        const apiContextCreateCase: APIRequestContext = await request.newContext();
        const urlCreateCase = `${process.env.PRL_COS_API_URL as string}/testing-support/create-dummy-citizen-case`;
        const responseCreateCase = await apiContextCreateCase.post(urlCreateCase, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                ServiceAuthorization: `Bearer ${s2sToken}`,
                "Content-Type": "application/json",
            },
            data: caseData,
        });

        if (!responseCreateCase.ok()) {
            throw new Error(
                `Failed to create case: ${responseCreateCase.status()} - ${responseCreateCase.statusText()}`
            );
        }

        const responseBodyCreateCase = await responseCreateCase.json();
        const ccdRef = responseBodyCreateCase.id as string;
        if (!ccdRef) {
            throw new Error("Failed to retrieve CCD case reference");
        }

        // Sign in and submit the draft case
        await this.signInAndSubmitDraftCase(page, application, ccdRef, userInfo.email, userInfo.password);

        return { ccdRef, email: userInfo.email, password: userInfo.password };
    }

    public static async signInAndSubmitDraftCase(
        page: Page,
        application: string,
        ccdRef: string,
        userEmail: string,
        userPassword: string
    ): Promise<void> {
        await IdamLoginHelper.signIn(page, userEmail, userPassword, application, "citizen");
        await page.getByRole('link', { name: `${ccdRef}` }).click(); //click on draft case
        await
    }
}
