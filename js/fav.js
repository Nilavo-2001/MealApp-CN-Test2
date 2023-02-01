console.log("I am loaded");
let items = JSON.parse(localStorage.getItem("favs")); // fetching the meals from local storage
showItems();

// function to populate the meals in dom
function showItems() {
    let itemsContainer = document.querySelector(".fav-list ul");
    let code = ``;
    items.forEach((element, index) => {
        code += `<li class="list-item">${element} <button data-index="${index}" type="button" class="btn-close remove-btn"
        aria-label="Close" onclick="deleteItem(this)"></button></li>`
    });
    itemsContainer.innerHTML = code;
}
// function to delete a meal 
function deleteItem(item) {
    let index = item.getAttribute("data-index");
    items.splice(index, 1);
    showItems();
    localStorage.setItem("favs", JSON.stringify(items))
} 