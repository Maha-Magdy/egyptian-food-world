/* eslint-disable import/prefer-default-export */
/* eslint-disable no-restricted-syntax */

import Meal from './meal.js';

export function updateMealsNumber(mealsList) {
  document.getElementById('meals-num').textContent = mealsList.length;
}

function createMealsObject(mealsList, likesList) {
  for (const meal of mealsList) {
    let likes;
    const likeObj = likesList.filter((obj) => obj.item_id === meal.idMeal);
    if (likeObj.length === 1) {
      likes = likeObj[0].likes;
    } else {
      likes = 0;
    }
    const mealObj = new Meal(
      meal.strMeal,
      meal.strMealThumb,
      meal.idMeal,
      likes,
    );
    mealObj.drawTheMeal();
  }
}

async function egyptianMeals() {
  const egyptianFood = await fetch(
    'https://www.themealdb.com/api/json/v1/1/filter.php?a=Egyptian',
  );
  const egyptianMeals = await egyptianFood.json();
  const egyptianMealsList = egyptianMeals.meals;
  const egyptianMealsLikes = await fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/necgfXW8nUf9YW13OlZY/likes',
  );
  const egyptianMealsLikesList = await egyptianMealsLikes.json();
  updateMealsNumber(egyptianMealsList);
  createMealsObject(egyptianMealsList, egyptianMealsLikesList);
}

window.addEventListener('load', egyptianMeals());
