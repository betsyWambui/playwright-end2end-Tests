
export class ClientPage{
    /**
 * @param {import('@playwright/test').Page} page
 */
   constructor(page){
     this.page = page 
     this.emailInputField = page.getByPlaceholder("Email")
     this.passwordInputField = page.getByPlaceholder("Password")
     this.loginbuttonField = page.getByRole('button', {name: "Sign in"})
     this.addJobLinkText = page.getByRole('button', { name: 'Add new job' })
     this.addJobtitleField =  page.getByPlaceholder('Job title')
     this.jobdescriptionField = page.getByPlaceholder('description')
     this.skillInputField = page.getByPlaceholder('Type in required skills')
     this.selectReactField = page.getByText('React', { exact: true })
     this.selectPythonField = page.getByText('Python', {exact: true })
     this.selectJavaField = page.getByText('Java', {exact: true})
     this.checkFirstRoleField = page.locator('label').filter({ hasText: 'Full-Stack Developer' })
     this.budgetSliderField = page.locator('span').filter({ hasText: /^<1$/ }).first()
     this.selectContinentDropdownField = page.locator('div').getByRole('alert', {name: "Continents"})
     
   }

   async gotoRemoteMoreWebsite(){
       await this.page.goto('https://rm-marketplace-staging.web.app/')
   }

   async clientLogin(){
     await this.gotoRemoteMoreWebsite()
     await this.emailInputField.fill("beth@remotemore.com")
     await this.passwordInputField.fill("Borisov1")
     await this.loginbuttonField.click()
   }
   
   async createJob(){
       await this.addJobLinkText.click()
       await this.addJobtitleField.fill("test job 1")
       await this.jobdescriptionField.fill("test description 1")
       await this.skillInputField.fill("React")
       await this.selectReactField.click()
       await this.skillInputField.fill("Python")
       await this.selectPythonField.click()
       await this.skillInputField.fill("Java")
       await this.selectJavaField.click()
       await this.checkFirstRoleField.check()
       await this.page.mouse.move(50, 100)
      //  await this.seniorityDragBarField.click({ position: { x: 3, y:1} })
      //  await this.selectContinentDropdownField.click()
     
   }


}

