let curFoodId = window.location.search.substring(1);
let ingred = [];
let ingredQuant = [];
showMeal();
async function getMeal() {
    if (curFoodId) {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${curFoodId}`)
        let data = await response.json();
        console.log(data.meals[0]);
        return data.meals[0];
    }
}
async function showMeal() {
    let mealObj = await getMeal();
    setHeading(mealObj);
    setImage(mealObj);
    getIngred(mealObj);
    showIngred();
    showReceipe(mealObj);
}

function setHeading(meal) {
    let heading = document.querySelector(".body-heading h1");
    heading.innerHTML = meal.strMeal;
}
function setImage(meal) {
    let image = document.querySelector(".meal-image img");
    image.setAttribute("src", `${meal.strMealThumb}`)
}
function getIngred(meal) {
    let i = 1;
    while (true) {
        if (!meal[`strIngredient${i}`]) {
            break;
        }
        ingred.push(meal[`strIngredient${i}`]);
        i++;
    }

    let j = 1;
    while (j <= i) {
        ingredQuant.push(meal[`strMeasure${j}`]);
        j++;
    }
    console.log(ingred);
    console.log(ingredQuant);
}
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
function showReceipe(meal) {
    let recepie = document.querySelector(".instruction-content p");
    console.log(meal.strInstructions);
    recepie.innerHTML = meal.strInstructions
}