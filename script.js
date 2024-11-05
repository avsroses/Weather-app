const apiUrl = "http://localhost:5500/assets/data/test.json";
/*
const apiUrl = "http://api.weatherstack.com/current?";
const urlParams = {
    query: "Norwich",
    access_key: "be9f1bc4d9baecdeeae0e1f5a74ff5ed",
};
*/

// link sliders and text
const windSlider = document.getElementById("wind-slider");
const windSpeed = document.getElementById("wind-speed");

const humiditySlider = document.getElementById("humidity-slider");
const humidityNum = document.getElementById("humidity");

const temperatureSlider = document.getElementById("temp-slider");
const temperatureNum = document.getElementById("temperature");

// animations
const leafAnimations = document.getElementsByClassName("leaf");

// filter
const humidityFilter = document.getElementById("humidity-filter");

const dayOrNight = document.getElementById("background");

/**
 * 
 */
async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        //const response = await fetch(apiUrl + new URLSearchParams(urlParams));

        // check response is ok
        if(!response.ok) {
            throw new Error("Response Status: ", response.status);
        }

        // obtain json
        const json = await response.json();
        console.log(json);

        // passes values into functions pulled from json
        updateHumidity(json.current.humidity);
        updateWindSpeed(json.current.wind_speed);
        updateTemperature(json.current.temperature);

        updateTimeOfDay(json.current.is_day);
        

    } catch(error) {
        console.error(error);
    }
}

// updates humidity value on slider
function updateHumidity(humidityValue) {
    humiditySlider.value = humidityValue;
    humidityNum.innerHTML = humidityValue + "%"
    // changes filter opacity to match humidity value
    humidityFilter.style.opacity = humidityValue * 0.5 / 100;
}

// updates wind speed value on slider
function updateWindSpeed(windSpeedValue) {
    windSlider.value = windSpeedValue;
    windSpeed.innerHTML = windSpeedValue + " m/s";

    // calculates duration based on speed
    const newDuration = (32 - Number(windSpeedValue)) * 11 / 32 + 1;

    for(const leaf of leafAnimations) {
        leaf.style.animationDuration = newDuration + "s";
    }
}

// updates temperature value on slider
function updateTemperature(temperatureValue) {
    temperatureSlider.value = temperatureValue;
    temperatureNum.innerHTML = temperatureValue + "ºC";
}

function updateTimeOfDay(dayTime) {
    if(dayTime === "no"){
        dayOrNight.style.backgroundColor = "black";
        dayOrNight.style.color = "white";
    } 
}

// fetch data every half second
setInterval(fetchData, 500)
//fetchData()