const findMeal = () => {
    const searchText = document.getElementById('searchField').value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
​
    fetch(url)
    .then(res => res.json())
    .then(data => {
        const foodListContainer = document.getElementById('foodList');
​
        // Clear previous search results
        foodListContainer.innerHTML = '';
​
        if (data.meals) {
            // If meals are found, iterate over each meal and display its name
            data.meals.forEach(meal => {
                const mealName = meal.strMeal;
                const mealItem = document.createElement('div');
                mealItem.textContent = mealName;
                mealItem.classList.add('meal-item');
                mealItem.addEventListener('click', () => {
                    // When the meal item is clicked, fetch its details
                    displayMealIngredients(meal.idMeal);
                });
                foodListContainer.appendChild(mealItem);
            });
        } else {
            // If no meals are found, display a message
            foodListContainer.textContent = 'No meals found';
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}
​
const displayMealIngredients = (mealId) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
​
    fetch(url)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0];
​
        if (meal && meal.strIngredient) {
            const mealIngredients = meal.strIngredient;
            const ingredientList = document.createElement('ul');
​
            // Create list items for each ingredient
            mealIngredients.forEach(ingredient => {
                const ingredientItem = document.createElement('li');
                ingredientItem.textContent = ingredient;
                ingredientList.appendChild(ingredientItem);
            });
​
            // Display the ingredient list in the foodListContainer
            const foodListContainer = document.getElementById('foodList');
            foodListContainer.innerHTML = '';
            foodListContainer.appendChild(ingredientList);
        } else {
            console.error('Meal details not found');
        }
    })
    .catch(error => {
        console.error('Error fetching meal details:', error);
    });
}