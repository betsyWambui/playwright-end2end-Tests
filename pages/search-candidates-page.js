
import { BasePage } from './base-page';


export class SearchCandidatesPage extends BasePage{
   constructor(page){
    super(page)
    this.resetFiltersTextLinkField = page.getByText('Reset filters', {exact: true})
    this.savedProfilesProfilesLinkField = page.getByText("List of saved profiles", {exact: true})
    this.noOfcandidateText = page.getByText('0 Candidate')

   }

   async clickSearchDevelopersOption(){
      this.searchDevelopersField.click()
   }
   async listofSavedProfiles(){
      this.savedProfilesProfilesLinkField.click()
   }
}