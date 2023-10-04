import { test, expect} from '@playwright/test'
import   {  SearchCandidatesPage } from "../pages/search-candidates-page"


test.describe("Search Developers", () =>   {
    test("verify user can view list of saved profiles", async ({page}) => {
        const searchCandidates = new SearchCandidatesPage(page)
        await searchCandidates.clientLogin()
        await searchCandidates.clickSearchDevelopersOption()
        await searchCandidates.debounceDom(30, 350)
        await searchCandidates.listofSavedProfiles()
        await expect(searchCandidates.noOfcandidateText).toBeVisible() 
    });

})