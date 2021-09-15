/**
 * @jest-environment jsdom
 */

import { updateMealsNumber } from "../homepage.js";

test("Should output the number of available meals", () => {
  const mealsList = [
    {
      strMeal: "Egyptian Fatteh",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/rlwcc51598734603.jpg",
      idMeal: "53031",
    },
    {
      strMeal: "Feteer Meshaltet",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/9f4z6v1598734293.jpg",
      idMeal: "53030",
    },
    {
      strMeal: "Ful Medames",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/lvn2d51598732465.jpg",
      idMeal: "53025",
    },
    {
      strMeal: "Koshari",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/4er7mj1598733193.jpg",
      idMeal: "53027",
    },
  ];

  document.body.innerHTML = `<span id="meals-num"></span>`;

  updateMealsNumber(mealsList);
  const mealsNumber = document.getElementById("meals-num").innerHTML;

  expect(mealsNumber).toBe("4");
});
