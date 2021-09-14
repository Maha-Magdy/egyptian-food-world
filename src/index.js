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
  let egyptianMealsLikes = await fetch(
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/necgfXW8nUf9YW13OlZY/likes'
  );
  const egyptianMealsLikesList = await egyptianMealsLikes.json();
  updateMealsNumber(egyptianMealsList);
  createMealsObject(egyptianMealsList, egyptianMealsLikesList);
}

window.addEventListener("load", egyptianMeals());

function updateMealsNumber(mealsList) {
  document.getElementById("meals-num").textContent = mealsList.length;
}

function createMealsObject(mealsList, likesList) {
  for (const meal of mealsList) {
      let likes;
      const likeObj = likesList.filter(obj => obj.item_id === meal.idMeal);
      if (likeObj.length === 1) {
        likes = likeObj[0].likes;
      } else {
        likes = 0;
      }
      const mealObj = new Meal(meal.strMeal, meal.strMealThumb, meal.idMeal, likes);
      mealObj.drawTheMeal();
  }
}
