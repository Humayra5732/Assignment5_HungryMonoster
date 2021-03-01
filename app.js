
// Calling API for Fetching food details - starts here 
const getFoodName = foodName =>{
    const url = (`https://www.themealdb.com/api/json/v1/1/search.php?f=${foodName}`);
    fetch(url)
    .then(res => res.json())
    // .then(data => console.log(data));
    .then(data => displayFoodList(data))
    .catch(error => console.log(error))
};
// Calling API for Fetching food details - ends here 


// Search Button starts here 
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click',()=>{
    const inputFood = document.getElementById('input-food').value;
    if(inputFood == ""){
        alert(" Please enter food's first letter!");
        
    }
    getFoodName(inputFood);
   
} );

 // Search Button ends here 


 // Search results starts here 
    const displayFoodList = foodList => {
    const foodDiv = document.getElementById('food-details');
    const foodArray = foodList.meals;
     for (let i = 0; i < foodArray.length; i++) {
         const foodItem = foodArray[i];
         const foodDetailDiv = document.createElement('div');
          foodDetailDiv.className = 'food-item-div'; // declaring class  name

       const foodInfo =  `
                 <div>
                <img src="${foodItem.strMealThumb}" >
                 <h3> ${foodItem.strMeal}</h3>
                 <button id="details" onclick="secondApiCall('${foodItem.strMeal}')" >Details</button>  
                  </div> `;
            
       foodDetailDiv.innerHTML = foodInfo;
       foodDiv.appendChild(foodDetailDiv); 
       document.getElementById('input-food').value = " ";   
   }
     }
     //  Search results ends here 
     
    // Meals list showing starts here  - Calling tthe second API Starts here
     const secondApiCall = mealList =>{
    //    console.log(mealList);
      fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealList}`)
     .then(res => res.json())
     .then(data => foodIngredients(data.meals[0]));
    
    }

       const foodIngredients = ingredients =>{
        // console.log(ingredients);
        const ingredientDiv = document.getElementById('food-ingredient');
        ingredientDiv.innerHTML = `
        <img src="${ingredients.strMealThumb}" >
        <h3> ${ingredients.strMeal}</h3>
        <div id="ingredient-list"></div>
       
        `;

        const ingredientList = Object.values(ingredients);
        // console.log(ingredientList);
        for (let i = 9; i < 14; i++) {
            const element = ingredientList[i];
            // console.log(element);
            const mealIngredient = document.getElementById('ingredient-list');
            const item = document.createElement('p');
            item.innerText = "✔ " + element;
            mealIngredient.appendChild(item); 
            
        }
        document.getElementById('food-details').value = "";
        };
    
// meal list showing ends here 
    
// getFoodName('a');