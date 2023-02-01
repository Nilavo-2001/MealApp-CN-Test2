console.log("I am loaded");
typeSearch();
searchButton();
let myList = [];
async function getMeal(name) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    let data = await response.json();
    //console.log(data);
    return data.meals;
}
function typeSearch() {
    let searchBar = document.querySelector(".search-type");
    searchBar.addEventListener("keyup", async function () {
        let meals;
        if (this.value) {
            meals = await getMeal(this.value)
        }
        clearResults();
        if (meals && this.value) {
            for (const meal of meals) {
                let newResult = createResult(meal);
                addResult(newResult);
            }
        }

    })
}
function createResult(meal) {
    let newCard = `<div class="card" style="width: 18rem;">
    <div class="card-body">
        <h5 class="card-title fs-3">${meal.strMeal}</h5>
        <a href="./details.html?${meal.idMeal}" target="_blank" class="btn btn-dark details-btn">More Details</a>
        <a  class="btn btn-dark fav-btn" data-meal="${meal.strMeal}" onclick="addFav(this)">Add to favourites</a>
    </div>
</div>`
    return newCard;
}
function addResult(result) {
    let results = document.querySelector(".search-result-content");
    results.innerHTML += result;
}
function clearResults() {
    let results = document.querySelector(".search-result-content");
    results.innerHTML = "";
}
function searchButton() {
    let btn = document.querySelector(".search-button");
    btn.addEventListener("click", function () {
        document.querySelector(".search-type").value = "";
        let results = document.querySelector(".search-result-content");
        if (!results.innerHTML) {
            results.innerHTML = `<h1 class="display-1" style="margin:0 auto">NO RESULT</h1>`;
        }
    })
}
function addFav(btn) {
    let item = btn.getAttribute("data-meal");
    myList.push(item);
    localStorage.setItem("favs", JSON.stringify(myList));
}
