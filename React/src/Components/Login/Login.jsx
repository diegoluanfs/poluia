import { FaUser, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Hook para redirecionamento
import Swal from 'sweetalert2'; // Importa o SweetAlert2
import { query, where, collection, getDocs } from 'firebase/firestore';
import { db } from './../../../firebase/firebaseConfig'; // Importa o Firestore
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Inicializa o hook para redirecionamento

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Consulta no Firestore para verificar o usuário
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', username));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Caso o e-mail não seja encontrado
        Swal.fire({
          title: 'Erro',
          text: 'Usuário ou senha inválidos',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
        return;
      }

      // Verifica a senha do usuário
      const userDoc = querySnapshot.docs[0].data();
      if (userDoc.password === password) {
        // Caso o e-mail e a senha estejam corretos
        Swal.fire({
          title: 'Sucesso',
          text: 'Usuário correto',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
      } else {
        // Caso a senha esteja incorreta
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
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate('/forgotpassword'); // Redireciona para a página de recuperação de senha
              }}
            >
              Esqueci minha senha?
            </a>
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
