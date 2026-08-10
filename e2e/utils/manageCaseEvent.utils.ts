import {
  LOCAL_COURTS,
  LocalCourtInfo,
  OrderTypes,
  solicitorCaseCreateType,
  UserCredentials,
} from "../common/types.ts";
import { CommonCaseEventUtils } from "./commonCaseEvent.utils.ts";
import {
  AmendDischargedVariedOrderActionData,
  ChildArrangementsOrderActionData,
  ManageOrdersRequestData,
  ParentalResponsibilityOrderActionData,
  PowerOfArrestOrderActionData,
} from "../testData/api/manageOrdersRequestData.ts";
import {
  C100SoaWithoutOrderRequestData,
  Fl401SoaWithoutOrderRequestData,
} from "../testData/api/soaRequestData.ts";
import {
  SolicitorDraftNonMolestationOrderData,
  SolicitorDraftParentalResponsibilityOrderData,
} from "../testData/api/solicitorDraftOrderRequestData.ts";
import Config from "./config.utils.ts";
import { DateHelperUtils } from "./dateHelpers.utils.ts";

type OrderCreationUsers = "caseWorker" | "judge";

/**
 * Send to gatekeeper event parameters.
 */
interface SendToGatekeeperParams {
  /** If the case should be sent to a specific gatekeeper user */
  isSpecificGatekeeper: boolean;
  /** If should the event should be sent to a judge. If false then send to a legal adviser */
  isJudge?: boolean;
}

/**
 * Options for creating an order.
 */
interface OrderOptions {
  /** The case reference of the case. */
  caseRef: string;
  /** The order type. */
  orderType: OrderTypes;
  /** If the order to be created should be a draft order. If false then the order will be final. */
  isDraft: boolean;
  /** If the order should be served as part of the manage orders event. If false the order will be saved instead. */
  doServe: boolean;
  /** The role of the user creating the order*/
  user?: OrderCreationUsers;
}

export interface BasicCaseData {
  caseRef: string;
  caseName: string;
}

export class ManageCaseEventUtils {
  constructor(
    private commonCaseEventsUtils: CommonCaseEventUtils,
    private dateHelperUtils: DateHelperUtils,
  ) {}

  /**
   * Creates and submits an FL401 or C100 testing support solicitor case via API requests.
   *
   * @param caseType the type of case either C100 or Fl401.
   * @returns the case reference and case name of the created testing support Solicitor case.
   */
  public async submitTSSolicitorCase(
    caseType: solicitorCaseCreateType,
  ): Promise<BasicCaseData> {
    const userCredentials: UserCredentials = {
      email: process.env.SOLICITOR_USERNAME,
      password: process.env.SOLICITOR_PASSWORD,
    };

    const caseData: BasicCaseData =
      await this.createDraftTSSolicitorCase(caseType);

    if (caseType === "C100") {
      await this.commonCaseEventsUtils.completeEvent({
        caseRef: caseData.caseRef,
        eventId: "submitAndPay",
        eventData: {
          data: {
            confidentialityDisclaimer: {
              confidentialityChecksChecked: ["confidentialityChecksChecked"],
            },
            applicantSolicitorEmailAddress: process.env
              .SOLICITOR_USERNAME as string,
            caseworkerEmailAddress: process.env.CASEWORKER_USERNAME as string,
            courtName: "Central Family Court",
            solicitorName:
              process.env.MANAGE_CASES_TEST_ENV === "demo"
                ? "PRL DEMO ORG1 Solicitor 2"
                : "AAT Solicitor",
            payAgreeStatement: ["agree"],
            feeAmount: "£270.00",
            helpWithFees: "No",
          },
        },
        userCredentials: userCredentials,
      });
      await this.commonCaseEventsUtils.completeEvent({
        caseRef: caseData.caseRef,
        eventId: "testingSupportPaymentSuccessCallback",
        eventData: {
          data: {},
        },
        userCredentials: userCredentials,
      });
    } else {
      const date = this.dateHelperUtils.todayDate(false, true, true);
      await this.commonCaseEventsUtils.completeEvent({
        caseRef: caseData.caseRef,
        eventId: "fl401StatementOfTruthAndSubmit",
        eventData: {
          data: {
            fl401StmtOfTruth: {
              date: `${date[2]}-${date[1]}-${date[0]}`,
              fullname: "test name",
              nameOfFirm: "test form",
              signOnBehalf: "test position",
              signature: null,
              applicantConsent: ["fl401Consent"],
            },
            fl401ConfidentialityCheck: {
              confidentialityConsent: ["fl401ConfidentialConsent"],
            },
            submitCountyCourtSelection: {
              value: {
                code: "234946:",
                label:
                  "Swansea Civil Justice Centre - Quay West, Quay Parade - SA1 1SP",
              },
            },
          },
        },
        userCredentials: userCredentials,
      });
    }

    return caseData;
  }

  /**
   * Creates an FL401 or C100 testing support solicitor case via API request.
   *
   * @param caseType the type of case either C100 or Fl401.
   * @param userCredentials the user information (email and password) of the user submitting the request. Defaults to solicitor user credentials.
   * @returns the case reference and case name of the created testing support Solicitor case.
   */
  async createDraftTSSolicitorCase(
    caseType: solicitorCaseCreateType,
    userCredentials: UserCredentials = {
      email: process.env.SOLICITOR_USERNAME,
      password: process.env.SOLICITOR_PASSWORD,
    },
  ): Promise<BasicCaseData> {
    const bearerToken =
      await this.commonCaseEventsUtils.getBearerToken(userCredentials);

    const s2sToken =
      await this.commonCaseEventsUtils.getServiceToken("prl_cos_api");

    const userDetails = await this.commonCaseEventsUtils.getUserDetails(
      userCredentials.email,
    );

    const eventToken = await this.commonCaseEventsUtils.retry({
      fn: () =>
        this.commonCaseEventsUtils.withApiContext(async (api) => {
          const url =
            `${process.env.CCD_DATA_STORE_URL}/caseworkers/${userDetails.id}` +
            `/jurisdictions/PRIVATELAW/case-types/PRLAPPS` +
            `/event-triggers/testingSupportDummySolicitorCreate/token`;

          const response = await api.get(url, {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
              ServiceAuthorization: `Bearer ${s2sToken}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok()) {
            throw new Error(
              `HTTP ${response.status()} -> Failed to fetch TS support event token: ${await response.text()}`,
            );
          }

          const { token } = await response.json();
          return token;
        }),
      description: `Get event token for creating draft ${caseType} TS case`,
    });

    const timestamp = Date.now().toString().slice(-6);
    const randomNumber = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    const caseName = `TEST-${timestamp}${randomNumber}`;

    const responseJson = await this.commonCaseEventsUtils.retry({
      fn: () =>
        this.commonCaseEventsUtils.withApiContext(async (api) => {
          const response = await api.post(
            `${process.env.CCD_DATA_STORE_URL}/caseworkers/${userDetails.id}/jurisdictions/PRIVATELAW/case-types/PRLAPPS/cases`,
            {
              headers: {
                Authorization: `Bearer ${bearerToken}`,
                ServiceAuthorization: `Bearer ${s2sToken}`,
                "Content-Type": "application/json",
              },
              data: {
                data: {
                  caseTypeOfApplication: caseType,
                  applicantOrganisationPolicy: null,
                  applicantCaseName: caseName,
                },
                draft_id: null,
                event: {
                  id: "testingSupportDummySolicitorCreate",
                  summary: "",
                  description: "",
                },
                event_token: eventToken,
                ignore_warning: false,
              },
            },
          );

          if (!response.ok()) {
            throw new Error(
              `HTTP ${response.status()} -> Failed to create TS support case: ${await response.text()}`,
            );
          }

          return response.json();
        }),
      description: `Submit event create draft ${caseType} TS case`,
    });

    if (process.env.PWDEBUG) {
      console.log("Finished creating draft case:", responseJson.id);
    }

    return {
      caseRef: String(responseJson.id),
      caseName,
    };
  }

  /**
   * Complete issue and send to local court event for a C100 case via API request.
   *
   * @param caseRef the case reference.
   * @param localCourtInfo the court information of the court where the case will be issued - uses a static list LOCAL_COURTS. Defaults to `LOCAL_COURTS.swansea`.
   */
  async issueAndSendToLocalCourt(
    caseRef: string,
    localCourtInfo: LocalCourtInfo = LOCAL_COURTS.swansea,
  ): Promise<void> {
    await this.commonCaseEventsUtils.completeEvent({
      caseRef: caseRef,
      eventId: "issueAndSendToLocalCourtCallback",
      eventData: {
        data: {
          courtList: {
            value: {
              code: localCourtInfo.code,
              label: localCourtInfo.label,
            },
          },
        },
      },
      userCredentials: {
        email: process.env.COURT_ADMIN_STOKE_USERNAME as string,
        password: process.env.COURT_ADMIN_STOKE_PASSWORD as string,
      },
    });
  }

  /**
   * Complete add case number event for an FL401 case via API request.
   *
   * @param caseRef the case reference.
   * @param familyManNumber the family man number for the case. Defaults to `"1234"`.
   */
  async addFamilyManNumber(
    caseRef: string,
    familyManNumber: string = "1234",
  ): Promise<void> {
    await this.commonCaseEventsUtils.completeEvent({
      caseRef: caseRef,
      eventId: "fl401AddCaseNumber",
      eventData: {
        data: {
          familymanCaseNumber: familyManNumber,
        },
      },
      userCredentials: {
        email: process.env.CASEWORKER_USERNAME as string,
        password: process.env.CASEWORKER_PASSWORD as string,
      },
    });
  }

  /**
   * Complete send to gatekeeper event for an FL401 or C100 case via API request.
   *
   * @param caseRef the case reference.
   * @param caseType the type of case either C100 or Fl401.
   * @param sendToGatekeeperParams the parameters for the gatekeeping event - determines if the case is sent to a specific user and if so which user.
   */
  async sendToGatekeeper(
    caseRef: string,
    caseType: solicitorCaseCreateType,
    sendToGatekeeperParams: SendToGatekeeperParams = {
      isSpecificGatekeeper: false,
      isJudge: false,
    },
  ): Promise<void> {
    let eventData;
    if (sendToGatekeeperParams.isSpecificGatekeeper) {
      if (sendToGatekeeperParams.isJudge) {
        const judgeUserDetails =
          await this.commonCaseEventsUtils.getUserDetails(
            process.env.JUDGE_USERNAME,
          );

        eventData = {
          data: {
            isJudgeOrLegalAdviserGatekeeping: "judge",
            isSpecificGateKeeperNeeded: "Yes",
            judgeName: {
              idamId: judgeUserDetails.id as string,
              personalCode: "4923961", // this is the same for the static judge across AAT and DEMO
            },
          },
        };
      } else {
        // TODO: fix - for some reason the legal adviser request succeeds but the role doesn't get added correctly
        const laUserDetails = await this.commonCaseEventsUtils.getUserDetails(
          process.env.LEGALADVISOR_USERNAME,
        );

        eventData = {
          data: {
            isJudgeOrLegalAdviserGatekeeping: "legalAdviser",
            isSpecificGateKeeperNeeded: "Yes",
            legalAdviserList: {
              value: {
                code: `${laUserDetails.surname}(${laUserDetails.email})`,
                label: `${laUserDetails.surname}(${laUserDetails.email})`,
              },
            },
          },
        };
      }
    } else {
      eventData = {
        data: {
          isSpecificGateKeeperNeeded: "No",
        },
      };
    }

    await this.commonCaseEventsUtils.completeEvent({
      caseRef: caseRef,
      eventId:
        caseType === "C100" ? "sendToGateKeeper" : "fl401SendToGateKeeper",
      eventData: eventData,
      userCredentials: {
        email: process.env.CASEWORKER_USERNAME as string,
        password: process.env.CASEWORKER_PASSWORD as string,
      },
    });
  }

  /**
   * Complete the manage orders event for an FL401 or C100 case via API request.
   *
   * @param options the options used to create the order.
   */
  async createOrder({
    caseRef,
    orderType,
    isDraft,
    doServe,
    user = "caseWorker",
  }: OrderOptions): Promise<void> {
    let orderActionData: ManageOrdersRequestData;
    switch (orderType) {
      case "Power of arrest (FL406)":
        orderActionData = PowerOfArrestOrderActionData;
        break;
      case "Amended, discharged or varied order (FL404B)":
        orderActionData = AmendDischargedVariedOrderActionData;
        break;
      case "Child arrangements, specific issue or prohibited steps order (C43)":
        orderActionData = ChildArrangementsOrderActionData;
        break;
      case "Parental responsibility order (C45A)":
        orderActionData = ParentalResponsibilityOrderActionData;
        break;
      default:
        throw new Error(
          `Unexpected order type when fetching order data: ${orderType}`,
        );
    }

    const { email, password } = Config.userCredentials[user];

    await this.commonCaseEventsUtils.completeEvent({
      caseRef: caseRef,
      eventId: "manageOrders",
      eventData: this.getOrderData(orderActionData, isDraft, doServe, user),
      userCredentials: {
        email: email,
        password: password,
      },
    });
  }

  private getOrderData(
    orderData: ManageOrdersRequestData,
    isDraft: boolean,
    doServe: boolean,
    user: OrderCreationUsers,
  ) {
    if (isDraft) {
      if (user === "caseWorker") {
        return orderData?.caseWorkerDraftOrderData;
      } else {
        return orderData?.judgeDraftOrderData;
      }
    } else if (!isDraft && !doServe) {
      return orderData?.finalOrderData;
    } else {
      return orderData?.createAndServeOrderData;
    }
  }

  //WIP - Not working due to header param - client-context which is getting generated from Exui and being passed to task-management.
  /**
   * Complete the edit and approve orders event for an FL401 or C100 case via API request.
   */
  async editAndApproveOrder(
    caseRef: string,
    orderType: OrderTypes,
    user = "judge",
  ): Promise<void> {
    let orderActionData: ManageOrdersRequestData;
    switch (orderType) {
      case "Parental responsibility order (C45A)":
        orderActionData = ParentalResponsibilityOrderActionData;
        break;
      default:
        throw new Error(
          `Unexpected order type when fetching order data: ${orderType}`,
        );
    }

    const { email, password } = Config.userCredentials[user];

    await this.commonCaseEventsUtils.completeEvent({
      caseRef: caseRef,
      eventId: "editAndApproveAnOrder",
      eventData: orderActionData.judgeEditAndApproveDraftedOrderData,
      userCredentials: {
        email: email,
        password: password,
      },
    });
  }

  async createSolicitorDraftOrder(
    caseRef: string,
    orderType: OrderTypes,
  ): Promise<void> {
    let eventData;
    switch (orderType) {
      case "Parental responsibility order (C45A)":
        eventData = SolicitorDraftParentalResponsibilityOrderData;
        break;
      case "Non-molestation order (FL404A)":
        eventData = SolicitorDraftNonMolestationOrderData;
        break;
      default:
        throw new Error(
          `Unexpected order type when fetching solicitor draft order data: ${orderType}`,
        );
    }

    await this.commonCaseEventsUtils.completeEvent({
      caseRef: caseRef,
      eventId: "draftAnOrder",
      eventData: eventData,
      userCredentials: {
        email: process.env.SOLICITOR_USERNAME as string,
        password: process.env.SOLICITOR_PASSWORD as string,
      },
    });
  }

  /**
   * Complete the service of application event for an FL401 or C100 case via API request.
   *
   * @param caseRef the case reference.
   * @param caseType the type of case either C100 or Fl401.
   * @param orderType the type of order to be created. If omitted the event is completed without an order attached.
   */
  async serviceOfApplication(
    caseRef: string,
    caseType: solicitorCaseCreateType,
    orderType?: OrderTypes,
  ): Promise<void> {
    let eventData;

    if (caseType === "C100") {
      eventData = C100SoaWithoutOrderRequestData;
    } else {
      eventData = Fl401SoaWithoutOrderRequestData;
    }

    if (orderType) {
      const caseInfo = await this.commonCaseEventsUtils.getCaseInfo(caseRef);
      const orderId: string = caseInfo.data.orderCollection[0].id;
      eventData = {
        data: {
          ...eventData.data,
          serviceOfApplicationScreen1: {
            value: [
              {
                code: orderId,
                label: orderType,
              },
            ],
          },
          soaIsOrderListEmpty: "No",
        },
      };
    }

    await this.commonCaseEventsUtils.completeEvent({
      caseRef: caseRef,
      eventId: "serviceOfApplication",
      eventData: eventData,
      userCredentials: {
        email: process.env.CASEWORKER_USERNAME as string,
        password: process.env.CASEWORKER_PASSWORD as string,
      },
    });
  }

  /**
   * Complete the confidentiality check event for an FL401 or C100 case via API request.
   *
   * @param caseRef the case reference.
   * @param isRejected if the check is accepted or rejected. Defaults to `false`.
   */
  async confidentialityCheck(
    caseRef: string,
    isRejected: boolean = false,
  ): Promise<void> {
    let eventData;
    if (isRejected) {
      eventData = {
        data: {
          applicationServedYesNo: "No",
          rejectionReason: "Test rejection reason",
        },
      };
    } else {
      eventData = {
        data: {
          applicationServedYesNo: "Yes",
          responsibleForService: "courtAdmin",
        },
      };
    }

    await this.commonCaseEventsUtils.completeEvent({
      caseRef: caseRef,
      eventId: "confidentialityCheck",
      eventData: eventData,
      userCredentials: {
        email: process.env.CASEMANAGER_USERNAME as string,
        password: process.env.CASEMANAGER_PASSWORD as string,
      },
    });
  }
}
