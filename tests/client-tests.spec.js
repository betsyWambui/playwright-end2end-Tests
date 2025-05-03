// @ts-check
import {faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import path from 'path'
import { test, expect} from '@playwright/test';
import   {  ClientPage } from "../pages/client-page"

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

test.describe("MarketPlace Onboarding Client", () => {

    test("Verify a new client can go through the RM developer services onboarding process", async({page}) => {
        const client = new ClientPage(page)
        await client.gotoRemoteMoreWebsite()
        await client.clickCompaniesLink()
        const companyEmail = faker.internet.email({provider: 'companyEmail.com'})
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
        const companyName = faker.company.name()
        const phoneNumber = faker.phone.number().replace('/-/g', '')
        const password = faker.internet.password()
        await client.signUpUser(companyEmail, password)
        await client.addBasicInfo(firstName, lastName, companyName, phoneNumber)
        await client.selectTechncialSkills()
        await client.selectYearsOfExperience()
        await client.selectHoursPerWeek()
        await client.selectMaximumBudget()
        await client.debounceDom(1000, 1000)
        await expect(page).toHaveURL(/.*jobs/)
    })
    test(" Verift a new client can go through RM cybersecurity services onboarding process", async({page}) => {
        const client = new ClientPage(page)
        await client.gotoRemoteMoreWebsite()
        await client.clickCompaniesLink()
        const companyEmail = faker.internet.email({provider: 'companyEmail.com'})
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
        const companyName = faker.company.name()
        const phoneNumber = faker.phone.number().replace('/-/g', '')
        const password = faker.internet.password()
        await client.signUpUser(companyEmail, password)
        await client.addBasicInfo(firstName, lastName, companyName, phoneNumber)

     })



})
test.describe("MarketPlace Client Jobs", () =>   {
     let client;
    test.beforeEach( async({page})=>{
       client = new ClientPage(page)
       await  client.loginUser(process.env.CLIENTEMAIL, process.env.CLIENTPASSWORD)
    })
    test("verify client can add a new job", async({page}) => {
   
        const titleName = faker.person.jobTitle()
        const description = faker.lorem.text()
         const createdJob = await client.createJob(titleName, description)
        await expect(page.getByText(titleName)).toBeVisible()
        expect(createdJob.titleName).toEqual(titleName)
    })
    
    test("verify client can rename a job title", async({page}) => {
        let titleName;
        titleName = faker.person.jobTitle()
        const description = faker.lorem.text()
        await client.addJobLinkText.first().click()
        if(await client.firstJobElement.isVisible()){
            await client.selectFirstJobVisible()
            const newJobTitle = await client.renameJobTitle(titleName)
            await expect(page.getByText(newJobTitle)).toBeVisible()
            await expect(page.getByText(newJobTitle)).toHaveText(newJobTitle)
            
        }
        else{
            const createdJobTitle = await client.createJob(titleName, description)
            await client.selectCreatedJob(createdJobTitle)
            const newTitle = faker.person.jobTitle()
            const newJobTitle = await client.renameJobTitle(newTitle)
            await expect(page.getByText(newJobTitle)).toBeVisible()
            await expect(page.getByText(newJobTitle)).toHaveText(newJobTitle)
            await expect(page.getByText(createdJobTitle.title)).not.toBeVisible()
        }
       
    })
   
    test('Verify client can edit some items on the edit screen', async({page}) => {
       let description;  
        description = faker.lorem.text()
        if(await client.firstJobElement.isVisible()){   
            await client.selectFirstJobVisible()
             const editeddescription = await client.editItemsOnJob(description)
             await expect(client.roleFieldonJobDetails).toHaveText("Front-End Developer")
             await expect(client.edittedContinentsField).toHaveText("Africa, Asia")
             expect(editeddescription).toEqual(description)
    
            }
        else{
            const titleName = faker.person.jobTitle()
            const createdJob = await client.createJob(titleName, description)
            page.reload()
            await client.selectFirstJobVisible()
            const edittedDescriptionText = faker.lorem.text() 
            await client.editItemsOnJob(edittedDescriptionText)
            await expect(client.roleFieldonJobDetails).toHaveText("Front-End Developer")
            await expect(client.edittedContinentsField).toHaveText("Africa, Asia")
            expect(edittedDescriptionText).not.toEqual(createdJob.description)
    
        }     
    
    })
    test('Verify client can delete an incomplete job creation', async({page}) => {
        const titleName = faker.person.jobTitle()
        const description = faker.lorem.text()
         await client.deleteIncompleteJobCreate(titleName, description)
         await expect(page.getByText(titleName)).not.toBeVisible()
    })
    
    test('Verify client can delete job ', async({page }) => {
        if(await client.firstJobElement.isVisible()){
            const selectedJob = await client.selectFirstJobVisible()
            await client.deleteJob()
            await expect(page.getByText(selectedJob)).not.toBeVisible()
           
        }
        else{
            const titleName = faker.person.jobTitle()
            const description = faker.lorem.text()
            const createdJob = await client.createJob(titleName, description)
            await client.selectCreatedJob(createdJob.titleName)
            await client.deleteJob()
            await expect(page.getByText(createdJob.titleName)).not.toBeVisible()
            await expect(client.noJobTextField).toBeVisible()
            await expect(client.addJobLinkText).toHaveCount(2)
        }   
        
    })
})

