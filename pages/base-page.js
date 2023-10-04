import dotenv from 'dotenv';
import path from 'path'


dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

export class BasePage{
    /**
 * @param {import('@playwright/test').Page} page
 */
   constructor(page){
    this.page = page 
    this.emailInputField = page.getByPlaceholder("Email")
    this.passwordInputField = page.getByPlaceholder("Password")
    this.loginbuttonField = page.getByRole('button', {name: "Sign in"})
    this.jobDashboardField = page.getByText('Jobs Dashboard', { exact: true })
    this.searchDevelopersField = page.getByRole('navigation').getByRole('link', { name: 'Search Developers' })
    this.hiredDevelopersField = page.getByText('Hired Developer')
   }

   async gotoRemoteMoreWebsite(){
    await this.page.goto(process.env.STAGING_URL)
  }
  async gotoDashboard() {
    await this.page.goto(process.env.JOBS_DASHBOARD_URL)
  }
    async clientLogin(){
        await this.gotoRemoteMoreWebsite()
        await this.emailInputField.fill(process.env.EMAIL)
        await this.passwordInputField.fill(process.env.PASSWORD)
        await this.loginbuttonField.click()
        await this.page.waitForURL(process.env.JOBS_DASHBOARD_URL)
        await this.jobDashboardField.isVisible()
        await this.searchDevelopersField.isVisible()
      }
      async debounceDom(pollDelay = 50, stableDelay = 350) {
        let markupPrevious = '';
        const timerStart = new Date();
        let isStable = false;
        while (!isStable) {
            const markupCurrent = await this.page.evaluate(() => document.body.innerHTML);
            if (markupCurrent == markupPrevious) {
                const elapsed = new Date().getTime() - timerStart.getTime();
                isStable = stableDelay <= elapsed;
            } else {
                markupPrevious = markupCurrent;
            }
            if (!isStable) await new Promise(resolve => setTimeout(resolve, pollDelay));
        }
    }
   
}