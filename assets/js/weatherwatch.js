var searchButton = document.getElementById("search-button");
var cityNameSearch = document.getElementById("search-input");
var cityNameToday = document.getElementById("city-today");
var currentDate =document.getElementById("date");
var uvIndex = document.getElementById("uv-index");
var todaysWeather = document.querySelector("todays-weather");
var searchHistory = document.getElementById("search-history");
var list = JSON.parse(localStorage.getItem("searchHistoryList")) || [];


// Page starts by loading Salt Lake City Current Conditions
function pageLoadWeather(){
    var saltLakeUrl = "https://api.openweathermap.org/data/2.5/weather?q=Salt Lake&appid=6f71826bd75816cd22846a8ccb598cda&units=imperial";

    fetch(saltLakeUrl).then(function(response){
        response.json().then(function(data){
            //uv index
            UvIndex(data.coord.lat, data.coord.lon);

              // Update Dom with object values
            cityNameToday.textContent = "Salt Lake City";
            currentDate.textContent =  moment().format("dddd, Do MMMM");
            cityNameSearch.value = "";

            $('#future-forecast').empty();
            $("#icon").attr("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png");
            $("#temperature").text(data.main.temp +"°");
            $("#wind").text(data.wind.speed);
            $("#humidity").text(data.main.humidity);
        });
    });
};

pageLoadWeather();


//calls function that searches user input and saves to local storage
function submitNameSearch(event){

    var cityName = cityNameSearch.value.trim();

    if (cityName){
        searchWeather(cityName);
        cityNameToday.textContent = cityName;
        currentDate.textContent =  moment().format("dddd, Do MMMM");
        cityNameSearch.value = "";
    }else{
        alert("Please enter a valid city name");
    }

    //set search history inside of an array in Local Storage
        
        list.push(cityName);
        localStorage.setItem('searchHistoryList', JSON.stringify(list));
        console.log(list);

}

//event listener for button click when city is submitted through input element
searchButton.addEventListener("click", function(){   
    submitNameSearch();
});

//api to query based on search input
function searchWeather(city){
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=6f71826bd75816cd22846a8ccb598cda&units=imperial";

    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            //uv index
            UvIndex(data.coord.lat, data.coord.lon);
            // getForecast(city);
            console.log(data, city);
            $("#icon").attr("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png");
            $("#temperature").text(data.main.temp +"°");
            $("#wind").text(data.wind.speed);
            $("#humidity").text(data.main.humidity);
        });
    });
};

//api to find UV index and assign color
function UvIndex(latitude, longitude){
    var apiUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=6d97afac271bf76bda029031ba851c8a";

    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            console.log(data.value);
            uvIndex.textContent = data.value;

            if (uvIndex.textContent < 3){
                uvIndex.setAttribute("src", "./assets/images/white-01.png");
            } else if(uvIndex.textContent < 6){
                uvIndex.setAttribute("src", "./assets/images/white-02.png");
            } else if(uvIndex.textContent < 8){
                uvIndex.setAttribute("src", "./assets/images/white-03.png");
            } else if(uvIndex.textContent < 11){
                uvIndex.setAttribute("src", "./assets/images/white-04.png");
            }else{
                uvIndex.setAttribute("src", "./assets/images/white-05.png");
            }
        });
    });
}

    

