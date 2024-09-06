
import { BasePage } from './base-page';

export class SearchCandidatesPage extends BasePage{
   constructor(page, clientPage){
    super(page)
    this.clientPage = clientPage;
   //  this.resetFiltersTextLinkField = page.getByText('Reset filters', {exact: true}) button does not work at the moment
    this.savedProfilesProfilesLinkField = page.getByText("List of saved profiles", {exact: true})
    this.noOfcandidateText = page.getByText('0 Candidate')
   //  this.bookmarkIconField = page.locator('.saveDeveloperWrapper > .MuiButtonBase-root').first()
    this.searchResultsContainer = page.locator('//div[@class="sc-eLExRp sc-cbkKFq fRZBq"]')
    this.skillsAddFilterTextLink = page.getByText('+ Add skill')
    this.skillInputField  = page.locator('#custom_select_input')


   }

   async clickSearchDevelopersOption(){
      await this.searchDevelopersField.click()
      await this.debounceDom(150, 450)
      
     
   }
   async listofSavedProfiles(){
      await this.savedProfilesProfilesLinkField.click()
   }
}