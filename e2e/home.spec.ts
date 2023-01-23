import { test, expect } from '@playwright/test'; 

var homePage = 'http://localhost:3000'
var aboutPage = 'http://localhost:3000/about'
var gradesPage = 'http://localhost:3000/grades'

test.beforeAll(async () => {
    console.log('Before tests'); 
})

test.afterAll(async () => {
    console.log('After tests')
})

test.describe('Head tag area', () => {
    console.log('After tests')
})

test.describe('Head tag area', () => {
    test('Contains the Head tag and its contents', async ({ page }) => {
        await page.goto(homePage); 

        await expect(page).toHaveTitle("Example #1"); 

        const metaDescription = page.locator('meta[name="description"]'); 
        await expect(metaDescription).toHaveAttribute('content' , 'Gernated by create next app')

        const linkIcon = page.locator('link[rel="icon"]')
        await expect(linkIcon).toHaveAttribute('href', '/favicon.ico')

    })

})

test.describe("Main Content tests", ()=> {
    test('Should contain a heading welcome to the home page', async({ page }) => {
        await page.goto(homePage); 

        await expect(page.locator('h1')).toContainText('Welcome to my home page'); 
    })

    test('Should contain a list list to decribe CRUD', async({ page }) => {
        await page.goto(homePage);
        await expect(page.locator('ul > li')).toContainText(['Create', 'Read', 'Update', 'Delete'])
    })

   
})

test.describe('Linking to another page', () => {
    test('Should cotain a link to about page', async ({ page }) => {
        await page.goto(homePage)
        await page.click("text=About Page")

        await expect(page).toHaveURL(aboutPage);
    })

    test('Should contain a link to grades page', async ({ page }) => {
        await page.goto(homePage)
        await page.click("text=Grades Page")

        await expect(page).toHaveURL(gradesPage)
    })
})


test.describe('Footer tests', () => {
    test('Should contain a footer on the home page', async ({ page }) => {
        await page.goto(homePage); 

        await expect(page.locator('footer')).toContainText("In the class Example #1");
    })
})

test.describe('Check About page navigates to the home page tests', () => {
    test("Should navigate to the home page from the about page", async({ page }) => {
        await page.goto(aboutPage);

        await page.click('text=Go Back')


        await expect(page).toHaveURL(homePage)
    })
})