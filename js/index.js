console.log("I am loaded");
typeSearch();
searchButton();
let myList = (localStorage.getItem("favs")) ? JSON.parse(localStorage.getItem("favs")) : [];
async function getMeal(name) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    let data = await response.json();
    //console.log(data);
    return data.meals;
}
async function showResult() {
    let searchBar = document.querySelector(".search-type");
    let resultsShow = document.querySelector(".search-result-content");
    let meals;
    if (searchBar.value) {
        meals = await getMeal(searchBar.value);
    }
    clearResults();
    if (meals && searchBar.value) {
        for (const meal of meals) {
            let newResult = createResult(meal);
            addResult(newResult);
        }
        return true;
    }
    else {
        return false;
    }
}
function typeSearch() {
    let searchBar = document.querySelector(".search-type");
    searchBar.addEventListener("keyup", showResult)
}
function createResult(meal) {
    let newCard = `<div class="card" style="width: 18rem;">
    <div class="card-body">
        <h5 class="card-title fs-3">${meal.strMeal}</h5>
        <a href="./html/details.html?${meal.idMeal}" target="_blank" class="btn btn-dark details-btn">More Details</a>
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
        showResult().then((data) => {
            if (!data) {
                let results = document.querySelector(".search-result-content");
                results.innerHTML = `<h1 class="display-1" style="margin:0 auto">NO RESULT</h1>`;
            }
        });
        addSpinner();
    })
}
function addFav(btn) {
    let item = btn.getAttribute("data-meal");
    myList.push(item);
    localStorage.setItem("favs", JSON.stringify(myList));
}
function addSpinner() {
    let results = document.querySelector(".search-result-content");
    results.innerHTML = `<div class="spinner-border" style="width: 3rem; height: 3rem; margin:5px auto" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>`;
}
