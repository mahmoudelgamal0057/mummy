/* *************************************** General *************************************** */

let darkMenuWidth = $('.dark-menu-nav').width();

searchByName("").then(() => {
    $(".loading-screen").fadeOut(500, () => {
        $("body").css("overflow", "visible")
        $(".nav-menu").css("display", "flex")
    })
})

/* *********************************** Toggeling Menu ************************************ */

$('.menu-toggle').click(function () {
    menuToggle();
})

function menuToggle(){
    if($('.dark-menu-nav').css('left') == '0px'){

        $('.dark-menu-nav').animate({left: -darkMenuWidth}, 150);
        $('.nav-menu').animate({left: 0}, 150); 
        $('.menu-icon').removeClass('fa-times').addClass('fa-align-justify');
        $(".nav-items li").animate({ opacity: "0", paddingTop: "500px"}, 500)
        
    }
    else{
        $('.dark-menu-nav').animate({left: 0}, 100); 
        $('.nav-menu').animate({left: darkMenuWidth}, 100);
        $('.menu-icon').removeClass('fa-align-justify').addClass('fa-times');

        $(".nav-items .item1").animate({ opacity: "1",paddingTop: "25px"}, 1100); 	 
        $(".nav-items .item2").animate({ opacity: "1",paddingTop: "25px"}, 1200);    
        $(".nav-items .item3").animate({ opacity: "1",paddingTop: "25px"}, 1300);    
        $(".nav-items .item4").animate({ opacity: "1",paddingTop: "25px"}, 1400);    
        $(".nav-items .item5").animate({ opacity: "1",paddingTop: "25px"}, 1500);   
    }
}

/* ************************************** Nav Links ************************************** */

$('.dark-menu-nav .nav-items a').click(async function(){
    var clickedAncorText = $(this).text();
    menuToggle();
    $('#search-container').html(``);
    $('#dataInRow').html(``);
    if(clickedAncorText == 'Search'){
        $("#search-container").html(`
        <div class="row">
            <div class="col-md-6 mb-3">
               <input id="searchByName" class="form-control mb-2 " placeholder="Search By Name">
            </div>
            <div class="col-md-6 searchLetter mb-3">
               <input class="form-control" type="text" maxlength="1" id="searchByLetter"
                placeholder="search By First Letter ...">

                <p class=' text-danger mt-2 text-center paragraph'>You are allowed to enter one letter here to search<p>
            </div>
        </div>
        `);

        $('#searchByName').keyup(function(){
            var searchByNameResult = $(this).val();
            searchByName(searchByNameResult);
        })
        $('#searchByLetter').keyup(function(){
            var searchByLetterResult = $(this).val();
            searchByLetter(searchByLetterResult);
        })
      
    }
    else if(clickedAncorText == 'Categories'){
        getCategories();
    }
    else if(clickedAncorText == 'Area'){
        getAreas();
    }
    else if(clickedAncorText == 'Ingredients'){
        getIngredients();
    }
    else if (clickedAncorText == 'Contact Us'){
        /* Contact(); */
        document.getElementById('dataInRow').innerHTML = `
    <section id="contact" class="container w-75 mx-auto mb-5 text-center">
    <div class="p-2">
        <h2 class="text-light mb-5">ContacUs...</h2>
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <input class="form-control" onkeyup="validation()" id="userName"
                        placeholder="Enter Your Name">
                    <div class="alert mt-1 alert-danger d-none" id="nameAlert" role="alert">
                        Special Characters and Numbers not allowed
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input onkeyup="validation()" class="form-control" id="userEmail" placeholder="Enter Email">
                    <div class="alert mt-1 alert-danger d-none" id="emailAlert" role="alert">
                        Enter valid email. *Ex: xxx@yyy.zzz
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input onkeyup="validation()" class="form-control" id="userPhone" placeholder="Enter phone">
                    <div class="alert mt-1 alert-danger  d-none" id="phoneAlert" role="alert">
                        Enter valid Phone Number
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input onkeyup="validation()" class="form-control" id="userAge" placeholder="Enter Age">
                    <div class="alert mt-1 alert-danger  d-none" id="ageAlert" role="alert">
                        Enter valid Age
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input onkeyup="validation()" class="form-control" type="password" id="userPassword"
                        placeholder="Enter Password">
                    <div class="alert mt-1 alert-danger d-none" id="passwordAlert" role="alert">
                        Enter valid password *Minimum eight characters, at least one letter and one number:*
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input onkeyup="validation()" class="form-control" type="password" id="userRepassword"
                        placeholder="Enter RePassword">
                    <div class="alert mt-1 alert-danger  d-none" id="repasswordAlert" role="alert">
                        Enter valid Repassword
                    </div>
                </div>
            </div>
        </div>

        <button type="submit" disabled id="submitBtn" class="btn btn-outline-danger mt-4">Submit</button>
    </div> </section>`;


    var userName= document.getElementById('userName');
    var userEmail= document.getElementById('userEmail');
    var userPhone= document.getElementById('userPhone');
    var userAge= document.getElementById('userAge');
    var userPassword= document.getElementById('userPassword');
    var userRepassword= document.getElementById('userRepassword');

    var nameAlert = document.getElementById("nameAlert");
    var emailAlert = document.getElementById("emailAlert");
    var phoneAlert = document.getElementById("phoneAlert");
    var ageAlert = document.getElementById("ageAlert");
    var passwordAlert = document.getElementById("passwordAlert");
    var repasswordAlert = document.getElementById("repasswordAlert");
    }

    userName.addEventListener("focus", () => {
        nameChanged = 1;
    })
    userEmail.addEventListener("focus", () => {
        emailChanged = 1;
    })
    userPhone.addEventListener("focus", () => {
        phoneChanged = 1;
    })
    userAge.addEventListener("focus", () => {
        ageChanged = 1;
    })
    userPassword.addEventListener("focus", () => {
        passwordChanged = 1;
    })
    userRepassword.addEventListener("focus", () => {
        repasswordChanged = 1;
    })

})

/* ************************************** Search ***************************************** */

async function searchByName(text){
    $(".section-loading").css("display", "flex").hide().fadeIn();
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`);
    let result = await data.json();
    let mealsArray = result.meals;
    displayMeals(mealsArray);
    $(".section-loading").css("display", "none").fadeOut(800)
}
async function searchByLetter(letter){
    $(".section-loading").css("display", "flex").hide().fadeIn();
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    let result = await data.json();
    let mealsArray = result.meals;
    displayMeals(mealsArray);
    /* console.log(mealsArray); */
    $(".section-loading").css("display", "none").fadeOut(800)
}
function displayMeals(array){
    let cartona = '';
    for(let i = 0; i < array.length; i++){
        cartona += `
        <div class="col-md-6 col-lg-3 my-3">
           <div class="meal shadow rounded position-relative" onclick="getMealDetails('${array[i].idMeal}')">
              <div class="post">
                <img src='${array[i].strMealThumb}' class="w-100 rounded" />
                <div class="layer d-flex align-items-center">
                    <div class="info p-2">
                        <h2>${array[i].strMeal}</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    
    }
    document.getElementById('dataInRow').innerHTML = cartona;
    $("html, body").animate({ scrollTop: 0 }, 200)
}

/* ************************************* Categories *************************************** */

async function getCategories(){
    $(".section-loading").css("display", "flex").hide().fadeIn();
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let result = await data.json();
    displayCategories(result.categories);
    $(".section-loading").css("display", "none").fadeOut(1000)
}
function displayCategories(array){
    let cartona = '';
    for(let i = 0; i < array.length; i++){
        cartona += `
        <div class="col-md-6 col-lg-3 my-3">
           <div class="meal shadow rounded position-relative">
              <div class="post" onclick="filterByCategory('${array[i].strCategory}')">
                <img src='${array[i].strCategoryThumb}' class="w-100 rounded" />
                <div class="layer d-flex align-items-center text-center">
                    <div class="info p-2">
                        <h2>${array[i].strCategory}</h2>
                        <p>${array[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}<p>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    
    }
    document.getElementById('dataInRow').innerHTML = cartona;
}
async function filterByCategory(categoryName){
    $(".section-loading").css("display", "flex").hide().fadeIn();
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
    let result = await data.json();
    let mealsArray = result.meals;
    /* console.log(mealsArray); */
    displayMeals(mealsArray);
    $(".section-loading").css("display", "none").fadeOut(1000)
}

/* ************************************ Meal Details *************************************** */

async function getMealDetails(id){
    $(".section-loading").css("display", "flex").fadeIn(500);
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let result = await data.json();
    let mealsArray = result.meals;
    displayMealDetails(mealsArray[0]);
    $(".section-loading").css("display", "none").fadeOut(1000)

}
function displayMealDetails(array){
    let cartona = '';
    let recipes = '';
    var tags = '';

    tagsAfterSplit = array.strTags?.split(",")

    for (let i = 1; i <= 20; i++) {
        if (array[`strIngredient${i}`]) {
            recipes += `<span class="green-component my-3 me-1">${array[`strMeasure${i}`]} ${array[`strIngredient${i}`]}</span>`
        }
    }
  
    for (let i = 0; i < tagsAfterSplit?.length; i++) { 
        tags += `<span class="red-component my-3 me-1">${tagsAfterSplit[i]}</span>`
    }

        cartona += `<div class="col-md-6 col-lg-4 my-3">
                <img src='${array.strMealThumb}' class="w-100" />
                <h1 class="text-center">${array.strMeal}</h1>
        </div>
            <div class="col-md-6 col-lg-8 my-3">
                <h2>Instructions</h2>
                <p>${array.strInstructions}</p>
                <h6 class="d-inline-block mb-4">Area : </h6> 
                <span>${array.strArea}</span>
                <br>                                 
                <h6 class="d-inline-block">Category :</h6> 
                <span>${array.strCategory}</span>

                <h3 class="my-4">Recipes :</h3>
                <div id='recipes' class='d-flex flex-wrap'>
                   
                </div>

                <h3 class="my-4 me-3">Tags :</h3>
                <div id='tags' class = 'my-4'>
                </div>

                <button class="btn btn-success"><a href='${array.strSource}'>Source</a></button>
                <button class="btn btn-danger"><a href='${array.strYoutube}'>Youtube</a></button>
            </div>`

        document.getElementById('dataInRow').innerHTML = cartona;
        document.getElementById('tags').innerHTML = tags; 
        document.getElementById('recipes').innerHTML = recipes;
        $("html, body").animate({ scrollTop: 0 }, 200)
}

/* *************************************** Areas ******************************************* */

async function getAreas(){
    $(".section-loading").css("display", "flex").hide().fadeIn();
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let result = await data.json();
    displayAreas(result.meals.splice(0, 20));
    $(".section-loading").css("display", "none").fadeOut(1000)
}

function displayAreas(array){
    console.log(array);
    let cartona = '';
    for(let i = 0; i < array.length; i++){
        cartona += `
        <div class="col-md-6 col-lg-3 my-3">
           <div class="meal shadow rounded position-relative text-center">
           <div onclick="filterByArea('${array[i].strArea}')" class="post">
                <i class="fa-solid fa-city fa-3x"></i>
                <h2 class="text-white">${array[i].strArea}</h2>
            </div>
        </div>
    </div>`
    
    }
    document.getElementById('dataInRow').innerHTML = cartona;
}

async function filterByArea(areaName){
    $(".section-loading").css("display", "flex").hide().fadeIn();
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`);
    let result = await data.json();
    let mealsAreaArray = result.meals;
    /* console.log(mealsArray); */
    displayMeals(mealsAreaArray);
    $(".loading-screen").css("display", "none").fadeOut(1000)
}

/* ************************************** Ingredients ************************************** */

async function getIngredients(){
    $(".section-loading").css("display", "flex").hide().fadeIn();
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let result = await data.json();
    displayIngredients(result.meals.splice(0, 20));
    $(".section-loading").css("display", "none").fadeOut(1000)
}

function displayIngredients(array){
    console.log(array);
    let cartona = '';
    for(let i = 0; i < array.length; i++){
        cartona += `
    <div class="col-md-6 col-lg-3 my-3">
      <div class="meal shadow rounded position-relative text-center">
        <div onclick="filterByIngredients('${array[i].strIngredient}')" class="post">
           <div class="post ">
              <i class="fa-solid fa-bowl-food fa-3x"></i>
              <h2 class="text-white">${array[i].strIngredient}</h2>
              <p class="text-white">${array[i].strDescription.split(" ").splice(0,20).join(" ")}</p>
            </div>
        </div>
      </div>
    </div>`
    
    }
    document.getElementById('dataInRow').innerHTML = cartona;
}

async function filterByIngredients(Name){
    $(".section-loading").css("display", "flex").hide().fadeIn();
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Name}`);
    let result = await data.json();
    let mealsAreaArray = result.meals;
    displayMeals(mealsAreaArray);
    $(".section-loading").css("display", "none").fadeOut(1000)
}

/* *************************************** Contact **************************************** */

   let nameChanged = 0,
    emailChanged = 0,
    phoneChanged = 0,
    ageChanged = 0,
    passwordChanged = 0,
    repasswordChanged = 0;
    
function validation(){
    if (nameChanged){
        validateUserName();
    }
    if (emailChanged){
        validateUserEmail();
    }
    if (phoneChanged){
        validateUserPhone();
    }
    if (ageChanged){
        validateUserAge();
    }
    if (passwordChanged){
        validateUserPassword();
    }
    if (repasswordChanged){
        validateUserRepassword();
    }
    validateUser();
} 

/* ----- validate Name -----*/

function validateName(){
    var regex = /^[a-zA-Z ]+$/;
    return regex.test(userName.value);
}
function validateUserName(){
    
    if(validateName()){

        if(userName.classList.contains('is-invalid')){
            userName.classList.replace('is-invalid', 'is-valid');
            nameAlert.classList.replace("d-block", "d-none")
        }
        else{
            userName.classList.add('is-valid');
            nameAlert.classList.replace("d-block", "d-none")
        }
        return true;
    }
    else {
        userName.classList.add('is-invalid');
        nameAlert.classList.replace("d-none", "d-block")
        return false;
    }
}

/* ----- validate Email -----*/

function validateEmail(){
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(userEmail.value);
}
function validateUserEmail(){
    
    if(validateEmail()){

        if(userEmail.classList.contains('is-invalid')){
            userEmail.classList.replace('is-invalid', 'is-valid');
            emailAlert.classList.replace("d-block", "d-none")
        }
        else{
            userEmail.classList.add('is-valid');
            emailAlert.classList.replace("d-block", "d-none")
        }
        return true;
    }
    else{
        userEmail.classList.add('is-invalid');
        emailAlert.classList.replace("d-none", "d-block")
        return false;
    }
}

/* ----- validate Phone -----*/

function validatePhone(){
    var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return regex.test(userPhone.value);
}
function validateUserPhone(){
    
    if(validatePhone()){

        if(userPhone.classList.contains('is-invalid')){
            userPhone.classList.replace('is-invalid', 'is-valid');
            phoneAlert.classList.replace("d-block", "d-none")
        }
        userPhone.classList.add('is-valid');
        phoneAlert.classList.replace("d-block", "d-none")
        return true;
    }
    else{
        userPhone.classList.add('is-invalid');
        phoneAlert.classList.replace("d-none", "d-block")
        return false;
    }
}

/* ----- validate Age -----*/

function validateAge(){
    var regex = /^[1-9][0-9]?$|^100$/gm;
    return regex.test(userAge.value);
}
function validateUserAge(){

    if(validateAge()){

        if(userAge.classList.contains('is-invalid')){
            userAge.classList.replace('is-invalid', 'is-valid');
            ageAlert.classList.replace("d-block", "d-none")

        }
        userAge.classList.add('is-valid');
        ageAlert.classList.replace("d-block", "d-none")
        return true;
    }
    else{
        userAge.classList.add('is-invalid');
        ageAlert.classList.replace("d-none", "d-block")
        return false;
    }

}

/* ----- validate Password -----*/

function validatePassword(){
    var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gm;
    return regex.test(userPassword.value);
}
function validateUserPassword(){
    
    if(validatePassword()){

        if(userPassword.classList.contains('is-invalid')){
            userPassword.classList.replace('is-invalid', 'is-valid');
            passwordAlert.classList.replace("d-block", "d-none");

        }
        userPassword.classList.add('is-valid');
        passwordAlert.classList.replace("d-block", "d-none");
        return true;
    }
    else{
        userPassword.classList.add('is-invalid');
        passwordAlert.classList.replace("d-none", "d-block");
        return false;
    }

}

/* ----- validate repassword -----*/


function validateRepassword(){
    return userPassword.value == userRepassword.value;
}
function validateUserRepassword(){

    if(validateRepassword()){

        if(userRepassword.classList.contains('is-invalid')){
            userRepassword.classList.replace('is-invalid', 'is-valid');
            repasswordAlert.classList.replace("d-block", "d-none");
        }
        userRepassword.classList.add('is-valid');
        repasswordAlert.classList.replace("d-block", "d-none");
        return true;
    }
    else{
        userRepassword.classList.add('is-invalid');
        repasswordAlert.classList.replace("d-none", "d-block");
        return false;

    }

}

/* ----- validate User -----*/

function validateUser(){
    if(validateName() && validateEmail() && validatePhone() && validateAge() && validatePassword() && validateRepassword()){
        document.getElementById("submitBtn").removeAttribute("disabled");
    }
    else{
        document.getElementById("submitBtn").setAttribute("disabled","true")
    }
}

