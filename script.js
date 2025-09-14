let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");
let getWeather = () => {
  let cityValue = cityRef.value;
  if (cityValue.length == 0) {
    result.innerHTML = `<h3>Enter a City Name</h3>`;
  } else {
    localStorage.setItem("lastSearchedValue", cityValue);
    cityRef.value = "";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        console.log(data.weather[0]);
        console.log(data.weather[0].main);
        console.log(data.name);
        console.log(data.coord);
        result.innerHTML = `<h2>${data.name}</h2>
        <div class="weather">${data.weather[0].main}</div>
        <div class="weather-details">${data.weather[0].description}</div>
        <div class="img"><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png"></div>
        <h1>${data.main.temp}&#176;</h1><div class="temp-container"><div><h4 class="title">Min</h4><h4 class="temp">${data.main.temp_min}</h4></div><div><h4 class="title">Max</h4><h4 class="temp">${data.main.temp_max}</h4></div></div>
        `;
      })
      .catch(() => {
        result.innerHTML = `<h3 class="error-msg">City Name Not Found</h3>`;
      });
  }
};

let lastSearched = () => {
  let lastSearchedValue = localStorage.getItem("lastSearchedValue");
  if (lastSearchedValue) {
    cityRef.value = lastSearchedValue;
    getWeather();
  }
};
searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", lastSearched);
