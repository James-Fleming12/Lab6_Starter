// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  // Get the recipes from localStorage
  let recipes = getRecipesFromStorage();
  // Add each recipe to the <main> element
  addRecipesToDocument(recipes);
  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form).
 */
function getRecipesFromStorage() {
  // A9. Complete the functionality as described
  return JSON.parse(localStorage.getItem('recipes')) || [];
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 */
function addRecipesToDocument(recipes) {
  // A10. Get a reference to the <main> element
  const mainElement = document.querySelector('main');

  // A11. Loop through each of the recipes...
  recipes.forEach(recipe => {
    // create a <recipe-card> element for each one
    const recipeCard = document.createElement('recipe-card');
    // populate each <recipe-card> with that recipe data
    recipeCard.data = recipe;
    // Append each element to <main>
    mainElement.appendChild(recipeCard);
  });
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  // EXPLORE - START (All explore numbers start with B)
  // B1. Complete the functionality as described in this function header
  localStorage.setItem('recipes', JSON.stringify(recipes));
}

/**
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
  // B2. Get a reference to the <form> element
  const form = document.querySelector('form');

  // B3. Add an event listener for the 'submit' event, which fires when the submit button is clicked
  form.addEventListener('submit', (event) => {
    // Prevent the default form submission behavior (which refreshes the page)
    event.preventDefault();

    // Steps B4-B9 will occur inside the event listener from step B3
    // B4. Create a new FormData object from the <form> element reference above
    const formData = new FormData(form);

    // B5. Create an empty object, extract keys/values from FormData, and insert them into recipeObject
    const recipeObject = {};
    for (const [key, value] of formData.entries()) {
      recipeObject[key] = value;
    }

    // B6. Create a new <recipe-card> element
    const recipeCard = document.createElement('recipe-card');

    // B7. Add the recipeObject data to <recipe-card> using element.data
    recipeCard.data = recipeObject;

    // B8. Append this new <recipe-card> to <main>
    document.querySelector('main').appendChild(recipeCard);

    // B9. Get the recipes array from localStorage, add this new recipe to it, and save back to localStorage
    const recipes = getRecipesFromStorage();
    recipes.push(recipeObject);
    saveRecipesToStorage(recipes);
  });

  // B10. Get a reference to the "Clear Local Storage" button
  // Note: Adjust the selector if your button uses a specific ID or class (e.g., '#clear-recipes' or '.danger')
  const clearBtn = document.querySelector('.danger'); 

  // B11. Add a click event listener to clear local storage button
  clearBtn.addEventListener('click', () => {
    // Steps B12 & B13 will occur inside the event listener from step B11
    // B12. Clear the local storage
    localStorage.clear();

    // B13. Delete the contents of <main>
    document.querySelector('main').innerHTML = '';
  });
}