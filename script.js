//https://developer.marvel.com/
//https://api.adviceslip.com/
//https://spoonacular.com/
//https://www.themealdb.com/api.php?ref=apilist.fun

//api key spoonacular API Key: 58cd43a79687451a8ee6af64d2b39f36

const divDataContainer = document.querySelector('.dataContainer')
const input = document.querySelector('input');
const search = document.querySelector('.search');
const clear = document.querySelector('.clear');

function loadSuperheros() {
    $(".dataContainer").empty();
    input.value = "";

    $.ajax(`https://gateway.marvel.com/v1/public/characters?limit=100&ts=1&orderBy=name&apikey=1c2ddf52fa1ba966fc7d0b3cdd6e241b&hash=56b5b3488fd621585924006d7b5d573c`, {
        success: function (data, status, xhr) {
            for (let i = 0; i < data.data.results.length; i++) {
                $.ajax(`https://api.adviceslip.com/advice/${data.data.results[i].id % 200}`, {
                    success: function (adviceData, status, xhr) {
                        $.ajax(`https://www.themealdb.com/api/json/v1/1/random.php`, {
                            success: function (foodData, status, xhr) {
                                createSuperheroElement(data.data.results[i].thumbnail.path + '/portrait_fantastic.' + data.data.results[i].thumbnail.extension, data.data.results[i].name, JSON.parse(adviceData).slip.advice, foodData.meals[0].strMeal, data.data.results[i].urls[0].url);
                            },
                            error: function (jqXhr, textStatus, errorMessage) {
                                console.log('Nie udało się!')
                            }
                        });
                    },
                    error: function (jqXhr, textStatus, errorMessage) {
                        console.log('Nie udało się!')
                    }
                });
            }
        },
        error: function (jqXhr, textStatus, errorMessage) {
            console.log('Nie udało się!')
        }
    });
}

function loadSpecificSuperhero(inputValue) {
    $(".dataContainer").empty();

    $.ajax(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${inputValue}&ts=1&apikey=1c2ddf52fa1ba966fc7d0b3cdd6e241b&hash=56b5b3488fd621585924006d7b5d573c`, {
        success: function (data, status, xhr) {
            if (data.data.results.length > 0) {
                for (let i = 0; i < data.data.results.length; i++) {
                    $.ajax(`https://api.adviceslip.com/advice/${data.data.results[i].id % 200}`, {
                        success: function (adviceData, status, xhr) {
                            $.ajax(`https://www.themealdb.com/api/json/v1/1/random.php`, {
                                success: function (foodData, status, xhr) {

                                    createSuperheroElement(data.data.results[i].thumbnail.path + '/portrait_fantastic.' + data.data.results[i].thumbnail.extension, data.data.results[i].name, JSON.parse(adviceData).slip.advice, foodData.meals[0].strMeal, data.data.results[i].urls[0].url);
                                },
                                error: function (jqXhr, textStatus, errorMessage) {
                                    console.log('Nie udało się!')
                                }
                            });
                        },
                        error: function (jqXhr, textStatus, errorMessage) {
                            console.log('Nie udało się!')
                        }
                    });
                }
            } else {
                createSuperheroElement("https://cdn.dribbble.com/users/1554526/screenshots/3399669/media/51c98501bc68499ed0220e1ba286eeaf.png?compress=1&resize=400x300", "No Result", "No Result", "No Result", "No Result");
            }
        },
        error: function (jqXhr, textStatus, errorMessage) {
            console.log('Nie udało się!')
        }
    });
}

function createSuperheroElement(img, name, advice, dish, moreInfo) {
    const divSuperheroData = document.createElement('div');
    divSuperheroData.classList.add("superheroData");

    const divImageContainer = document.createElement('div');
    divImageContainer.classList.add("imageContainer");

    const divContentContainer = document.createElement('div');
    divContentContainer.classList.add("contentContainer");

    const imgSuperheroImage = document.createElement('img');
    imgSuperheroImage.classList.add("superheroImage");
    imgSuperheroImage.setAttribute('src', img);

    const h1SuperheroName = document.createElement('h1');
    h1SuperheroName.textContent = name;
    h1SuperheroName.classList.add("superheroName");


    const aFindMore = document.createElement('a');
    aFindMore.textContent += "Wanna know more? Find out!"
    aFindMore.classList.add("findMore");
    aFindMore.setAttribute('href', moreInfo);

    const pSuperheroFavouriteDish = document.createElement('p');
    const bSuperheroFavouriteDish = document.createElement('b');
    bSuperheroFavouriteDish.textContent = "My Favourite Dish: ";
    pSuperheroFavouriteDish.appendChild(bSuperheroFavouriteDish);
    pSuperheroFavouriteDish.textContent += dish;
    pSuperheroFavouriteDish.classList.add("superheroFavouriteDish");

    const pSuperheroLifeAdvice = document.createElement('p');
    const bSuperheroLifeAdvice = document.createElement('b');
    bSuperheroLifeAdvice.textContent = "My Advice: ";
    pSuperheroLifeAdvice.appendChild(bSuperheroLifeAdvice);
    pSuperheroLifeAdvice.textContent += advice;
    pSuperheroLifeAdvice.classList.add("superheroLifeAdvice");

    divContentContainer.appendChild(h1SuperheroName);
    divContentContainer.appendChild(pSuperheroLifeAdvice);
    divContentContainer.appendChild(pSuperheroFavouriteDish);
    divContentContainer.appendChild(aFindMore);
    divImageContainer.appendChild(imgSuperheroImage);
    divSuperheroData.appendChild(divImageContainer);
    divSuperheroData.appendChild(divContentContainer);
    divDataContainer.appendChild(divSuperheroData);
}

search.addEventListener('click', (event) => {
    if (input.value !== "") {
        loadSpecificSuperhero(input.value)
    } else {
        createSuperheroElement("https://cdn.dribbble.com/users/1554526/screenshots/3399669/media/51c98501bc68499ed0220e1ba286eeaf.png?compress=1&resize=400x300", "No Result", "No Result", "No Result", "No Result");
    }
})

clear.addEventListener('click', (event) => {
    loadSuperheros();
})

loadSuperheros();