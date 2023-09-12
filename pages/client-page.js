
import dotenv from 'dotenv';

dotenv.config({path: '../.env'});
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
   }
   async gotoRemoteMoreWebsite(){
     await this.page.goto(process.env.STAGING_URL)
   }

   async clientLogin(){
     await this.gotoRemoteMoreWebsite()
     await this.emailInputField.fill(process.env.EMAIL)
     await this.passwordInputField.fill(process.env.PASSWORD)
     await this.loginbuttonField.click()
   }

   async addJobTitle(){
    await this.addJobLinkText.click()
    await this.addJobtitleField.fill("test job 1")
    await this.jobdescriptionField.fill("test description 1")
   }
   async addSkills(){
    await this.skillInputField.fill("React")
    await this.selectReactField.click()
    await this.skillInputField.fill("Python")
    await this.selectPythonField.click()
    await this.skillInputField.fill("Java")
    await this.selectJavaField.click()
   }
   async selectRole(){
    await this.checkFirstRoleField.check()
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
    sliderThumbElement;
    sliderTrackElement;
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
  
   async createJob(){
       await this.addJobTitle()
       await this.addSkills()
       await this.selectRole()
       await this.selectFirstThreeItemDropdown(this.selectContinentDropdownField, this.selectOptionField)
       await this.continentDropdownIconField.click()
       await this.selectFirstThreeItemDropdown(this.selectCountriesDropdownField, this.selectOptionField)
       await this.countriesDropdownIconField.click()
       await this.changeSliderValue(this.senioritySliderTrackField, this.senioritySliderThumbField)      
       await this.changeSliderValue(this.budgetSliderTrackField, this.budgetSliderThumbField)
       await this.clickSave()
   }
}
