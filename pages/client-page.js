

import dotenv from 'dotenv';
import path from 'path'


dotenv.config({ path: path.resolve(__dirname, '..', '.env') });
export class ClientPage{
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
    this.addJobLinkText = page.getByRole('button', { name: 'Add new job' })
    this.addJobtitleField =  page.getByPlaceholder('Job title')
    this.jobdescriptionField = page.getByPlaceholder('Job description')
    this.jobdescriptionField = page.getByPlaceholder('Job description')
    this.skillInputField = page.getByPlaceholder('Type in required skills')
    this.selectReactField = page.getByText('React', { exact: true })
    this.selectPythonField = page.getByText('Python', {exact: true })
    this.selectJavaField = page.getByText('Java', {exact: true})
    this.checkFirstRoleField = page.getByLabel('Full-Stack Developer')
    this.checkSecondRoleField =  page.getByLabel('Front-End Developer')
    this.senioritySliderTrackField = page.locator('.MuiSlider-root:nth-child(2) > span:nth-child(2)').first()
    this.senioritySliderThumbField = page.locator('span.MuiSlider-thumb:nth-child(16)')
    this.budgetSliderThumbField = page.locator('span.MuiSlider-thumb:nth-child(7)')
    this.budgetSliderTrackField = page.locator('.MuiSlider-root:nth-child(2) > span:nth-child(2)').last()
    this.selectCountriesDropdownField = page.locator('div:nth-child(2) > div.ui').last()
    this.selectContinentDropdownField = page.locator('div:nth-child(1) > div.ui').last()
    this.selectOptionField = page.getByRole('option')
    this.continentDropdownIconField = page.locator('i.dropdown').first()
    this.countriesDropdownIconField = page.locator('i.dropdown').last()
    this.saveJobField = page.getByRole('button', {name: 'Save job'})
    this.firstJobElement = page.locator('div.job-name-container').first()
    this.createdTextField = page.locator("div").filter({hasText: 'Created'})
    this.jobMenubutton = page.locator('#long-button').first()
    this.deleteJobOptionField = page.getByText('Delete job').first()
    this.renameJobOptionField = page.getByText('Rename job').first()
    this.editbuttonField = page.getByRole('button', { name: 'Edit job' })
    this.deletebuttonField = page.getByRole('button', { name: 'Delete' })
    this.noJobTextField = page.getByText('No Jobs available')
    this.roleFieldonJobDetails = page.locator('div:nth-child(1) > div:nth-child(5) > div:nth-child(2) div:nth-child(2)').last()
    this.edittedContinentsField = page.locator('div:nth-child(1) > div:nth-child(5) > div:nth-child(5) div:nth-child(2)')
    this.editContinentField = page.locator('.ui:nth-child(3) .delete').first()
   }
   async gotoRemoteMoreWebsite(){
     await this.page.goto(process.env.STAGING_URL)
   }

   async clientLogin(){
     await this.gotoRemoteMoreWebsite()
     await this.emailInputField.fill(process.env.EMAIL)
     await this.passwordInputField.fill(process.env.PASSWORD)
     await this.loginbuttonField.click()
     await this.page.waitForURL(process.env.JOBS_DASHBOARD_URL)
     await this.jobDashboardField.isVisible()
     await this.searchDevelopersField.isVisible()
     await this.hiredDevelopersField.isVisible()

   }

   async addJobTitleAndDescription(titleName, description){
    await this.addJobLinkText.first().click()
    await this.addJobtitleField.fill(titleName)
    await this.jobdescriptionField.fill(description)

   }
   async addSkills(){
    await this.skillInputField.fill("React")
    await this.selectReactField.click()
    await this.skillInputField.fill("Python")
    await this.selectPythonField.click()
    await this.skillInputField.fill("Java")
    await this.selectJavaField.click()
   }
   async selectRole(checkRadioField){
    await checkRadioField.check()
   }

   async selectFirstThreeItemDropdown(selectDropdownField, selectOptionsField){
     await selectDropdownField.click()
     const allOptions = await selectOptionsField.all()
     const selectedOptions = allOptions.slice(0, 3)
      for ( const option of selectedOptions ){
        await option.click()
      }

   }
   async changeSliderValue(sliderTrackElement, sliderThumbElement){
    const targetPercentage = 10
    const thumbBoundingBox = await sliderThumbElement.boundingBox()
    const sliderBoundingBox = await sliderTrackElement.boundingBox()
    const startPoint =
    {
        x: thumbBoundingBox.x + thumbBoundingBox.width * targetPercentage,
        y: thumbBoundingBox.y + thumbBoundingBox.height / 2
    }
    const endpoint = 
    {
      x: sliderBoundingBox.x + sliderBoundingBox.width / 2 ,
      y: sliderBoundingBox.y + sliderBoundingBox.height / 2 
    }
    await this.page.mouse.move(startPoint.x, startPoint.y);
    await this.page.mouse.down()
    await this.page.mouse.move(endpoint.x, endpoint.y)  
    await this.page.mouse.up()
   }
  
  async clickSave(){
    await this.saveJobField.click() 
  }
 
  
  async createJob(titleName, description){
      await this.addJobTitleAndDescription(titleName, description)
      await this.addSkills()
      await this.selectRole(this.checkFirstRoleField)
      await this.selectFirstThreeItemDropdown(this.selectContinentDropdownField, this.selectOptionField)
      await this.continentDropdownIconField.click()
      await this.selectFirstThreeItemDropdown(this.selectCountriesDropdownField, this.selectOptionField)
      await this.countriesDropdownIconField.click()
      await this.changeSliderValue(this.senioritySliderTrackField, this.senioritySliderThumbField)      
      await this.changeSliderValue(this.budgetSliderTrackField, this.budgetSliderThumbField)
      await this.clickSave()
      return { titleName, description }
  }
  async selectFirstJobVisible() {
    await this.firstJobElement.click()
    const selectedJob = await this.firstJobElement.innerText()
    return selectedJob
  }
  async selectCreatedJob(jobTitle) {
    this.page.getByText(jobTitle).click()
  }

  async renameJobTitle(titleName) {
    await this.jobMenubutton.hover()
    await this.jobMenubutton.click()
    await this.renameJobOptionField.click()
    await this.addJobtitleField.clear()
    await this.addJobtitleField.fill(titleName)
    return titleName
  }

 async editItemsOnJob(description){
   await this.editbuttonField.click()
   await this.page.setDefaultTimeout(50000)
   await this.selectRole(this.checkSecondRoleField)
   await this.jobdescriptionField.fill(description)
   await this.editContinentField.click()
   await this.clickSave()
   return description


 } 
   async deleteIncompleteJobCreate(titleName, description){
       await this.addJobTitleAndDescription(titleName, description)
       await this.selectRole(this.checkFirstRoleField)
       await this.deletebuttonField.click()
       await this.deletebuttonField.click()
   }
   async deleteJob(){
      await this.jobMenubutton.hover()
      await this.jobMenubutton.click()
      await this.deleteJobOptionField.click()
      await this.deletebuttonField.click()

   }

}
