let input = document.querySelector("input")
let btn=document.querySelector('button')
let list = document.querySelector('.list')
let apiK = '9f6290d6cda9a36a63755fadee71f83d'
let city="bhopal"

btn.addEventListener("click", () => {
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiK}`)
        .then((info) => {
        return info.json()
        }).then((val) =>{
        console.log(val.main.temp)
        show(val)
    })
})
function show(val) {
    let tempCelsius = (val.main.temp - 273.15).toFixed(1)
    let feelsLike = (val.main.feels_like - 273.15).toFixed(1)
    let humidity = val.main.humidity
    let windSpeed = val.wind.speed
    let description = val.weather[0].description
    let cityName = val.name
    let country = val.sys.country
    let icon = val.weather[0].icon

    list.innerHTML = `
        <div class="weather-card">
            <h2>${cityName}, ${country}</h2>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" />
            <h1>${tempCelsius}°C</h1>
            <p class="description">${description}</p>
            <div class="details">
                <div>🌡️ Feels like: ${feelsLike}°C</div>
                <div>💧 Humidity: ${humidity}%</div>
                <div>🌬️ Wind: ${windSpeed} m/s</div>
            </div>
        </div>
    `
}