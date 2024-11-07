// const apiUrl = "http://localhost:5500/assets/data/test.json";

const apiUrl = "http://api.weatherstack.com/current?";
const urlParams = {
    query: "Norwich",
    access_key: "be9f1bc4d9baecdeeae0e1f5a74ff5ed",
};


// link sliders and text
const windSlider = document.getElementById("wind-slider");
const windSpeed = document.getElementById("wind-speed");

const humiditySlider = document.getElementById("humidity-slider");
const humidityNum = document.getElementById("humidity");

const temperatureSlider = document.getElementById("temp-slider");
const temperatureNum = document.getElementById("temperature");

const uvSlider = document.getElementById("uv-slider");
const uvIndex = document.getElementById("uv-index");

// animations
const leafAnimations = document.getElementsByClassName("leaf");
const cloudAnimation = document.getElementsByClassName("cloud");

// filters
const humidityFilter = document.getElementById("humidity-filter");

const dayOrNight = document.getElementById("background");

// link wind direction displays
const windDirection = document.getElementById("wind-direct-value");
const windDegree = document.getElementById("wind-arrow");

/**
 * 
 */
async function fetchData() {
    try {
        // const response = await fetch(apiUrl);
        const response = await fetch(apiUrl + new URLSearchParams(urlParams));

        // check response is ok
        if (!response.ok) {
            throw new Error("Response Status: ", response.status);
        }

        // obtain json
        const json = await response.json();
        console.log(json);

        // passes values into functions pulled from json
        updateHumidity(json.current.humidity);
        updateWindSpeed(json.current.wind_speed);
        updateTemperature(json.current.temperature);
        updateUVIndex(json.current.uv_index);

        updateTimeOfDay(json.current.is_day);

        updateCloudCoverage(json.current.cloudcover);

        updateWindDirection(json.current.wind_dir);
        updateWindDegree(json.current.wind_degree)

    } catch (error) {
        console.error(error);
    }
}

// updates humidity value on slider
async function updateHumidity(humidityValue) {
    humiditySlider.value = humidityValue;
    humidityNum.innerHTML = humidityValue + "%"
    // changes filter opacity to match humidity value
    humidityFilter.style.opacity = humidityValue * 0.5 / 100;
}

// updates wind speed value on slider
async function updateWindSpeed(windSpeedValue) {
    windSlider.value = windSpeedValue;
    windSpeed.innerHTML = windSpeedValue + "km/h";

    // calculates duration based on speed
    let newDuration = ((408 - Number(windSpeedValue)) * 11) / 408 + 1;

    for (const leaf of leafAnimations) {
        leaf.style.animationDuration = newDuration + "s";
    }

    for (const cloud of cloudAnimation) {
        cloud.style.animationDuration = newDuration + "s";
    }
}

// updates temperature value on slider
async function updateTemperature(temperatureValue) {
    temperatureSlider.value = temperatureValue;
    temperatureNum.innerHTML = temperatureValue + "ºC";
}

// updates uv index value on slider
async function updateUVIndex(uvIndexValue) {
    uvSlider.value = uvIndexValue;
    uvIndex.innerHTML = uvIndexValue;
}

// updates backgorund and font to white/ black based on if its day
async function updateTimeOfDay(dayTime) {
    if (dayTime === "no") {
        dayOrNight.style.backgroundColor = "black";
        dayOrNight.style.color = "white";
    }
}

// Changes opacity of cloud image based on cloud coverage
async function updateCloudCoverage(cloudCover) {
    if (cloudCover === 0) {
        for (const cloud of cloudAnimation) {
            cloud.style.opacity = 0;
        }
    }
    if (cloudCover <= 5) {
        for (const cloud of cloudAnimation) {
            cloud.style.opacity = 0.5;
        }
    }
}

async function updateWindDirection(windDirectionValue) {
    // Changes text to display direction of wind
    windDirection.innerHTML = windDirectionValue;
}

async function updateWindDegree(windDegreeValue) {
    // Changes rotation of arrow
    windDegree.style.rotate = windDegreeValue + "deg";
    // Changes text below to also include degree value
    windDirection.innerHTML = windDirection.innerHTML + " " + windDegreeValue + "°";
}

// fetch data every half second
// setInterval(fetchData, 500)
fetchData()