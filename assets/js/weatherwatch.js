var searchButton = document.getElementById("search-button");
var cityNameSearch = document.getElementById("search-input");
var cityNameToday = document.getElementById("city-today");
var currentDate =document.getElementById("date");
var uvIndex = document.getElementById("uv-index");
var todaysWeather = document.querySelector("todays-weather");
var searchHistory = document.getElementById("search-history");
var list = [];


// Page starts by loading Salt Lake City Current Conditions
function pageLoadWeather(){
    var saltLakeUrl = "https://api.openweathermap.org/data/2.5/weather?q=Salt Lake&appid=6d97afac271bf76bda029031ba851c8a&units=imperial";

    fetch(saltLakeUrl).then(function(response){
        response.json().then(function(data){
            //uv index
            getUvIndex(data.coord.lat, data.coord.lon);

              // Update Dom with object values
            cityNameToday.textContent = "Salt Lake City";
            currentDate.textContent =  moment().format("dddd, Do MMMM");
            cityNameSearch.value = "";

            $('#future-forecast').empty();
            $("#icon").attr("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png");
            $("#temperature").text(data.main.temp +"°");
            $("#wind").text(data.wind.speed);
            $("#humidity").text(data.main.humidity);
        });
    });
};

pageLoadWeather();


//function to receive search value and push to other functions
function submitNameSearch(event){

    // $("#future-forecast").empty();
    var cityName = cityNameSearch.value.trim();

    if (cityName){
        searchWeather(cityName);
        cityNameToday.textContent = cityName;
        currentDate.textContent =  moment().format("dddd, Do MMMM");
        cityNameSearch.value = "";
    }else{
        alert("Please enter a valid city name");
    }

    //save searches to local storage
    
    // list.push(cityName);
    // localStorage.setItem("searchHistoryList", JSON.stringify(string));

};

//event listener for button click when city is submitted through input element
searchButton.addEventListener("click", function(){   
    //calls function that searches using input and saves to local storage
    submitNameSearch();
});

//api to query based on search input
function searchWeather(city){
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=6d97afac271bf76bda029031ba851c8a&units=imperial";

    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            //uv index
            // getUvIndex(data.coord.lat, data.coord.lon);
            // getForecast(city);
            console.log(data, city);
            $("#icon").attr("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png");
            $("#temperature").text(data.main.temp +"°");
            $("#wind").text(data.wind.speed);
            $("#humidity").text(data.main.humidity);
        });
    });
};

//api to find UV index and assign color
function getUvIndex(latitude, longitude){
    var apiUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=6d97afac271bf76bda029031ba851c8a";

    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            console.log(data.value);
            uvIndex.textContent = data.value;

            if (uvIndex.textContent < 3){
                uvIndex.setAttribute("src", "background-color:green;");
            } else if(uvIndex.textContent < 6){
                uvIndex.setAttribute("src", "background-color:yellow;");
            } else if(uvIndex.textContent < 8){
                uvIndex.setAttribute("src", "background-color:orange;");
            } else if(uvIndex.textContent < 11){
                uvIndex.setAttribute("src", "background-color:orange;");
            }else{
                uvIndex.setAttribute("src", "background-color:red;");
            }
        });
    });
}

    
//     var history = JSON.parse(localStorage.getItem("searchHistoryList"));

//     // clear the search input
//     searchHistory.innerHTML = "";
//     list.forEach(function(item){
//         // display search history below the search bar

//         var historyList = document.createElement("li");
//         // what does this item do?
//         historyList.textContent = item;
//         historyList.classList.add("flex-row", "justify-space-between", "align-center", "search-list");
//         searchHistory.appendChild(historyList);
//         historyList.addEventListener("click", function() {
//             historyNameSearch(item);
//         })
//         console.log("hello");

//     })


// }



// function historyNameSearch(searchCity){
//     searchWeather(searchCity);
//     cityNameToday.textContent = searchCity + moment().format("(MM/DD/YYYY)");
//     $("#future-forecast").empty();
// }


// //create event listener for click of <li> 
// //does the same thing as submitNameSearch, but takes search history name instead of input name
