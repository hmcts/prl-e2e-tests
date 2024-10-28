export enum RespondentDetailsPersonalDetailsContent {
  pageTitle = "Provide details for", //dynamic content (xl)
  h21 = "Have they changed their name?", //fieldset[aria-describedby='hasNameChanged-hint'] legend[class='govuk-fieldset__legend govuk-fieldset__legend--m']
  h22 = "Date of birth",//fieldset[role='group'] legend[class='govuk-fieldset__legend govuk-fieldset__legend--m']
  hint1 = "For example, through marriage or adoption or by deed poll. This includes first name, surname and any middle names",
  hint2 = "For example, town or city",
  label1 = "Yes",
  label2 = "No",
  label3 = "Don't know",
  label4 = "Female",
  label5 = "Male",
  label6 = "They identify in another way",
  label7 = "Day", //#dateOfBirth > div:nth-child(1) > div > label //#approxDateOfBirth > div:nth-child(1) > div > label
  label8 = "Month",//#dateOfBirth > div:nth-child(2) > div > label //#approxDateOfBirth > div:nth-child(2) > div > label
  label9 = "Year",//#dateOfBirth > div:nth-child(3) > div > label //#approxDateOfBirth > div:nth-child(3) > div > label
  label10 = "I don’t know their date of birth",
  label11 = "Place of birth",
  label12 = "I don’t know their place of birth",
  hiddenlabel1 = "Enter their previous name",
  hiddenlabel2 = "Respondent's gender (Optional)",
  hiddenlabel3 = "Approximate date of birth", //#conditional-isDateOfBirthUnknown > div > fieldset > legend
  hiddenhint1 = "This should be the full legal name (including any middle names)",


}