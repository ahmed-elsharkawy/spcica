let recipesBox = document.getElementById("recipesBox");
let searchButton = document.getElementById("searchButton");
let searchInput = document.getElementById("searchInput");
let recipeDetails = document.getElementById("recipeDetails");
let allRecipes = [];

async function getRecipe(term){
    let apiResponse =await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${term}`);
    allRecipes = await apiResponse.json();
    allRecipes = allRecipes.recipes;
    displayRecipes();
}

function displayRecipes(){
    let box = '';
    for(let i=0; i<allRecipes.length; i++){
        box +=
        `<div  onclick="getRecipeDetails('${allRecipes[i].recipe_id}')" class="col-lg-3 col-md-4 col-sm-6">
            <div class="recipe mb-5">
                <img class="w-100" src="${allRecipes[i].image_url}" alt="">
                <div class="other text-center">
                    <h5 class="text-warning lead">${allRecipes[i].title}</h5>
                    <p class="">${allRecipes[i].publisher}</p>
                    <button class="btn btn-warning">
                    <a target="_blank" href="${allRecipes[i].source_url}" class="text-white">details</a>
                    </button>
                </div>
            </div>
        </div>`
    }
    recipesBox.innerHTML = box;
}
async function getRecipeDetails(id){
    let recipeDetails = '';

    let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
    apiResponse = await apiResponse.json();
    recipeDetails = apiResponse.recipe;
    showRecipe(recipeDetails)
}

function showRecipe(d){
    let box = '';
    box += `<div class="details">
                <h3 class="text-warning my-3 font-weight-light">${d.title}</h3>
                <img src="${d.image_url}" class="w-100" alt="">
                <p class="text-warning font-weight-bolder">${d.publisher}</p>
                <ul>
                `
                for(let i=0; i<d.ingredients.length; i++){
                    box += `<li>${d.ingredients[i]}</li>`
                }
                box += `</ul></div>`;
    recipeDetails.innerHTML = box;
}
searchButton.addEventListener('click', function(){
    getRecipe(searchInput.value);
})