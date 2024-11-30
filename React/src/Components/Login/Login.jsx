import PropTypes from 'prop-types'; // Importa o prop-types
import { FaUser, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { query, where, collection, getDocs } from 'firebase/firestore';
import { db } from './../../../firebase/firebaseConfig';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', username));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Swal.fire({
          title: 'Erro',
          text: 'Usuário ou senha inválidos',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
        return;
      }

      const userDoc = querySnapshot.docs[0].data();
      if (userDoc.password === password) {
        onLogin({ name: userDoc.name, email: userDoc.email, photo: userDoc.photo });
        Swal.fire({
          title: 'Sucesso',
          text: 'Usuário correto',
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then(() => {
          navigate('/dashboard');
        });
      } else {
        Swal.fire({
          title: 'Erro',
          text: 'Usuário ou senha inválidos',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    } catch (error) {
      console.error('Erro ao verificar o usuário:', error);
      Swal.fire({
        title: 'Erro',
        text: 'Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  return (
    <div className="login-container">
      <div className="Logo" />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-field">
            <input
              type="email"
              placeholder="E-mail"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>
          <div className="recall-forget">
            <label>
              <input type="checkbox" />
              Lembre de mim
            </label>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/forgotpassword'); }}>
              Esqueci minha senha?
            </a>
          </div>
          <button type="submit">Entrar</button>
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

// Define os tipos das propriedades esperadas
Login.propTypes = {
  onLogin: PropTypes.func.isRequired, // Declara que onLogin é obrigatório e deve ser uma função
};

export default Login;
