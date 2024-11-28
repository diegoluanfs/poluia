import { FaUser } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook para redirecionamento
import Swal from 'sweetalert2'; // Importa o SweetAlert2
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate(); // Inicializa o hook para redirecionamento

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Simulação de envio de e-mail
    Swal.fire({
      title: 'Sucesso!',
      text: 'E-mail de recuperação de senha enviado com sucesso!',
      icon: 'success',
      confirmButtonText: 'Ok',
    }).then(() => {
      // Redireciona para a página de login após confirmação
      navigate('/login');
    });
  };

  return (
    <div className="forgot-password-container">
      {/* Logo */}
      <div className="Logo" />

      {/* Formulário */}
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>Recuperar senha</h1>

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

          {/* Botão de Enviar */}
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
