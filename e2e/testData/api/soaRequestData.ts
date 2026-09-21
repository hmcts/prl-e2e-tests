export const C100SoaWithoutOrderRequestData = {
  data: {
    isConfidential: "Yes",
    serviceOfApplicationScreen1: null,
    specialArrangementsLetter:
      process.env.MANAGE_CASES_TEST_ENV === "demo"
        ? {
            document_url:
              "http://dm-store-demo.service.core-compute-demo.internal/documents/230db177-a3aa-4a3c-b70d-db1fd434a72d",
            document_binary_url:
              "http://dm-store-demo.service.core-compute-demo.internal/documents/230db177-a3aa-4a3c-b70d-db1fd434a72d/binary",
            document_filename: "Special arrangements letter.docx",
          }
        : {
            document_url:
              "http://dm-store-aat.service.core-compute-aat.internal/documents/91ca4ef0-2c88-43cb-a177-50b38db0501b",
            document_binary_url:
              "http://dm-store-aat.service.core-compute-aat.internal/documents/91ca4ef0-2c88-43cb-a177-50b38db0501b/binary",
            document_filename: "Special arrangements letter.docx",
          },
    caseTypeOfApplication: "C100",
    soaIsOrderListEmpty: "Yes",
    displayLegalRepOption: "Yes",
    soaServeToRespondentOptions: "Yes",
    soaServingRespondentsOptions: "courtAdmin",
    soaCafcassCymruServedOptions: "No",
    soaServeLocalAuthorityYesOrNo: "No",
  },
};

export const Fl401SoaWithoutOrderRequestData = {
  data: {
    isConfidential: "Yes",
    serviceOfApplicationScreen1: null,
    noticeOfSafetySupportLetter:
      process.env.MANAGE_CASES_TEST_ENV === "demo"
        ? {
            document_url:
              "http://dm-store-demo.service.core-compute-demo.internal/documents/045c59dd-d67c-4b3a-8a9e-9820dbbd9db2",
            document_binary_url:
              "http://dm-store-demo.service.core-compute-demo.internal/documents/045c59dd-d67c-4b3a-8a9e-9820dbbd9db2/binary",
            document_filename: "Safety Letter.docx",
          }
        : {
            document_url:
              "http://dm-store-aat.service.core-compute-aat.internal/documents/4425c460-84b0-47b0-99b0-667222368283",
            document_binary_url:
              "http://dm-store-aat.service.core-compute-aat.internal/documents/4425c460-84b0-47b0-99b0-667222368283/binary",
            document_filename: "Safety Letter.docx",
          },
    caseTypeOfApplication: "FL401",
    soaIsOrderListEmpty: "Yes",
    displayLegalRepOption: "Yes",
    soaServeToRespondentOptionsDA: "Yes",
    soaServingRespondentsOptions: "courtAdmin",
  },
};
