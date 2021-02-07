const getMeals = (name) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((res) => res.json())
    .then((data) => displayMeals(data))
    .catch(() => errorHandler());
};

const submitHandler = () => {
  inputMeal = document.getElementById("inputMeal").value;
  inputMeal != "" ? getMeals(inputMeal) : emptyNotification();
  document.getElementById("inputMeal").value = "";
};

const emptyNotification = () => {
    document.getElementById("search-error").innerHTML = '';
    document.getElementById("empty-notification").innerHTML =`
    <p>Search field is empty! Enter a meal!</p>
    `; 
}

const errorHandler = () => {
  document.getElementById("search-error").innerHTML = `
  <h3 class="error-message">Oh snap! We can't find it. Try another meal.</h3>`;
};

const displayMeals = (data) => {
  document.getElementById("search-error").innerHTML = "";
  const mealsDiv = document.getElementById("meals");
  mealsDiv.innerHTML = "";
  document.getElementById("mealDetails").innerHTML = "";
  document.getElementById("empty-notification").innerHTML ="";
  data.meals.forEach((meal) => {
    const { strMeal, strMealThumb } = meal;
    const mealDiv = document.createElement("div");
    mealDiv.className = "meal";
    mealDiv.innerHTML = `
       <a href="#top">
        <div onclick="displayMealDetails('${strMeal}')">
          <img src="${strMealThumb}" alt="${strMeal}">
          <h3 class="meal-name">${strMeal}</h3>
        </div>
        </a>
      `;
    mealsDiv.appendChild(mealDiv);
  });
};

const displayMealDetails = (name) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((res) => res.json())
    .then((data) => {
      renderMealIngredients(data.meals[0]);
    });
};

const renderMealIngredients = (meal) => {
  const { strMeal, strMealThumb } = meal;
  const mealDetails = document.getElementById("mealDetails");
  mealDetails.innerHTML = `
      <div class="meal-details-card">
        <img src="${strMealThumb}" alt="${strMeal}">
         <div class="meal-info">
           <h3>${strMeal}</h3>
           <h4>Ingredients</h4>
           <ul class="ingredient-list">
             ${displayIngredientsList(meal)}
           </ul>
         </div>
      </div>
    `;
};

const displayIngredientsList = (list) => {
  let ingredients = "";
  for (let i = 1; i < 21; i++) {
    ingredients +=
      list["strIngredient" + i] != "" || null
        ? `<li><i class="far fa-check-square"></i>${
            list["strIngredient" + i]
          }</li>`
        : "";
  }
  return ingredients;
};
