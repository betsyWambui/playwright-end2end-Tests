import dotenv from 'dotenv';
import path from 'path';
import { CandidatePage } from "../pages/candidates-page";
import { test, expect} from '@playwright/test';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });
test.describe("Candidate Testcases", () =>   {
    let candidate;
   test.beforeEach( async({page})=>{
      candidate = new CandidatePage(page)
      await  candidate.loginUser(process.env.CANDIDATEEMAIL, process.env.CANDIDATEPASSWORD)
   })

    test("verify candidate can edit the bio field on their profile", async ({page}) => {
        await candidate.activateBioeditMode()
        await expect(candidate.updatedBioview).toHaveText("hellotest")
    }) 

})   
