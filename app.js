const form = document.querySelector("#form");
const city = document.querySelector("#city");
const loading = document.querySelector("#loading");
const weather = document.querySelector("#weather");

loading.className = "loadingFalse";
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  loading.className = "";
  weather.innerHTML = "";

  try {
    loading.className = "loading";
    const res = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=1060427c9009496cbfb135846231910&q=${city.value}`
    );

    loading.className = "loadingFalse";

    const icon = res.data.current.condition.icon;
    const iconUrl = `https:${icon}`;
console.log(res.data);
    weather.innerHTML = `
            <div class="weatherBox">
            
            <h1 class="country">${res.data.location.country}</h1>
            <h1 class="city">${res.data.location.name}</h1>
            <h1 class="time">${res.data.location.localtime}</h1>
            <img src="${iconUrl}">
            <h1 class="tem">${res.data.current.temp_c}<sup>°c</sup></h1>
            
            <h1 class="humidity"><img src="hum.png">${res.data.current.humidity}<span>%</span></h1>
            <h1 class="wind"><img src="w.png">  ${res.data.current.wind_mph}<span>Km/h</span></h1>
         
          
            </div>`;
  } catch (error) {
    loading.className = "loadingFalse";
    weather.innerHTML = `<h1 class="error">No data found..!</h1>`;
  } finally {
    city.value = "";
  }
});