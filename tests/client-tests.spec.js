// @ts-check

const { test, expect, } = require('@playwright/test');
const   {  ClientPage }  = require ("../pages/client-page")


test("verify user can login", async ({page}) => {
    const client = new ClientPage(page)
    await client.clientLogin()
    await expect(page).toHaveURL('https://rm-marketplace-staging.web.app/jobs')

});

test("verify use can add a new job", async({page}) => {
    const client = new ClientPage(page)
    await client.clientLogin()
    await client.createJob()
    await expect(page.getByText('test job 1')).toBeVisible()
})
