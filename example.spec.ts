// Updated POC file.

import { test, expect } from '@playwright/test';

                               // === Elements and Constants Region ===

const Elements = {
  usernameXPath: '//*[@name="loginfmt"]',
  passwordXPath: '//*[@name="passwd"]',
  signInButtonXPath: '//*[@id="idSIButton9"]',
  changesetElement: '//*[@title="Change Sets"]',
  dvWorkingVersionElement: '//*[@automationid="dvWorkingVersion"]',
  openButton: `//*[@automationid='changesetPropertiesOpenBtn']/span[contains(text(),'Open')]`,
  libraryAsideBig8Element: `//*[@automationid='leftNavDrawerItem_Big-8/Customisations']`,
  big8PlusAddMenuElement: `//*[@automationid='stcplusbutton']`,
  big8SaveButtonElement: `//*[@automationid='stcsavebutton']`,
  big8closeButtonElement: `//*[@automationid='stcclosebutton']//icon-button//span//span`,
  okbutton:`//span[contains(., 'OK')]`,
  cancelbutton:`//span[contains(., 'Cancel')]`,
  textelement:`//*[contains(text(), '${0}')]`,
};

const Constants = {
  username: 'APTPerfUser0003@ebdo.eu',
  password: 'H!tYJ2l*D@Uy71uOL',
};
                            // === Testcases Region ===
// Check the title of the Page.
test('TC_CheckTitle', async ({ page }) => {
  await page.goto('https://lmm-tst8.bdo.global');
  await expect(page).toHaveTitle(/Sign in/);
});

test('TC_UserSignIn', async ({ page }) => {
  await SignIn(page);
  await page.close();
});

test('TC_Big8_GT', async ({ page }) => {
  await SignIn(page);
  await Createbig8Item(page, "Add Group Type" , "GT_1");
  await clickBig8SaveButton(page);
  await page.close();
});

test('TC_CreateEngagment', async ({ page }) => {
  await SignIn(page);
  console.log('Successfully signed In to Tst8 Env');
  await Createbig8Item(page, "Add Engagement Type","Test_Engagment1");
  console.log('engagment added');
  await clickBig8CloseButton(page);
  console.log('succesfully clicked on close button');
  await checkTextExists(page,"There are unsaved changes. Do you want to continue?");
  await checkTextExists(page,"OK");
  await checkTextExists(page," Cancel");
  console.log('PopUp Verified');
  await ClickCancelBtn(page);
  console.log("Before waiting...");
  await waitForSeconds(10); // Wait for 10 seconds
  console.log("After waiting for 10 seconds.");
  await clickBig8SaveButton(page);
  console.log('clicked on big8 save button');
  await checkTextExists(page," Test_Engagment1");
  console.log('succesfully created a new engagement type');
  await page.close();
})

test('TC_DeleteGT', async ({ page }) => {
  await SignIn(page);
  console.log('Succesfully signedIn in to TST* Env');
  await Createbig8Item(page, "Add Group Type" , "GT_demoDelete");
  console.log('New Big8 Group Type created');
  await clickBig8SaveButton(page);
  console.log('Successfully saved the Grouptype');
  const element = await page.locator('text=GT_demoDelete');
  await element.click({ button: 'right' });
  console.log('right clicked successfully , delete option is visible.');
  await page.click('text= Delete Option');
  await page.click('text= OK');
  console.log('Successfully clicked on Ok button');
  await clickBig8SaveButton(page);
  console.log('Successfully clicked on save button');
  console.log('TC_DeleteGT successfully completed.');
  await page.close();
});

test('Unittest', async ({ page }) => {
  await SignIn(page);
  const element = await page.locator(generateDynamicXPath("WorkingVersion1"));
    await element.click({ button: 'right' });
    await page.close();
});


                             // === Functions Region ===

// Sign in to the tst8 portal and verify element method
async function SignIn(page) {
  await page.goto('https://lmm-tst8.bdo.global');
  await page.type(Elements.usernameXPath, Constants.username);
  await page.click(Elements.signInButtonXPath);
  await page.type(Elements.passwordXPath, Constants.password);
  await page.click(Elements.signInButtonXPath);
  await page.click(Elements.signInButtonXPath);

  await verifyElementExists(page, Elements.changesetElement);
  await verifyElementExists(page, Elements.dvWorkingVersionElement);
}

// Wait for seconds Method
async function waitForSeconds(seconds) {
  // Use the setTimeout function to pause execution for the specified time
  await new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

// Create a New Big8 group type method
async function Createbig8Item(page, Elmtype , NewItemName) {
  await page.click(Elements.dvWorkingVersionElement);
  await page.click(Elements.openButton);
  await page.click(Elements.libraryAsideBig8Element);
  await page.click(Elements.big8PlusAddMenuElement);
  await page.click(`text=${Elmtype}`);
  await page.keyboard.type(`${NewItemName}`);
}

// dhynamic xpath for Text elements
function generateDynamicXPath(text) {
  return `//*[contains(text(), '${text}')]`;
}

  // Save Big8 Page Method
  async function clickBig8SaveButton(page) {
    await page.click(Elements.big8SaveButtonElement);
  }

  // click on cancel button
  async function ClickCancelBtn(page) {
  await page.click(Elements.cancelbutton);
  }

  // Focus on an element and right click method
  async function rightClickDynamicText(page, textToRightClick) {
    try {
      const dynamicXPath = `//*[contains(text(), '${textToRightClick}')]`;
      const element = await page.locator(dynamicXPath);
      await element.click();
      await element.click({ button: 'right' });
      console.log(`Right-clicked on element with text: "${textToRightClick}"`);
    } catch (error) {
      console.error(`Error right-clicking on element with text: "${textToRightClick}"`);
    }
  }
  
  // click on close button
  async function clickBig8CloseButton(page) {
    await page.click(Elements.big8closeButtonElement);
    }

    //verify text element
    async function checkTextExists(page, searchText) {
      // Get the page's HTML content
      const pageContent = await page.content();
    
      // Check if the text exists in the page's HTML content
      return pageContent.includes(searchText);
    }

    
  // click on Ok Button
  async function ClickOKBtn(page) {
    await page.click(Elements.okbutton);
    }

// Function to verify existence of Elements
async function verifyElementExists(page, elementXPath) {
  try {
    await page.waitForSelector(elementXPath, { state: 'attached' });
    console.log('Element exists on the page.');
  } catch (error) {
    console.error('Element does not exist on the page.');
  }

}
