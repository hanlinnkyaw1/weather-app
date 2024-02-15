const weatherForm = document.getElementById("btn");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card")
const apiKey = "aeaef3d07fe93b6ef133f700fd622df1";
const defaultName = "Yangon"

weather(defaultName)

async function weather(city) {
    const weatherData = await getWeather(city);
    displayinfo(weatherData);
}

weatherForm.addEventListener("click", async () => {
    const city = cityInput.value;
    if (city) {
       try {
         weather(city);
         cityInput.value = '';

       } catch (error) {
        displayError(error)
       } 
    }
    else{
        displayError("Please enter a city")
    }
})

async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const respone = await fetch(apiUrl);

    if (!respone.ok) {
        throw new Error("could not fetch data")
    }

    return await respone.json();
};

function displayinfo(data) {
    console.log(data)
    const {main : {temp, humidity},
            weather :[{description, id}]} = data;

    const cityDisplay = document.querySelector(".cityDisplay");
    const tempDisplay = document.querySelector(".tempDisplay");
    const humidityDisplay = document.querySelector(".humidity");
    const desDisplay = document.querySelector(".desDisplay");
    const weatherEmoji = document.querySelector(".weatherEmoji")


    cityDisplay.textContent = data.name;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity ${humidity}%`;
    desDisplay.textContent = description;
    weatherEmoji.textContent = displayEmoji(id)
    
};

function displayEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈";
        case (weatherId >= 300 && weatherId < 400):
             return "☁";    
        case (weatherId >= 500 && weatherId < 600):
             return "🌧";
        case (weatherId >= 600 && weatherId < 700):
              return "❄"; 
        case (weatherId >= 700 && weatherId < 800):
              return "🌫";
        case (weatherId == 800):
              return "🌞";  
        case (weatherId >= 801 && weatherId < 810):
             return "☁";                        
        default:
            return '❓';
    }
    
}

function displayError(error) {

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = error;
    errorDisplay.classList.add("errorDisplay")
    card.appendChild(errorDisplay)
};
