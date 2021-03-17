import './App.css';
import 'antd/dist/antd.css';
import { Input, Space } from 'antd';
import axios from 'axios';
import { API_KEY } from './Api/APIs';
import Wheather from './components/Wheather';
import { useState } from 'react';

const { Search } = Input;


const App = () => {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [forecast, setForecast] = useState(null);

  const onSearch = (cityName) => {
      getWheatherData(cityName);
      setCity(cityName)
   };

  const getWheatherData = async (cityName) => {
    const apiLocationKey = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${cityName}`)
      .then((response) =>  response.data[0].Key)
      .catch(error => {
        console.log(error)
      })

      const conditionsRes = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${apiLocationKey}?apikey=${API_KEY}`)
        .then(res => {
          const data = res.data[0].Temperature.Metric.Value;
          setTemperature(data)
        })
        .catch(err => {
          console.log(err);
        })

        const forecastRes = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${apiLocationKey}?apikey=${API_KEY}`)
          .then(res => {
            const data = res.data.DailyForecasts;
            setForecast(data);
          })
          .catch(err => {
            console.log(err);
          })

  }



  return (
    <div className="App">
      <h1>Wheather Application</h1>
      <Space direction="vertical">
        <label htmlFor="city">City you are looking for</label>
        <Search placeholder="Search for a city" id="city" onSearch={onSearch} style={{ width: 200 }} />
      </Space>
      <Wheather city={city} temperature={temperature} forecast={forecast} />
    </div>
  );
}

export default App;
