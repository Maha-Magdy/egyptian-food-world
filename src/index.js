import "bootswatch/dist/journal/bootstrap.min.css";
import './css/style.css';

async function egyptianMeals() {
    let egyptianFood = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Egyptian');
    const egyptianMeals = await egyptianFood.json();
    const egyptianMealsList = egyptianMeals.meals;
    updateMealsNumber(egyptianMealsList);
}

window.addEventListener('load', egyptianMeals());

function updateMealsNumber(mealsList) {
    document.getElementById('meals-num').textContent = mealsList.length;
}