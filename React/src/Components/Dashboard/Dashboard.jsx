import PropTypes from 'prop-types';
import { FaUser } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const location = { lat: -23.5505, lon: -46.6333 };
  const [weatherData, setWeatherData] = useState(null);
  const [airPollutionData, setAirPollutionData] = useState(null);
  const [error, setError] = useState(null);
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const navigate = useNavigate();

  const API_KEY_WEATHER = '31af80f5ccdb39b6d8abe4456e79036f';

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  useEffect(() => {
    if (!hasFetchedData) {
      Promise.all([
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY_WEATHER}&units=metric&lang=pt_br`
        )
          .then((response) => response.json())
          .then((data) => setWeatherData(data))
          .catch(() => setError('Erro ao consultar a API de clima.')),

        fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY_WEATHER}`
        )
          .then((response) => response.json())
          .then((data) => setAirPollutionData(data))
          .catch(() => setError('Erro ao consultar a API de poluição do ar.')),
      ])
        .then(() => setHasFetchedData(true))
        .catch(() => setError('Erro ao realizar as consultas às APIs.'));
    }
  }, [location, hasFetchedData, API_KEY_WEATHER]);

  const today = new Date();
  const formattedDate = today.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return user ? (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="dashboard-logo">EcoSense</div>
        <nav className="dashboard-menu">
          <a href="/monitoramento">Monitoramento</a>
          <a href="/relatorios">Relatórios</a>
          <a href="/manual">Manual de boas práticas</a>
        </nav>
        <div className="dashboard-user">
          <span className="dashboard-user-name">{user.name}</span>
          {user.photo ? (
            <img src={user.photo} alt="Foto do usuário" className="dashboard-user-photo" />
          ) : (
            <div className="dashboard-user-icon">
              <FaUser />
            </div>
          )}
        </div>
      </header>

      <main className="dashboard-content">
        <section className="dashboard">
          <h1>Dados Climáticos - {weatherData?.name || 'Local'}</h1>
          <p>{formattedDate}</p>
          {weatherData && (
            <div>
              <p hidden>
                <strong>Temperatura Atual:</strong> {weatherData.main.temp}°C
              </p>
              <p hidden>
                <strong>Clima:</strong> {weatherData.weather[0].description}
              </p>
            </div>
          )}
          {error && <p className="error-message">{error}</p>}
        </section>
        <section className="dashboard">
          <h2>Poluentes Atmosféricos</h2>
          <div className="cards-container">
            {airPollutionData ? (
              Object.entries(airPollutionData.list[0].components).map(([key, value]) => (
                <div key={key} className="card">
                  <h3>{key.toUpperCase()}</h3>
                  <p>{value} µg/m³</p>
                </div>
              ))
            ) : (
              <p className="error-message">Carregando dados de poluição...</p>
            )}
          </div>
        </section>
      </main>
    </div>
  ) : null;
};

Dashboard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photo: PropTypes.string,
  }),
};

export default Dashboard;
