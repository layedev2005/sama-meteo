import React, { useState } from 'react';
import axios from 'axios';
import '../pages/weather.css'

function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = 'bf01e6140bb5413c8d545351e021004d'; 
  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
    //   const date = new Date(Date());

      setWeatherData(response.data);
    } catch (error) {
      setError('Ville non trouvée. Veuillez saisir une ville valide.');
    }

    setLoading(false);
  };

  return (
    <div className='container'>
      <h1>Sama Météo</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Entrez le nom de la ville"
          value={city}
          onChange={handleChange}
          className='search'
        />
        <button type="submit">Rechercher</button>
      </form>
      {loading && <p>Chargement...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h2>Météo pour {weatherData.name}, {weatherData.sys.country}</h2>
          {/* <p>Heure actuelle : {currentTime}</p> */}
          <p>Température : {weatherData.main.temp}°C</p>
          <p>Humidité : {weatherData.main.humidity}%</p>
          <p>Vitesse du vent : {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
