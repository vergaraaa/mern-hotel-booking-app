import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should allow user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  // get sign in button
  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  // fill form
  await page.locator("[name=email]").fill("vergara@gmail.com");
  await page.locator("[name=password]").fill("123456");

  // click login button
  await page.getByRole("button", { name: "Sign In" }).click();

  // assertions
  await expect(page.getByText("Login successful")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("should allow user to register", async ({ page }) => {
  const testEmail = `test_register_${
    Math.floor(Math.random() * 900000) + 10000
  }@test.com`;

  await page.goto(UI_URL);

  // go to sign in
  await page.getByRole("link", { name: "Sign In" }).click();

  // go to register
  await page.getByRole("link", { name: "Create an account" }).click();
  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();

  // fill form
  await page.locator("[name=name]").fill("Test_Name");
  await page.locator("[name=lastname]").fill("Test_Lastname");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("123456");
  await page.locator("[name=confirmPassword]").fill("123456");

  // click login button
  await page.getByRole("button", { name: "Create Account" }).click();

  // assertions
  await expect(page.getByText("Registration successful")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
