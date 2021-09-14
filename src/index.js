import "bootswatch/dist/journal/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.css';
import "./css/style.css";
import Meal from "./meal.js";

async function egyptianMeals() {
  let egyptianFood = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?a=Egyptian"
  );
  const egyptianMeals = await egyptianFood.json();
  const egyptianMealsList = egyptianMeals.meals;
  updateMealsNumber(egyptianMealsList);
  createMealsObject(egyptianMealsList);
}

window.addEventListener("load", egyptianMeals());

function updateMealsNumber(mealsList) {
  document.getElementById("meals-num").textContent = mealsList.length;
}

function createMealsObject(mealsList) {
  for (const meal of mealsList) {
      const mealObj = new Meal(meal.strMeal, meal.strMealThumb, meal.idMeal);
      mealObj.drawTheMeal();
  }
}
