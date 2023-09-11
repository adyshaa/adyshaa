import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://lmm-tst8.bdo.global');

  //verify the sign in page is shown
  await expect(page).toHaveTitle(/Sign in/);
});

//Sign in to BDO LMM Login page.

test('enter creds', async ({ page }) => {
  await page.goto('https://lmm-tst8.bdo.global');

  //Enter username
  const usernameXPath = '//*[@name="loginfmt"]';
  await page.type(usernameXPath, 'APTPerfUser0003@ebdo.eu');

  //click on Next
  const xpathSelector = '//*[@id="idSIButton9"]';
  await page.click(xpathSelector);

  //Enter password
  const passwordXPath = '//*[@name="passwd"]';
  await page.type(passwordXPath, '5-mrdZ!))lB%ChWq0u&W');

  await page.click(xpathSelector); //click on signin
  await page.click(xpathSelector); //click on yes

  //verify the Elements on the Homepage
    
    //verify changeset ID
    const changeset = '//*[@title="Change Sets"]';
    try {
      // Wait for the element to be present on the page
      await page.waitForSelector(changeset, { state: 'attached' });
  
      console.log('Element exists on the page.');
  
    } catch (error) {
      console.error('Element does not exist on the page.');
    }

    //Verify working version button
    const dvWorkingVersion = '//*[@automationid="dvWorkingVersion"]';
    try {
      // Wait for the element to be present on the page
      await page.waitForSelector(dvWorkingVersion, { state: 'attached' });
  
      console.log('Element exists on the page.');
  
    } catch (error) {
      console.error('Element does not exist on the page.');
    }

   //click working version and click open
   await page.click(dvWorkingVersion);
   const OpenButton = `//*[@automationid='changesetPropertiesOpenBtn']/span[contains(text(),'Open')]`;
   await page.click(OpenButton);

   //Add new group type
   const LibraryAside_Big8 = `//*[@automationid='leftNavDrawerItem_Big-8/Customisations']`;
   const Big8_PlusAddMenu = `//*[@automationid='stcplusbutton']`;
   const Big8save_button = `//*[@automationid='stcsavebutton']`;
   await page.click(LibraryAside_Big8);
   await page.click(Big8_PlusAddMenu); 
   await page.click('text= Add Group Types ');
   await page.keyboard.type('Group type test 1');
   await page.click(Big8save_button);


   //close the page
    await page.close();
});