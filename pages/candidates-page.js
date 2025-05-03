import dotenv from 'dotenv';
import path from 'path'
import { BasePage } from './base-page';


dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

export class CandidatePage extends BasePage{
    /**
 * @param {import('@playwright/test').Page} page
 */
   constructor(page){
    super(page)
    this.page = page
    this.generalInfoHeader = page.getByText("Bio")
    this.bioEditIconField = page.locator('.jss38 > .jss33 > .edit-hover').first()
    this.bioTextArea = page.locator(".mde-text")
    this.biocontainer = page.locator("//html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[3]/div[1]/div[3]")
    this.savebioIcon = page.locator(".editingGeneral_iconWrapper__3ajhf").first()
    this.updatedBioview = page.locator("//div[@class='sc-laTMn fPVUVM']")
   }
 async activateBioeditMode(){
    await this.biocontainer.scrollIntoViewIfNeeded()
    await this.biocontainer.hover()
    await this.bioEditIconField.click()
    await this.bioTextArea.click()
    await this.bioTextArea.clear()
    await this.bioTextArea.fill("hellotest")
    await this.savebioIcon.dblclick()
 }

}