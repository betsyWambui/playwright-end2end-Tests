
import { BasePage } from './base-page';

export class SearchCandidatesPage extends BasePage{
   constructor(page){
    super(page)
   //  this.resetFiltersTextLinkField = page.getByText('Reset filters', {exact: true}) button does not work at the moment
    this.savedProfilesProfilesLinkField = page.getByText("List of saved profiles", {exact: true})
    this.noOfcandidateText = page.getByText('0 Candidate')
    this.bookmarkIconField = page.locator('.saveDeveloperWrapper > .MuiButtonBase-root').first()
    this.searchResultsContainer = page.locator('//div[@class="sc-eLExRp sc-cbkKFq fRZBq"]')
    this.defaultJobTextField = page.getByText('Default Job')
    this.skillsAddFilterTextLink = page.getByText('+ Add skill')
    this.skillInputField  = page.locator('#custom_select_input')


   }

   async clickSearchDevelopersOption(){
      await this.debounceDom(100, 350)
      await this.searchDevelopersField.click()
      
     
   }
   async listofSavedProfiles(){
      await this.savedProfilesProfilesLinkField.click()
   }

   async addSkillFilteronSearchFilters(){
      await this.skillInputField.fill('Javascript')
      await this.skillsAddFilterTextLink.click()
      await this.skillInputField.fill('React')
      await this.skillsAddFilterTextLink.click()
   }
   async clickOnBookMarkIconButton(){
     await this.searchResultsContainer.isVisible()
     await this.bookmarkIconField.click()
   }
}