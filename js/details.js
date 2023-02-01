let curFoodId = window.location.search.substring(1); // fetching the id of meal from params
let ingred = [];
let ingredQuant = [];
showMeal();
// function to make an api call to fetch the meal with given id
async function getMeal() {
    if (curFoodId) {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${curFoodId}`)
        let data = await response.json();
        console.log(data.meals[0]);
        return data.meals[0];
    }
}
// function to show all the details of the meal
async function showMeal() {
    let mealObj = await getMeal();
    setHeading(mealObj);
    setImage(mealObj);
    getIngred(mealObj);
    showIngred();
    showReceipe(mealObj);
}
// function to set the heading of the page
function setHeading(meal) {
    let heading = document.querySelector(".body-heading h1");
    heading.innerHTML = meal.strMeal;
}
//function to set the meal image
function setImage(meal) {
    let image = document.querySelector(".meal-image img");
    image.setAttribute("src", `${meal.strMealThumb}`)
}
// function to get ingredients and their quantity from the meal object
function getIngred(meal) {
    let i = 1;
    while (true) { //fetching all the ingredients and storing them
        if (!meal[`strIngredient${i}`]) {
            break;
        }
        ingred.push(meal[`strIngredient${i}`]);
        i++;
    }

    let j = 1;
    while (j <= i) { //fetching all the ingredients quantity and storing them
        ingredQuant.push(meal[`strMeasure${j}`]);
        j++;
    }
    console.log(ingred);
    console.log(ingredQuant);
}
// function to populate the ingredients from ingredients quantity in dom
function showIngred() {
    let ingredList = document.querySelector(".ingredients-list");
    let code = ``;
    ingred.forEach((item, index) => {
        code += `<li class="list-group-item d-flex justify-content-between align-items-center">
               ${item}
             <span class="badge bg-dark">${ingredQuant[index]}</span>
             </li>`
    })
    ingredList.innerHTML += code;
}
// function to populate the receipe in dom
function showReceipe(meal) {
    let recepie = document.querySelector(".instruction-content p");
    console.log(meal.strInstructions);
    recepie.innerHTML = meal.strInstructions
}