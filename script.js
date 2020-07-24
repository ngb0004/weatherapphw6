

$(document).ready(function() {
    

$("#searchBtn").on("click", function() {
    weatherFunction();
    
});
var history = JSON.parse(localStorage.getItem("history")) || [];
if (history.length > 1) {
    weatherFunction(history[history.length - 1]);
}
for (let i = 0; i< history.length - 1; i++) {
    createLine(history[i]);
}
function createLine(text) {
    var createLi = `<li class = "list-group-item">${history}</li>`
    document.getElementById("history").innerHTML = createLi;
}


function weatherFunction(){
    //5 day forcast call
    var city = $("#city").val();
    var queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=3909a314416c4758b3b4a78009796caf`;
$.ajax({
        type: "GET",
        url: queryURL
})    
.then(function(data1){
    console.log(data1);
    var lat = data1.city.coord.lat
    var lon = data1.city.coord.lon
    
    var queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=3909a314416c4758b3b4a78009796caf`;
    console.log(queryURL);
    $.ajax({
        type: "GET",
        url: queryURL
    })
    .then(function (data) {
        if (history.indexOf(city) === -1) {
            history.push(city);
            localStorage.setItem("history", JSON.stringify(history));
        }

        //json parse the get
        //stringify the set
        console.log(data);
        var city = data1.city.name;
        console.log(city);
        var date = moment.unix(data.current.dt).format("MM/DD/YY");
        console.log(date);
        var temp = Math.floor((data.current.temp - 273.15)*9/5 + 32);
        console.log(temp);
        var humidity = data.current.humidity;
        console.log(humidity);
        var windSpeed = data.current.wind_speed;
        console.log(windSpeed);
        var uv = data.current.uvi;

        createDiv = `<h2>${city} (${date})</h2>
        <p>Temperature: ${temp}</p>
        <p>Humidity: ${humidity}</p>
        <p>Wind Speed: ${windSpeed}</p>
        <p>UV Index: ${uv}</p>
        `;
        console.log(createDiv);
        document.getElementById("currentCity").innerHTML = createDiv;
        
        
        document.getElementById("cards").innerHTML = "";
        for (var i=1; i < data.daily.length-2; i++) {
            var date = moment.unix(data.daily[i].dt).format("MM/DD/YY");
            var temp = Math.floor((data.daily[i].temp.day - 273.15)*9/5 + 32);
            var humidity = data.daily[i].humidity;
            var windSpeed = data.daily[i].wind_speed;
            var img = data.daily[i].weather[0].icon; 


            card = `<div class ="col-md-2 mt-3">
            <div class ="card bg-primary text-white">
            <div class ="card-body p-2">
            <h3>${date}</h3>
            <img src="http://openweathermap.org/img/wn/${img}@2x.png">
            <p>Temperature: ${temp}</p>
            <p>Humidity: ${humidity}</p>
            <p>Wind Speed: ${windSpeed}</p>
            </div>
            </div>
            </div>`
            console.log(card);
            //<img src ="${img}"></img>
            document.getElementById("cards").innerHTML += card;
        }
    })   
})
}
})
