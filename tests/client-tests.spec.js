// @ts-check
import {faker } from '@faker-js/faker';
const { test, expect} = require('@playwright/test');
const   {  ClientPage }  = require ("../pages/client-page")



test("verify user can login", async ({page}) => {
    const client = new ClientPage(page)
    await client.clientLogin()
    await expect(page).toHaveURL('https://rm-marketplace-staging.web.app/jobs')

});

test("verify client can add a new job", async({page}) => {
    const client = new ClientPage(page)
    const titleName = faker.person.jobTitle()
    const description = faker.lorem.text()
     await client.clientLogin()
     const createdJob = await client.createJob(titleName, description)
    await expect(page.getByText(titleName)).toBeVisible()
    await expect(createdJob.titleName).toEqual(titleName)
})

test('Verify client can delete an incomplete job creation', async({page}) => {
    const client = new ClientPage(page)
    const titleName = faker.person.jobTitle()
    const description = faker.lorem.text()
     await client.clientLogin()
     await client.deleteIncompleteJobCreate(titleName, description)
     await expect(page.getByText(titleName)).not.toBeVisible()
})

test("verify client can rename a job title", async({page}) => {
    let titleName;
    const client = new ClientPage(page)    
    titleName = faker.person.jobTitle()
    const description = faker.lorem.text()
    await client.clientLogin()
    await expect(client.jobDashboardField).toBeVisible()
    if(await client.firstJobElement.isVisible()){
        await client.selectFirstJobVisible()
        const newJobTitle = await client.renameJobTitle(titleName)
        await expect(page.getByText(newJobTitle)).toBeVisible()
        await expect(page.getByText(newJobTitle)).toHaveText(newJobTitle)
        // await expect( client.addJobtitleField).toEqual(page.getByText(newJobTitle))
        
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
    const client = new ClientPage(page)   
    description = faker.lorem.text() 
    await client.clientLogin()
    await expect(client.jobDashboardField).toBeVisible()
    page.reload()
    if(await client.firstJobElement.isVisible({timeout: 10000})){   
        await client.selectFirstJobVisible()
         const editeddescription = await client.editItemsOnJob(description)
         await expect(client.roleFieldonJobDetails).toHaveText("Front-End Developer")
         await expect(client.edittedContinentsField).toHaveText("Africa, Asia")
         await expect(editeddescription).toEqual(description)

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
        await expect(edittedDescriptionText).not.toEqual(createdJob.description)

    }     

})

test('Verify client can delete job ', async({page }) => {
    const client = new ClientPage(page)
    await client.clientLogin()
    await expect(client.jobDashboardField).toBeVisible()
    if(await client.firstJobElement.isVisible()){
        const selectedJob = await client.selectFirstJobVisible()
        await client.deleteJob()
        await expect(page.getByText(selectedJob)).not.toBeVisible()
       
    }
    else{
        const titleName = faker.person.jobTitle()
        const description = faker.lorem.text()
        const createdJob = await client.createJob(titleName, description)
        await client.selectCreatedJob(createdJob)
        await client.deleteJob()
        await expect(page.getByText(createdJob.titleName)).not.toBeVisible()
        await expect(client.noJobTextField).toBeVisible()
        await expect(client.addJobLinkText).toHaveCount(2)
    }   
    
})