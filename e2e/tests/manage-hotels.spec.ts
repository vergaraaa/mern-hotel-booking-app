import path from "path";
import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
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
});

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}/add-hotel`);

  await page.locator("[name=name]").fill("Test Hotel");
  await page.locator("[name=city]").fill("Test City");
  await page.locator("[name=country]").fill("Test Country");
  await page.locator("[name=description]").fill("Test Description");
  await page.locator("[name=pricePerNight]").fill("100");
  await page.selectOption('select[name="starRating"]', "3");

  await page.getByText("Budget").click();

  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();

  await page.locator("[name=adultCount]").fill("2");
  await page.locator("[name=childCount]").fill("4");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "roma1.JPG"),
    path.join(__dirname, "files", "roma2.JPG"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();

  await expect(page.getByText("Hotel Saved!")).toBeVisible();
});
