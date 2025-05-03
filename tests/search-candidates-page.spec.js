import { test, expect} from '@playwright/test'
import   {  SearchCandidatesPage } from "../pages/search-candidates-page"
import { beforeEach } from 'node:test';


test.describe("Search Developers", () =>   {
    let searchCandidates;
    beforeEach(async () => {
        searchCandidates = new SearchCandidatesPage(page)
        await searchCandidates.loginUser()
    })
    test("verify user can view list of saved profiles", async ({page}) => {
       
        await searchCandidates.clickSearchDevelopersOption()
        await searchCandidates.listofSavedProfiles()
        await expect(searchCandidates.noOfcandidateText).toBeVisible() 
    });
})
