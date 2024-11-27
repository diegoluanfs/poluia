import { FaUser, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom'; // Importar o Link
import './Login.css';
import './../../App.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Enviando os dados: ${username} - ${password}`);
  };

  return (
    <div className="login-container">
      {/* Logo */}
      <div className="Logo" />

      {/* Formulário */}
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>

          {/* Campo de E-mail */}
          <div className="input-field">
            <input
              type="email"
              placeholder="E-mail"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FaUser className="icon" />
          </div>

          {/* Campo de Senha */}
          <div className="input-field">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>

          {/* Lembre de mim e Esqueci minha senha */}
          <div className="recall-forget">
            <label>
              <input type="checkbox" />
              Lembre de mim
            </label>
            <a href="#">Esqueci minha senha?</a>
          </div>

          {/* Botão de Login */}
          <button type="submit">Entrar</button>

          {/* Link para Cadastro */}
          <div className="signup-link">
            <p>
              Não tem uma conta?
              <Link to="/signup"> Cadastre-se</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
