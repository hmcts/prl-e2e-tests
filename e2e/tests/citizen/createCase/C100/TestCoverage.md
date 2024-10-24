# C100 Citizen Journey Tests
This page is going to document the test coverage (with respect to variables used) through out the C100 Citizen Journey.

## Overview
Since the C100 citizen journey is very complicated, it has been split up into 4 separate journeys according to the Miro board.

## Journeys
All journeys start with first creating the case and then navigating through the screening sections.
### Top Row
This requires you to select 'true' for the c100ScreeningWrittenAgreementReview argument.
`c100ScreeningWrittenAgreementReview: true`

We will primarily select `true` or `yes` in this journey.

Coverage:
1. Type Of Order
   - Does not have any arguments
   - Select all checkboxes and move on
2. Consent Order Upload
   - Simple file upload, no arguments necessary
3. Urgency & Without Notice Order
   - Require boolean variable for yes to all or no to all
   - In the Top Row journey we will be selecting Yes to all
   - `urgencyAndWithoutNoticeAllOptionsYes: true`
4. People
   - Child Details
     - Has gender radios
     - Has yes/no/dontKnow radios
     - Has yes/no radios
     - Has sex radios 
   - Applicant Details
5. Confidentiality Agreement
   - `c100OthersKnowApplicantsContact: yesNoDontKnow`
     - Set to yes for this journey
   - `c100PrivateDetails: boolean`
     - Set to true + false for this journey
6. Case Parties
   - 3 types of details
     - Applicant Details
     - Respondent Details
     - Other details
   - Yes/No radios
   - Sex radios
   - Relationship Radios
     - Will test out mother, father, and guardian on this journey
   - digital/post radio (Can we treat this as yes/no?)
   - yes/no/dontKnow radios
7. Other Proceedings
   -Checkboxes and repeated pages
    - 2x boolean yes/no on each page
    - both set to true for this journey
8. Safety Concerns
   - yes/no boolean
     - If no: skip out whole section
     - If yes: go into safety concerns and see more yes/no booleans
   - Will be selecting yes to all for this journey
9. International Element
   - 4x yes/no radios
   - Will select yes to all here
   - `yesNoInternationalElements: true`
10. Reasonable Adjustments 
    - Loads of checkboxes 
    - No variables
11. Help with fees
    - boolean yes/no
    - If No: skip section,
    - If yes: next page, another yes/no radio

### Second Row
This requires you to select 'false' for the c100ScreeningWrittenAgreementReview argument.
`c100ScreeningWrittenAgreementReview: false`

We wil primarily select `false` or `no` in this journey
Coverage:
1. Screening sections
    - yes/no for court permission and legal respresentatove
      - both set to true for this journey
    - `c100LegalRepresentation: true`
    - `c100CourtPermissionNeeded: true`
2. MIAM
    - First boolean yes/no, are children involved in any proceedings
      - if yes: skip section
      - Will be hard-coded to true for this journey
3. Other Proceedings
      -Checkboxes and repeated pages
    - 2x boolean yes/no on each page
    - both set to false for this journey
4. Type Of Order
    - Does not have any arguments
    - Select all checkboxes and move on
5. Urgency & Without Notice Order
    - Require boolean variable for yes to all or no to all
    - In the Top Row journey we will be selecting no to all
    - `urgencyAndWithoutNoticeAllOptionsYes: false`
6. People
    - Child Details
        - Has gender radios
        - Has yes/no/dontKnow radios
        - Has yes/no radios
        - Has sex radios
    - Applicant Details
7. Confidentiality Agreement
    - `c100OthersKnowApplicantsContact: yesNoDontKnow`
        - Set to no for this journey
    - `c100PrivateDetails: boolean`
        - Set true + false for this journey
8. Case Parties
    - 3 types of details
        - Applicant Details
        - Respondent Details
        - Other details
    - Yes/No radios
    - Sex radios
    - Relationship Radios
        - Will test out special guardian on this journey
    - digital/post radio (Can we treat this as yes/no?)
    - yes/no/dontKnow radios
9. Safety Concerns
    - yes/no boolean
        - If no: skip out whole section
        - If yes: go into safety concerns and see more yes/no booleans
    - Will be selecting no to all for this journey
10. International Element
    - 4x yes/no radios
    - Will select no to all here
    - `yesNoInternationalElements: false`
11. Reasonable Adjustments
    - Loads of checkboxes
    - No variables
12. Help with fees
    - boolean yes/no
    - If No: skip section,
    - If yes: next page, another yes/no radio

### Third Row
This requires you to select 'false' for the c100ScreeningWrittenAgreementReview argument.
`c100ScreeningWrittenAgreementReview: false`

We wil primarily select `dontKnow` in this journey
Coverage:
1. Screening sections
    - yes/no for court permission and legal respresentatove
        - both set to true for this journey
    - `c100LegalRepresentation: true`
    - `c100CourtPermissionNeeded: false`
2. MIAM
    - First boolean yes/no, are children involved in any proceedings
        - Select no first
        - Next two booleans must be true for this journey
3. Type Of Order
    - Does not have any arguments
    - Select all checkboxes and move on
4. Urgency & Without Notice Order
    - Require boolean variable for yes to all or no to all
    - In the Top Row journey we will be selecting no to all
    - `urgencyAndWithoutNoticeAllOptionsYes: true`
5. People
    - Child Details
        - Has gender radios
        - Has yes/no/dontKnow radios
        - Has yes/no radios
        - Has sex radios
    - Applicant Details
6. Confidentiality Agreement
    - `c100OthersKnowApplicantsContact: yesNoDontKnow`
        - Set to dontKnow for this journey
    - `c100PrivateDetails: boolean`
        - Set true + false for this journey
7. Case Parties
    - 3 types of details
        - Applicant Details
        - Respondent Details
        - Other details
    - Yes/No radios
    - Sex radios
    - Relationship Radios
        - Will test out special guardian on this journey
    - digital/post radio (Can we treat this as yes/no?)
    - yes/no/dontKnow radios
8. Safety Concerns
    - yes/no boolean
        - If no: skip out whole section
        - If yes: go into safety concerns and see more yes/no booleans
    - Will be selecting yes to all for this journey
9. International Element
    - 4x yes/no radios
    - Will select yes to all here
    - `yesNoInternationalElements: false`
10. Reasonable Adjustments
    - Loads of checkboxes
    - No variables
11. Help with fees
    - boolean yes/no
    - If No: skip section,
    - If yes: next page, another yes/no radio
