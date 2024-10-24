# C100 Citizen Journey Tests
This page is going to document the test coverage (with respect to variables used) through out the C100 Citizen Journey.

## Overview
Since the C100 citizen journey is very complicated, it has been split up into 4 separate journeys according to the Miro board.

## Journeys
All journeys start with first creating the case and then navigating through the screening sections.
### Top Row
This requires you to select 'true' for the c100ScreeningWrittenAgreementReview argument.
- `c100ScreeningWrittenAgreementReview: true`

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
     - Set to true for this journey
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
7. Safety Concerns
   - yes/no boolean
     - If no: skip out whole section
     - If yes: go into safety concerns and see more yes/no booleans
   - Will be selecting yes to all for this journey
8. International Element
   -