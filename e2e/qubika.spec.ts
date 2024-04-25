import { test, expect as setup, expect  } from '@playwright/test';
import { LoginPage } from '../pages/qubika-login.page';
import { defineConfig } from '@playwright/test';
import { DashboardPage } from '../pages/qubika-homePage.page';
import { CategoriesPage } from '../pages/qubika-categories.page';

const url = "https://club-administration.qa.qubika.com/#/auth/login";

test('POST - Create new user', async ({ request }) => {
  const response = await request.post(`/api/auth/register`, {
    data: {
      email: 'andrea.silbel@gmail.com',
      password: '12345678',
      roles: ['ROLE_ADMIN']
  }
  });
  if(response.status() == 201){
    console.log("user was created");
  }
  if(response.status() == 409){
    console.log("user already exists")
  }


 
});

test('User try to login with wrong credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto(url);
  await loginPage.loginInvalid();
 
});

test('User can create new category and validate if it was created successfully', async ({ page }) => {
await page.goto(url);
const loginPage = new LoginPage(page);
  await loginPage.loginValid();
  const dashBoardSection = new DashboardPage(page);
  await dashBoardSection.navigateToCategories();
  const categoriesPage = new CategoriesPage(page);
  await categoriesPage.addNewCategorie();
  await categoriesPage.validateCategoryAdded();
});

test('User can add sub-category and validate if it was created successfully', async ({ page }) => {
  await page.goto(url);
  const loginPage = new LoginPage(page);
    await loginPage.loginValid();
    const dashBoardSection = new DashboardPage(page);
    await dashBoardSection.navigateToCategories();
    const categoriesPage = new CategoriesPage(page);
    await categoriesPage.createSubCategory();
    await categoriesPage.validateCategoryAdded();
  });