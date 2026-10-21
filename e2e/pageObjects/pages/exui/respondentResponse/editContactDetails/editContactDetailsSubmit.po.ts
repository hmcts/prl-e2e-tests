import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText.js";
import { RespondentResponseSubmitPage } from "../respondentResponseSubmit.po.js";
import {
  EditContactDetailsParams,
  LivesInRefuge,
} from "./editContactDetails1.po.js";

const REFUGE_ANSWER: Record<EditContactDetailsParams["livesInRefuge"], string> =
  {
    [LivesInRefuge.yes]: "Yes",
    [LivesInRefuge.no]: "No",
    [LivesInRefuge.dontKnow]: "I don't know",
  };

const MONTHS: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Check your answers for "Edit contact details" (c100ResSolConfirmOrEditContactDetailsA/submit)
export class EditContactDetailsSubmitPage extends RespondentResponseSubmitPage {
  constructor(page: Page) {
    super(page, "Edit contact details");
  }

  /** Asserts the page, compares the answers table with its snapshot and checks every answer. */
  async assertAnswers(
    params: EditContactDetailsParams,
    snapshotPath: string[],
    snapshotName: string,
  ): Promise<void> {
    await this.assertPageContents(snapshotPath, snapshotName);

    const { day, month, year } = params.dateOfBirth;
    const answers: [string, string][] = [
      ["*First name", params.firstName],
      ["*Last name", params.lastName],
      ["*Date of birth", `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`],
      ["*Place of birth", params.placeOfBirth],
      [
        "*Does the respondent currently live in a refuge?",
        REFUGE_ANSWER[params.livesInRefuge],
      ],
      ["Building and Street", params.address.buildingAndStreet],
      ["Town or City", params.address.townOrCity],
      ["Postcode/Zipcode", params.address.postcode],
      ["Country", params.address.country],
      [
        "*Has the respondent lived at this address for more than 5 years?",
        params.livedAtAddressMoreThan5Years
          ? CommonStaticText.yes
          : CommonStaticText.no,
      ],
      ["*Telephone number", params.phoneNumber],
      ["*Email address", params.email],
    ];
    if (params.previousName) {
      answers.push(["Previous names, if any", params.previousName]);
    }
    await this.assertAnswerRows(answers);
  }
}
