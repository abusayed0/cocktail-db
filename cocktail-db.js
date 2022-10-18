/* function for load cocktails data,inside displaycocktails function called  */
const loadCocktails = async (cocktailName = "") => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`
    try {
        document.getElementById("spinner-parent").classList.remove("d-none");
        const res = await fetch(url);
        const data = await res.json();
        displayCocktails(data.drinks);
    }
    catch (error) {
        console.log(error)
    }
};

/* function for display cocktails  */
const displayCocktails = (cocktails) => {
    document.getElementById("spinner-parent").classList.add("d-none")
    if (cocktails === null) {
        document.getElementById("no-result").classList.remove("d-none");
    }
    else {
        document.getElementById("no-result").classList.add("d-none");
        const cocktailsContainer = document.getElementById("cocktails-container");
        cocktails.forEach(cocktail => {
            const div = document.createElement("div");
            div.classList.add("col");
            div.innerHTML = `
            <div class="card h-100">
                <img src=${cocktail.strDrinkThumb} class="card-img-top" alt="...">
                <div class="card-body">
                    <h4 class="card-title">name : ${cocktail.strDrink}</h4>
                    <h5 class="card-text">category : ${cocktail.strCategory}</h5>
                    <button onclick="loadDetails(${cocktail.idDrink})" type="button" class="btn btn-primary d-block mx-auto" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button>
                </div>
            </div>
       
         `
            cocktailsContainer.appendChild(div);
        });
    }
};

/* function for load details  */
const loadDetails = async (drinkId)=>{
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayDetais(data.drinks[0])
        
    } catch (error) {
        console.log(error)
    }
};

/* function for display details  */
const displayDetais = (cocktailDetails)=>{
    const {strDrink,strCategory,strDrinkThumb,strGlass,strInstructions} = cocktailDetails;
    console.log(cocktailDetails)
    document.getElementById("staticBackdropLabel").innerText = `${strDrink} details`
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `
        <div class="card">
            <img src=${strDrinkThumb} class="card-img-top" alt="..." height = "350px">
            <div class="card-body">
            <h5>category : ${strCategory}</h5>
            <h5>glass : ${strGlass}</h5>
            <p class="card-text">instruction : ${strInstructions}</p>
            </div>
        </div>
    `

}


/* function for get search field value */
const getSearchFieldValue = fieldId => {
    const searchField = document.getElementById(fieldId);
    const searchFieldValue = searchField.value;
    return searchFieldValue;
}

/* add event listener in search btn to get result according search.inside getSearchFieldValue function called */
document.getElementById("search-btn").addEventListener("click", () => {
    document.getElementById("cocktails-container").textContent = "";
    document.getElementById("no-result").classList.add("d-none")
    const search = getSearchFieldValue("search-field");
    loadCocktails(search)
})

/* added event listener in search field so that we can get search result by pressing enter button  */
document.getElementById("search-field").addEventListener("keypress",(event)=>{
    if(event.key === "Enter"){
        document.getElementById("search-btn").click();
    }
})

loadCocktails()