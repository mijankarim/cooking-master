const getMeals = (name) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((res) => res.json())
    .then((data) => displayMeals(data))
    .catch(() => errorHandler());
};

const errorHandler = () => {
  document.getElementById("search-error").style.display = "block";
};

const submitHandler = () => {
  inputMeal = document.getElementById("inputMeal").value;
  getMeals(inputMeal);
  document.getElementById("inputMeal").value = "";
};

const displayMeals = (data) => {
  console.log(data);
  const mealsDiv = document.getElementById("meals");
  mealsDiv.innerHTML = "";
  document.getElementById("mealDetails").innerHTML ="";
  data.meals.forEach((meal) => {
    const mealDiv = document.createElement("div");
    mealDiv.className = "meal";
    mealDiv.innerHTML = `
       <a href="#site-title">
        <div onclick="displayMealDetails('${meal.strMeal}')">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <h3 class="meal-name">${meal.strMeal}</h3>
        </div>
        </a>
      `;
    mealsDiv.appendChild(mealDiv);
  });
  document.getElementById("search-error").style.display = "none";
};

const displayMealDetails = (name) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((res) => res.json())
    .then((data) => {
      renderMealIngredients(data.meals[0]);
    });
};

const renderMealIngredients = (meal) => {
  console.log(meal);
  const mealDetails = document.getElementById("mealDetails");
  mealDetails.innerHTML = `
      <div class="meal-details-card">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="meal-info">
           <h3>${meal.strMeal}</h3>
           <h4>Ingredients</h4>
           <ul class="ingredient-list">
            <li>${meal.strIngredient1}</li>
            <li>${meal.strIngredient2}</li>
            <li>${meal.strIngredient3}</li>
            <li>${meal.strIngredient4}</li>
            <li>${meal.strIngredient5}</li>
            <li>${meal.strIngredient6}</li>
            <li>${meal.strIngredient7}</li>
            <li>${meal.strIngredient8}</li>
            <li>${meal.strIngredient9}</li>
            <li>${meal.strIngredient10}</li>
            <li>${meal.strIngredient11}</li>
            <li>${meal.strIngredient12}</li>
            <li>${meal.strIngredient13}</li>
            <li>${meal.strIngredient14}</li>
            <li>${meal.strIngredient15}</li>
            <li>${meal.strIngredient16}</li>
            <li>${meal.strIngredient17}</li>
            <li>${meal.strIngredient18}</li>
            <li>${meal.strIngredient19}</li>
            <li>${meal.strIngredient20}</li>
        </ul>
      </div>
      </div>
    `;
};
