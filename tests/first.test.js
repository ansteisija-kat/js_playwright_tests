import { test, expect } from "@playwright/test";

test("first_test", async ({ page }) => {
    // Переходим на нужную страницу
    await page.goto("https://demo.playwright.dev/todomvc/");

    // Выбираем инпут с которым будем работать
    // Возвращается не DOM элемент, а "локатор"
    const input = page.getByPlaceholder("What needs to be done?");

    // Заполняем и нажимаем Enter
    const taskName = "Finish Hexlet's course";
    await input.fill(taskName);
    await input.press("Enter");

    // Проверяем, что задача появилась в списке задач
    const item = page.getByTestId("todo-title").filter({ hasText: taskName });
    await expect(item).toBeVisible();
});


test("my_try", async ({ page }) => {
   await page.goto('https://stepik.org/catalog');

   const input_search = page.getByPlaceholder('Название курса, автор или предмет');

   const searchName = "QA automation";
   await input_search.fill(searchName);
   await input_search.press("Enter");

   const item = page.getByText('Уровень сложности');
   await expect(item).toBeVisible();
});
// тут в FF тест не проходит (проблема еще на первом этапе, страница прогружается долго)