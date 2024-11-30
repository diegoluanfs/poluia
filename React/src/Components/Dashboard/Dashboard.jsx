import PropTypes from 'prop-types'; // Importa o prop-types
import { FaUser } from 'react-icons/fa'; // Importa o ícone de usuário
import './Dashboard.css';

const Dashboard = ({ user }) => {
  return (
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
            <img
              src={user.photo}
              alt="Foto do usuário"
              className="dashboard-user-photo"
            />
          ) : (
            <div className="dashboard-user-icon">
              <FaUser />
            </div>
          )}
        </div>
      </header>
      <main className="dashboard-content">
        <h1>Bem-vindo(a), {user.name}!</h1>
        <p>Selecione uma das opções do menu acima para continuar.</p>
      </main>
    </div>
  );
};

// Define os tipos das propriedades esperadas
Dashboard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photo: PropTypes.string,
  }).isRequired,
};

export default Dashboard;
