import { Locator, Page } from '@playwright/test';
import { EventPage } from '../../eventPage.po.ts';

export class ManageOrder28Page extends EventPage {
  readonly page: Page;

  // --- Selectors ---
  readonly personallyServedRadio: (choice: 'Yes' | 'No' | 'Not applicable') => Locator;
  readonly responsibilityRadio: (option: "Applicant's legal representative" | "Court bailiff" | "Court admin") => Locator;
  readonly otherPeopleCheckbox: (name: string) => Locator;
  readonly cafcassCymruRadio: (choice: 'Yes' | 'No') => Locator;
  readonly anotherOrganisationCheckbox: Locator;

  constructor(page: Page) {
    super(page, "Manage Orders");
    this.page = page;

    // "Does this order need to be personally served on the respondent?"
    this.personallyServedRadio = (choice) => 
      page.getByRole('group', { name: 'Does this order need to be personally served' })
          .getByLabel(choice, { exact: true });

    // "Who is responsible for serving the respondent?"
    this.responsibilityRadio = (option) => 
      page.getByRole('group', { name: 'Who is responsible for serving the respondent' })
          .getByText(option, { exact: false });

    // "Which other people in the case should the order be sent to?"
    this.otherPeopleCheckbox = (name) => 
      page.getByRole('checkbox', { name: name, exact: false });

    // "Does Cafcass Cymru need to be served?"
    this.cafcassCymruRadio = (choice) => 
      page.getByRole('group', { name: 'Does Cafcass Cymru need to be served' })
          .getByLabel(choice, { exact: true });

    // "Another organisation (optional)"
    this.anotherOrganisationCheckbox = page.getByLabel('Another organisation (optional)');
  }

  // --- Action Methods ---

  async setPersonallyServed(choice: 'Yes' | 'No' | 'Not applicable') {
    await this.personallyServedRadio(choice).check();
  }

  async setServiceResponsibility(option: "Applicant's legal representative" | "Court bailiff" | "Court admin") {
    await this.responsibilityRadio(option).click();
  }

  async toggleOtherPerson(name: string, checked: boolean) {
    await this.otherPeopleCheckbox(name).setChecked(checked);
  }

  async setServeCafcassCymru(choice: 'Yes' | 'No') {
    await this.cafcassCymruRadio(choice).check();
  }

  async toggleAnotherOrganisation(checked: boolean) {
    await this.anotherOrganisationCheckbox.setChecked(checked);
  }

  async submitServiceDetails(params: {
    personallyServed: 'Yes' | 'No' | 'Not applicable';
    responsibility: "Applicant's legal representative" | "Court bailiff" | "Court admin";
    serveCafcass: 'Yes' | 'No';
    otherPeople?: string[]; // Optional: list of names to check
  }): Promise<void> {
    await this.setPersonallyServed(params.personallyServed);
    await this.setServiceResponsibility(params.responsibility);
    await this.setServeCafcassCymru(params.serveCafcass);

    // If specific people are provided, check them
    if (params.otherPeople) {
      for (const name of params.otherPeople) {
        await this.toggleOtherPerson(name, true);
      }
    }
    await this.clickContinue();
  }
}