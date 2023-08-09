const apiKey = "bab3457f0c5798d3f2939b5bdd36df5b";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search_field input");
const searchButt = document.querySelector(".search_field button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherName = document.querySelector(".weather_name");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    let data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML =
      Math.round(data.wind.speed) + "km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
      weatherName.innerText = "Clouds";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
      weatherName.innerText = "Clear";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
      weatherName.innerText = "Rain";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
      weatherName.innerText = "Mist";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
      weatherName.innerText = "Drizzle";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}
searchButt.addEventListener("click", () => {
  checkWeather(searchBox.value);
  document.querySelector(".search_field input").value = "";
});
