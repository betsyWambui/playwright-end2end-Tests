// @ts-check

const { test, expect, } = require('@playwright/test');
import dotenv from 'dotenv';
const   {  ClientPage }  = require ("../pages/client-page")


dotenv.config({path: '../.env'});
test("verify user can login", async ({page}) => {
    const client = new ClientPage(page)
    await client.clientLogin()
    // @ts-ignore
    await expect(page).toHaveURL(process.env.JOBS_DASHBOARD_URL)

});

test("verify use can add a new job", async({page}) => {
    const client = new ClientPage(page)
    await client.clientLogin()
    await client.createJob()
    await expect(page.getByText('test job 1')).toBeVisible()
})
