import { useState } from "react"
import assets from "../assets/assets.js"

const Weather = () => {
  const [city, setCity] = useState("")
  const [weatherData, setWeatherData] = useState(null)

  const weatherIcons = {
    Clear: assets.clear,
    Clouds: assets.cloud,
    Rain: assets.rain,
    Drizzle: assets.drizzle,
    Snow: assets.snow,
    Mist: assets.mist,
  }

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
      const response = await fetch(url)
      const data = await response.json()

      const isNight = data.dt < data.sys.sunrise || data.dt > data.sys.sunset

      const weatherBg = {
        Clear:   { bg: isNight ? "bg-indigo-950" : "bg-blue-400",  text: "text-white" },
        Clouds:  { bg: isNight ? "bg-gray-800"   : "bg-gray-400",  text: "text-white" },
        Rain:    { bg: isNight ? "bg-gray-900"   : "bg-gray-600",  text: "text-white" },
        Drizzle: { bg: isNight ? "bg-gray-900"   : "bg-gray-500",  text: "text-white" },
        Snow:    { bg: isNight ? "bg-indigo-900" : "bg-blue-200",  text: isNight ? "text-white" : "text-gray-800" },
        Mist:    { bg: isNight ? "bg-gray-800"   : "bg-gray-300",  text: isNight ? "text-white" : "text-gray-800" },
      }

      setWeatherData({
        temp: Math.floor(data.main.temp),
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        city: data.name,
        condition: data.weather[0].main,
        icon: isNight && data.weather[0].main === "Clear" ? assets.moon : weatherIcons[data.weather[0].main] || assets.clear,
        bg: weatherBg[data.weather[0].main]?.bg || "bg-purple-500",
        text: weatherBg[data.weather[0].main]?.text || "text-white"
      })

      setCity("")
    } catch (error) {
      console.error("something went wrong", error)
    }
  }

  return (
    <div className={`${weatherData?.bg || "bg-purple-500"} flex items-center justify-center min-h-screen transition-colors duration-700 text-white`}>
      <div className="w-full md:w-9/12 p-5 md:p-10">

        {/* search bar */}
        <div className="flex items-center justify-center w-full text-black">
          <input
            className="border-none rounded-3xl p-2 outline-none px-5 w-full max-w-xs md:max-w-none md:w-auto"
            type="text"
            placeholder="Locations..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <div
            className="bg-white h-10 w-10 min-w-10 border-none rounded-3xl flex items-center justify-center ml-2 cursor-pointer"
            onClick={() => search(city)}
          >
            <img src={assets.search} alt="search"/>
          </div>
        </div>

        {/* weather display */}
        <div className="flex flex-col md:flex-row items-center justify-center mt-10">
          <img
            className="w-64 h-64 md:w-96 md:h-96"
            src={weatherData?.icon || assets.clear}
            alt="weather"
          />

          <div className="flex flex-col items-center justify-center w-full md:w-1/2 mt-4 md:mt-0">
            <h1 className={`text-7xl md:text-9xl font-medium `}>
              {weatherData?.temp || "29"}°
            </h1>
            <p className={`text-xl mt-2 `}>
              {weatherData?.condition || "Clear"}
            </p>
            <div className={`flex items-center gap-2 mt-2 `}>
              <img src={assets.location} alt="location"/>
              <p className="text-xl">{weatherData?.city || "Mumbai"}</p>
            </div>

            {/* humidity and wind */}
            <div className="flex items-center justify-center w-full mt-6 gap-6">
              <div className="flex gap-3">
                <img src={assets.humidity} alt="humidity"/>
                <div>
                  <p className={`text-sm md:text-base `}>
                    {weatherData?.humidity || "68"}%
                  </p>
                  <p className={`text-sm md:text-base `}>
                    Humidity
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <img src={assets.wind} alt="wind"/>
                <div>
                  <p className={`text-sm md:text-base`}>
                    {weatherData?.windSpeed || "10"} km/h
                  </p>
                  <p className={`text-sm md:text-base `}>
                    Wind Speed
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

          <footer className="text-center mt-20">
           <p><span style={{fontFamily: "Zeyada, cursive"}} className="text-3xl" >Vaanilai</span> by Zaf ❤️</p>
          </footer>
  
      </div>
    </div>
  )

}

export default Weather