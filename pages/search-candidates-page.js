
import { BasePage } from './base-page';

export class SearchCandidatesPage extends BasePage{
   constructor(page){
    super(page)
   //  this.resetFiltersTextLinkField = page.getByText('Reset filters', {exact: true}) button does not work at the moment
    this.savedProfilesProfilesLinkField = page.getByText("List of saved profiles", {exact: true})
    this.noOfcandidateText = page.getByText('0 Candidate')
    this.bookmarkIconField = page.locator('(//button[@type="button"])[9]')
    this.searchResultsContainer = page.locator('//div[@class="sc-eLExRp sc-cbkKFq fRZBq"]')
    this.defaultJobTextField = page.getByText('Default Job')
    this.skillsAddFilterTextLink = page.getByText('+ Add skill')
    this.skillInputField  =page.locator('#custom_select_input')


   }

   async clickSearchDevelopersOption(){
      this.searchDevelopersField.click()
      this.defaultJobTextField.click()
   }
   async listofSavedProfiles(){
      this.savedProfilesProfilesLinkField.click()
   }

   addSkillFilteronSearchFilters(){
      this.skillInputField.fill('Javascript')
      this.skillsAddFilterTextLink.click()
      this.skillInputField.fill('React')
      this.skillsAddFilterTextLink.click()
   }
   async clickOnBookMarkIconButton(){
      this.page.waitForSelector(this.searchResultsContainer)
      this.bookmarkIconField.click()
   }
}