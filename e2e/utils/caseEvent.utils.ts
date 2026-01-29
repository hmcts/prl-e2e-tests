import { Browser, Page } from "@playwright/test";
import { JsonDatas, jsonDatas } from "../common/caseHelpers/jsonDatas.js";
import {
  solicitorCACaseAPIEvent,
  solicitorCaseCreateType,
  solicitorDACaseAPIEvent,
} from "../common/types.js";
import { Helpers } from "../common/helpers.js";
import config from "./config.utils.js";
import Config from "./config.utils.js";

export class CaseEventUtils {
  private readonly contentTypeHeader: string;
  private readonly experimentalHeader: string;

  constructor() {
    this.contentTypeHeader = "application/json; charset=UTF-8";
    this.experimentalHeader = "true";
  }

  async createDACase(
    browser: Browser,
    jsonData: JsonDatas = jsonDatas.solicitorDACaseData,
    page?: Page,
  ): Promise<string> {
    if (!page) {
      page = await Helpers.openNewBrowserWindow(browser, "solicitor");
      await page.goto(config.manageCasesBaseURLCase);
    }
    const caseRef = await this.createTSSolicitorCase(page, "FL401");
    await this.submitEvent(
      page,
      caseRef,
      "fl401StatementOfTruthAndSubmit",
      jsonData,
    );
    await page.close();
    return caseRef;
  }

  async createCACase(
    browser: Browser,
    jsonData: JsonDatas = jsonDatas.solicitorCACaseData,
    page?: Page,
  ) {
    if (!page) {
      page = await Helpers.openNewBrowserWindow(browser, "solicitor");
      await page.goto(config.manageCasesBaseURLCase);
    }
    const caseRef = await this.createTSSolicitorCase(page, "C100");
    await this.submitEvent(page, caseRef, "submitAndPay", jsonData);
    await this.submitEvent(
      page,
      caseRef,
      "testingSupportPaymentSuccessCallback",
      jsonData,
    );
    await page.close();
    return caseRef;
  }

  async createDACaseAddCaseNumber(browser: Browser): Promise<string> {
    const caseRef: string = await this.createDACase(
      browser,
      jsonDatas.solicitorDACaseData,
    );
    // open new browser and sign in as court admin user
    const caPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "caseWorker",
    );
    await caPage.goto(`${Config.manageCasesBaseURL}/work/my-work/list`);
    await this.submitEvent(
      caPage,
      caseRef,
      "fl401AddCaseNumber",
      jsonDatas.solicitorDACaseData,
    );
    await caPage.close();
    return caseRef;
  }

  async createDACaseSendToGatekeeper(browser: Browser): Promise<string> {
    const caseRef: string = await this.createDACase(
      browser,
      jsonDatas.solicitorDACaseData,
    );
    // open new browser and sign in as court admin user
    const caPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "caseWorker",
    );
    await caPage.goto(`${Config.manageCasesBaseURL}/work/my-work/list`);
    await this.submitEvent(
      caPage,
      caseRef,
      "fl401AddCaseNumber",
      jsonDatas.solicitorDACaseData,
    );
    await this.submitEvent(
      caPage,
      caseRef,
      "fl401SendToGateKeeper",
      jsonDatas.solicitorDACaseData,
    );
    await caPage.close();
    return caseRef;
  }

  async createCACaseIssueAndSendToLocalCourt(
    browser: Browser,
  ): Promise<string> {
    const caseRef: string = await this.createCACase(
      browser,
      jsonDatas.solicitorCACaseData,
    );
    const ctscPage = await Helpers.openNewBrowserWindow(
      browser,
      "courtAdminStoke",
    );
    await Helpers.goToCase(
      ctscPage,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
    await this.submitEvent(
      ctscPage,
      caseRef,
      "issueAndSendToLocalCourtCallback",
      jsonDatas.solicitorCACaseData,
    );
    await ctscPage.close();
    return caseRef;
  }

  async createCACaseSendToGatekeeper(browser: Browser): Promise<string> {
    const caseRef: string =
      await this.createCACaseIssueAndSendToLocalCourt(browser);
    const caPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "caseWorker",
    );
    await Helpers.goToCase(
      caPage,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
    //CA json data currently sending to judge - "Elizabeth Williams". Need to rework payload strategy to point to LA or different judge as & when required - FPVTL-995
    await this.submitEvent(
      caPage,
      caseRef,
      "sendToGateKeeper",
      jsonDatas.solicitorCACaseData,
    );
    await caPage.close();
    return caseRef;
  }

  async caCaseIssueToLocalCourtAndSendToGatekeeper(
    caseRef: string,
    browser: Browser,
  ): Promise<void> {
    const ctscPage = await Helpers.openNewBrowserWindow(
      browser,
      "courtAdminStoke",
    );
    await Helpers.goToCase(
      ctscPage,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
    await this.submitEvent(
      ctscPage,
      caseRef,
      "issueAndSendToLocalCourtCallback",
      jsonDatas.solicitorCACaseData,
    );
    await ctscPage.close();
    const caPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "caseWorker",
    );
    await Helpers.goToCase(
      caPage,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
    //CA json data currently sending to judge - "Elizabeth Williams". Need to rework payload strategy to point to LA or different judge as & when required - FPVTL-995
    await this.submitEvent(
      caPage,
      caseRef,
      "sendToGateKeeper",
      jsonDatas.solicitorCACaseData,
    );
    await caPage.close();
  }

  async createCACaseSubmitAndPayIndividualEvents(page: Page): Promise<string> {
    const solicitorCaseEvents: solicitorCACaseAPIEvent[] = [
      "selectApplicationType",
      "hearingUrgency",
      "applicantsDetails",
      "respondentsDetails",
      "otherPeopleInTheCaseRevised",
      "childDetailsRevised",
      "otherChildNotInTheCase",
      "childrenAndApplicants",
      "childrenAndRespondents",
      "childrenAndOtherPeople",
      "allegationsOfHarmRevised",
      "miamPolicyUpgrade",
      "internationalElement",
      "welshLanguageRequirements",
      "submitAndPay",
      "testingSupportPaymentSuccessCallback",
    ];

    await page.goto(Config.manageCasesBaseURL);
    const caseRef = await this.createBlankCase(
      page,
      jsonDatas.solicitorCACaseData,
    );
    for (const event of solicitorCaseEvents) {
      await this.submitEvent(
        page,
        caseRef,
        event,
        jsonDatas.solicitorCACaseData,
      );
    }
    return caseRef;
  }

  /**
   * Function to submit a specific event for a given case.
   * @param {Page} page the page to be used - this gives the API call its context
   * @param {string} caseId the ID of the case to perform the event against
   * @param {solicitorDACaseAPIEvent | solicitorCACaseAPIEvent} eventId the ID of the event to be submitted
   * @param {JsonDatas} jsonData a JSON file stored in an object that contains the event data for the event to be submitted
   */
  async submitEvent(
    page: Page,
    caseId: string,
    eventId: solicitorDACaseAPIEvent | solicitorCACaseAPIEvent,
    jsonData: JsonDatas,
  ): Promise<void> {
    if (process.env.PWDEBUG) {
      console.log(`Start of event: ${eventId}`);
    }
    const eventData = jsonData[eventId].data;
    const startEventUrl = `/data/internal/cases/${caseId}/event-triggers/${eventId}?ignore-warning=false`;

    const startEventHeaders = {
      Accept:
        "application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-event-trigger.v2+json;charset=UTF-8",
      Experimental: this.experimentalHeader,
      "Content-type": this.contentTypeHeader,
    };
    const eventToken: string = await this.getData(
      page,
      startEventUrl,
      startEventHeaders,
    );

    const submitEventUrl = `/data/cases/${caseId}/events`;
    const data = {
      data: eventData,
      event: {
        id: eventId,
        summary: "",
        description: "",
      },
      event_token: eventToken,
      ignore_warning: false,
    };
    const submitEventHeaders = {
      Accept:
        "application/vnd.uk.gov.hmcts.ccd-data-store-api.create-event.v2+json;charset=UTF-8",
      Experimental: this.experimentalHeader,
      "Content-type": this.contentTypeHeader,
    };
    await this.postData(
      page,
      submitEventUrl,
      submitEventHeaders,
      JSON.stringify(data),
    );

    if (process.env.PWDEBUG) {
      console.log(`Completed event: ${eventId}`);
    }
  }

  private async createBlankCase(
    page: Page,
    jsonData: JsonDatas,
  ): Promise<string> {
    const startCaseCreationUrl = `/data/internal/case-types/PRLAPPS/event-triggers/solicitorCreate?ignore-warning=false`;

    const startCaseCreationHeaders = {
      Accept:
        "application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-case-trigger.v2+json;charset=UTF-8",
      Experimental: this.experimentalHeader,
      "Content-type": this.contentTypeHeader,
    };
    const eventToken: string = await this.getData(
      page,
      startCaseCreationUrl,
      startCaseCreationHeaders,
    );

    const submitCaseUrl = `/data/case-types/PRLAPPS/cases?ignore-warning=false`;
    const data = {
      data: jsonData.solicitorCreate.data,
      draft_id: null,
      event: {
        id: "solicitorCreate",
        summary: "",
        description: "",
      },
      event_token: eventToken,
      ignore_warning: false,
    };
    const submitEventHeaders = {
      Accept:
        "application/vnd.uk.gov.hmcts.ccd-data-store-api.create-case.v2+json;charset=UTF-8",
      Experimental: this.experimentalHeader,
      "Content-type": this.contentTypeHeader,
    };
    return await this.postData(
      page,
      submitCaseUrl,
      submitEventHeaders,
      JSON.stringify(data),
    );
  }

  async createTSSolicitorCase(
    page: Page,
    caseType: solicitorCaseCreateType,
  ): Promise<string> {
    const startCaseCreationUrl = `/data/internal/case-types/PRLAPPS/event-triggers/testingSupportDummySolicitorCreate?ignore-warning=false`;

    const startCaseCreationHeaders = {
      Accept:
        "application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-case-trigger.v2+json;charset=UTF-8",
      Experimental: this.contentTypeHeader,
      "Content-type": this.contentTypeHeader,
    };
    const eventToken: string = await this.getData(
      page,
      startCaseCreationUrl,
      startCaseCreationHeaders,
    );

    const submitCaseUrl = `/data/case-types/PRLAPPS/cases?ignore-warning=false`;
    const data = {
      data: {
        caseTypeOfApplication: caseType,
        applicantOrganisationPolicy: null,
        applicantCaseName: "TEST",
      },
      draft_id: null,
      event: {
        id: "testingSupportDummySolicitorCreate",
        summary: "",
        description: "",
      },
      event_token: eventToken,
      ignore_warning: false,
    };
    const submitEventHeaders = {
      Accept:
        "application/vnd.uk.gov.hmcts.ccd-data-store-api.create-case.v2+json;charset=UTF-8",
      Experimental: this.contentTypeHeader,
      "Content-type": this.contentTypeHeader,
    };
    return await this.postData(
      page,
      submitCaseUrl,
      submitEventHeaders,
      JSON.stringify(data),
    );
  }

  /**
   * Function to get the token required for the event submission request
   * @param {Page} page the page to be used - this gives the API call its context
   * @param {string} url the url of the token request
   * @param {HeadersInit} headers the request headers
   * @returns {Promise<string>} the token to be used for an event submission request
   */
  private async getData(
    page: Page,
    url: string,
    headers: HeadersInit,
  ): Promise<string> {
    return await this.retryEvaluate<
      string,
      { url: string; headers: HeadersInit }
    >(
      page,
      async ({ url, headers }) => {
        const res = await fetch(url, {
          method: "GET",
          headers,
          credentials: "same-origin",
        });
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        const json = await res.json();
        return json.event_token;
      },
      { url, headers },
    );
  }

  /**
   * Function to post the event data of an event
   * @param {Page} page the page to be used - this gives the API call its context
   * @param {string} url the url of the event request
   * @param {HeadersInit} headers the request headers
   * @param {string} requestData the data required for the request
   * @returns {Promise<string>} the case reference
   */
  private async postData(
    page: Page,
    url: string,
    headers: HeadersInit,
    requestData: string,
  ): Promise<string> {
    return await this.retryEvaluate<
      string,
      { url: string; headers: HeadersInit; requestData: string }
    >(
      page,
      async ({ url, headers, requestData }) => {
        const res = await fetch(url, {
          method: "POST",
          body: requestData,
          headers,
        });
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        const json = await res.json();
        return json.id;
      },
      { url, headers, requestData },
    );
  }

  private async retryEvaluate<T, A>(
    page: Page,
    fn: (arg: never) => T | Promise<T>,
    arg: A,
    maxRetries: number = 3,
    delay: number = 1000,
  ): Promise<T> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await page.evaluate(fn, arg);
      } catch (error) {
        if (attempt === maxRetries) {
          console.error(
            `Page evaluate failed on final attempt (attempt ${attempt})`,
          );
          throw error;
        }
        console.warn(
          `Page evaluate failed (attempt ${attempt}), with ${error}, retrying in ${delay}ms`,
        );
        await page.waitForTimeout(delay);
      }
    }
    throw new Error("Unexpected error occurred");
  }
}
