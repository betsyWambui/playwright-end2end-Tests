
import { BasePage } from './base-page';


export class ClientPage extends BasePage{
   constructor(page){
    super(page)
    // MarketPlace Onboarding Page Elements
    this.companiesLinkTextField = page.getByText('Companies')
    this.emailAddressField = page.getByPlaceholder("Your email address")
    this.createPasswordField = page.getByPlaceholder("Create a password")
    this.repeatPasswordField = page.getByPlaceholder("Repeat password")
    this.agreeTermsCheckboxField = page.locator(".ui.checkbox")
    this.signUpFreeButtonField = page.getByRole('button', { name: 'Sign up for free' })
    this.firstNameInputField = page.getByPlaceholder("e.g. John")
    this.lastNameInputField = page.getByPlaceholder("e.g. Doe")
    this.companyNameInputField = page.getByPlaceholder(".g. RemoteMore")
    this.phoneNumberInputField = page.locator("#mui-1")
    this.createAccountButtonField = page.getByRole('button', { name: 'Create Account' })
    this.nextButtonField = page.getByRole('button', { name: 'Next' })
    this.goToDevelopersideCardField = page.getByText('Hire Remote Developers')
    this.letsGoButtonField = page.getByRole('button', { name: 'Let\'s Go' })
    this.jobcategoriesComboboxField = page.getByRole('combobox')
    this.jobcategoriesInputField =  this.jobcategoriesComboboxField.getByRole('listbox').getByRole('option')
    this.jobcategoriesdropdowniconField = page.locator('i.dropdown')
    this.fullStackRadioButtonField = page.getByText('Full-Stack Developer')
    this.technicalSkillsInputField = page.locator('#mui-3')
    this.technicalAddTextLink =page.getByText('Add +')
    this.yearsOfexperienceRadioButton = page.getByText('3-4 years (Intermediate)')
    this.hoursPerWeekRadioButton = page.getByText('0-9 hours/week')
    this.maximumBudgetRadioButon = page.getByText('Up to 2,000 EUR (usually Africa, Middle East)')
    this.imageOnanimatedScreen = page.locator('.ai > image')
    // MarketPlace Job Dashboard Elements
    // this.JobsNaviagationField = page.getByRole('navigation').getByRole('link', { name: 'Jobs Dashboard'})
    this.addJobLinkText = page.getByRole('button', { name: 'Add new job' })
    this.addJobtitleField =  page.getByPlaceholder('Job title')
    this.jobdescriptionField = page.getByPlaceholder('Job description')
    this.jobdescriptionField = page.getByPlaceholder('Job description')
    this.skillInputField = page.getByPlaceholder('Type in required skills')
    this.selectReactField = page.getByText('React', { exact: true })
    this.selectPythonField = page.getByText('React Native', {exact: true })
    this.selectJavaField = page.getByText('JavaScript', {exact: true})
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
    this.firstJobElement = page.locator('(//div[@class="job-name-container MuiBox-root css-doxjmx"])[1]')
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
 
  async clickCompaniesLink(){
     await this.companiesLinkTextField.click()
  }
 
  async addBasicInfo(firstname, lastname,companyName, phoneNumber){
    await this.firstNameInputField.fill(firstname)
    await this.lastNameInputField.fill(lastname)
    await this.companyNameInputField.fill(companyName)
    await this.phoneNumberInputField.evaluate(element => element.scrollIntoView({ behavior: 'smooth', block: 'center' }));
    await this.phoneNumberInputField.click()
    await this.phoneNumberInputField.fill(phoneNumber)
    await this.createAccountButtonField.click()
    await this.goToDevelopersideCardField.isVisible()
    await this.goToDevelopersideCardField.click()
    await this.letsGoButtonField.click()
    await this.jobcategoriesComboboxField.isVisible()
    await this.jobcategoriesComboboxField.click()
    await this.jobcategoriesInputField.first().click()
    await this.jobcategoriesInputField.last().click()
    await this.jobcategoriesdropdowniconField.click()
    await this.nextButtonField.click()

  }
  async selectTechncialSkills(){
    await this.technicalSkillsInputField.fill('React')
    await this.technicalAddTextLink.click()
    await this.technicalSkillsInputField.fill('React Native')
    await this.technicalAddTextLink.click()
    await this.technicalSkillsInputField.fill('JavaScript')
    await this.technicalAddTextLink.click()
    await this.nextButtonField.click()
  }
  async selectYearsOfExperience(){
    await this.yearsOfexperienceRadioButton.click()
    await this.nextButtonField.click()
  }
  async selectHoursPerWeek(){
    await this.hoursPerWeekRadioButton.click()
    await this.nextButtonField.click()
  }

  async selectMaximumBudget(){
    await this.maximumBudgetRadioButon.click()
    await this.nextButtonField.click()
    
  }
  // async waitForAnimationEnd() {
  //   return await this
  //     .imageOnanimatedScreen
  //     .evaluate((element) =>
  //       Promise.all(
  //         element
  //           .getAnimations()
  //           .map((animation) => animation.finished)
  //       )
  //     )
  // }
  
  // MarketPlace Job dashboard Actions
   async addJobTitleAndDescription(titleName, description){
    await this.addJobtitleField.fill(titleName)
    await this.jobdescriptionField.fill(description)

   }
   async addSkills(){
    await this.skillInputField.fill("React")
    await this.selectReactField.click()
    await this.skillInputField.fill("React Native")
    await this.selectPythonField.click()
    await this.skillInputField.fill("Javascript")
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
      await this.addJobLinkText.first().click()
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
   await this.selectRole(this.checkSecondRoleField)
   await this.jobdescriptionField.fill(description)
   await this.editContinentField.click()
   await this.clickSave()
   return description


 } 
   async deleteIncompleteJobCreate(titleName, description){
       await this.addJobLinkText.first().click()
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
