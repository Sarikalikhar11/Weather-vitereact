import { useState, useEffect } from 'react';
import './App.css';
import Highlights from './components/Highlights';
import Temperature from './components/Temperature';

function App() {
  const [city, setCity] = useState('Mumbai');
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const apiURL = `https://api.weatherapi.com/v1/current.json?key=71c063fff0334a46bf263647241103&q=${city}&aqi=no`;

    fetch(apiURL)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Could not get data');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [city]);

  return (
    <>
      <div className="bg-[#1F213A] w-screen h-screen flex flex-col md:flex-row justify-center aligns-top m-3">
        <div className="mt-40 w-1/5 h-1/3 flex-wrap">
          {weatherData && (
            <Temperature
              setCity={setCity}
              stats={{
                temp: weatherData.current.temp_c,
                condition: weatherData.current.condition.text,
                isDay: weatherData.current.is_day,
                location: weatherData.location.name,
                time: weatherData.location.localtime,
              }}
            />
          )}
        </div>
        <div className="mt-40 w-1/3 h-1/3 p-10 grid grid-cols-2 gap-6 flex-wrap">
          <h2 className="text-slate-200 text-2xl col-span-2">
            Today's Highlights
          </h2>
          {weatherData && (
            <>
              <Highlights
                stats={{
                  title: 'Wind Status',
                  value: weatherData.current.wind_mph,
                  unit: 'mph',
                  direction: weatherData.current.wind_dir,
                }}
              />
              <Highlights
                stats={{
                  title: 'Humidity',
                  value: weatherData.current.humidity,
                  unit: '%',
                }}
              />
              <Highlights
                stats={{
                  title: 'Visibility',
                  value: weatherData.current.vis_miles,
                  unit: 'miles',
                }}
              />
              <Highlights
                stats={{
                  title: 'Air Pressure',
                  value: weatherData.current.pressure_mb,
                  unit: 'mb',
                }}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
