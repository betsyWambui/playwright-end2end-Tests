// @ts-check
import {faker } from '@faker-js/faker';
const { test, expect, } = require('@playwright/test');
const   {  ClientPage }  = require ("../pages/client-page")



test("verify user can login", async ({page}) => {
    const client = new ClientPage(page)
    await client.clientLogin()
    await expect(page).toHaveURL('https://rm-marketplace-staging.web.app/jobs')

});

test("verify client can add a new job", async({page}) => {
    const client = new ClientPage(page)
    const titleName = faker.person.jobTitle()
     await client.clientLogin()
     const createdJob = await client.createJob(titleName)
    await expect(page.getByText(titleName)).toBeVisible()
    await expect(createdJob).toEqual(titleName)
})

test("verify client can rename a job title", async({page}) => {
    let titleName;
    const client = new ClientPage(page)    
    titleName = faker.person.jobTitle()
    await client.clientLogin()
    await expect(client.jobDashboardField).toBeVisible()
    if(await client.firstJobElement.isVisible()){
        await client.selectFirstJobVisible()
        const newJobTitle = await client.renameJob(titleName)
        await expect(page.getByText(newJobTitle)).toBeVisible()
    }
    else{
        const createdJobTitle = await client.createJob(titleName)
        await client.selectCreatedJob(createdJobTitle)
        const newTitle = faker.person.jobTitle()
        const newJobTitle = await client.renameJob(newTitle)
        await expect(page.getByText(newJobTitle)).toBeVisible()
        await expect(page.getByText(createdJobTitle)).not.toBeVisible()
    }
   
})

test('Verify client can delete job ', async({page }) => {
    const client = new ClientPage(page)
    await client.clientLogin()
    await expect(client.jobDashboardField).toBeVisible()
    if(await client.firstJobElement.isVisible()){
        await client.selectFirstJobVisible()
        await client.deleteJob()
       
    }
    else{
        const titleName = faker.person.jobTitle()
        const createdJob = await client.createJob(titleName)
        await client.selectCreatedJob(createdJob)
        await client.deleteJob()
        await expect(page.getByText(createdJob)).not.toBeVisible()
        await expect(client.noJobTextField).toBeVisible()
    }   
    
})