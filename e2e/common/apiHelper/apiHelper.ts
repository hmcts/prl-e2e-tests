import { APIRequestContext, request } from "@playwright/test";
import Config from "../../config.ts";

class CaseManagerAPI {
  static createCase(arg0: string, newSwanseaLocalAuthorityUserOne: any): string | PromiseLike<string> {
      throw new Error("Case creation not implemented.");
  }
  private baseUrl: string;
  private apiContext: APIRequestContext;

  constructor(apiContext: APIRequestContext) {
    this.baseUrl = Config.urlConfig.default.serviceUrl;
    this.apiContext = apiContext;
  }

  // Get access token
  private async getAccessToken(user: {
    email: string;
    password: string;
  }): Promise<string | undefined> {
    try {
      const url = `${Config.urlConfig.idamUrl}/loginUser?username=${user.email}&password=${user.password}`;
      const response = await this.apiContext.post(url, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const responseBody = await response.json();
      return responseBody.access_token;
    } catch (error) {
      this.handleError(error);
    }
  }

  // General API request
  private async apiRequest(
    postURL: string,
    authUser: { email: string; password: string },
    method: string = "GET",
    data: any = {},
  ) {
    const accessToken = await this.getAccessToken(authUser);
    if (!accessToken) return;

    const requestConfig: any = {
      method: method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    if (method === "POST") {
      requestConfig.data = JSON.stringify(data);
    }

    try {
      const response = await this.apiContext.fetch(postURL, requestConfig);
      return response.json();
    } catch (error) {
      this.handleError(error);
    }
  }

  // Create a case
  public async createCase(
    caseName: string = "e2e UI Test",
    user: { email: string; password: string },
  ): Promise<string | undefined> {
    const url = `${this.baseUrl}/testing-support/case/create`;
    const data = { caseName };

    try {
      const response = await this.apiRequest(url, user, "POST", data);
      return response.id;
    } catch (error) {
      console.log(error);
    }
  }

  // Method to update a case - to be amended/used once apihelper is working
//   public async updateCase(
//     caseName: string = "e2e Test",
//     caseID: string,
//     caseDataJson: any,
//   ) {
//     try {
//       const docDetail = await this.apiRequest(
//         `${this.baseUrl}/testing-support/test-document`,
//         systemUpdateUser,
//       );

//       const docParameter = {
//         TEST_DOCUMENT_URL: docDetail.document_url,
//         TEST_DOCUMENT_BINARY_URL: docDetail.document_binary_url,
//       };

//       const dateTime = new Date().toISOString();
//       caseDataJson.caseData.caseName = caseName;
//       caseDataJson.caseData.dateSubmitted = dateTime.slice(0, 10);
//       caseDataJson.caseData.dateAndTimeSubmitted = dateTime.slice(0, -1);

//       const data = lodash.template(JSON.stringify(caseDataJson))(docParameter);
//       const postURL = `${this.baseUrl}/testing-support/case/populate/${caseID}`;

//       await this.apiRequest(postURL, systemUpdateUser, "POST", data);
//     } catch (error) {
//       console.log(error);
//     }
//   }

  // Give access to a case - to be amended/used once apihelper is working
  // public async giveAccessToCase(
  //   caseID: string,
  //   user: { email: string; password: string },
  //   role: string,
  // ) {
  //   const data = {
  //     email: user.email,
  //     password: user.password,
  //     role: role,
  //   };
  //
  //   const postURL = `${this.baseUrl}/testing-support/case/${caseID}/access`;
  //
  //   try {
  //     await this.apiRequest(postURL, systemUpdateUser, "POST", data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // Error handling
  private handleError(error: any) {
    console.error(`Error: ${error}`);
  }
}

export { CaseManagerAPI };