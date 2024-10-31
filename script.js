const apiUrl = "http://localhost:5500/assets/data/test.json";

// link sliders
const windSlider = document.getElementById("wind-slider");
const humiditySlider = document.getElementById("humidity-slider");
const temperatureSlider = document.getElementById("temp-slider");

/**
 * 
 */
async function fetchData() {
    try {
        const response = await fetch(apiUrl);

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

    } catch(error) {
        console.error(error);
    }
}

// updates humidity value on slider
function updateHumidity(humidityValue) {
    humiditySlider.value = humidityValue;
}

// updates wind speed value on slider
function updateWindSpeed(windSpeedValue) {
    windSlider.value = windSpeedValue;
}

// updates temperature value on slider
function updateTemperature(temperatureValue) {
    temperatureSlider.value = temperatureValue;
}


// fetch data every half second
setInterval(fetchData, 500)