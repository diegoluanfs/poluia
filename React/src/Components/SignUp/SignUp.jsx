import { FaUser, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom'; // Importar o Link

import './SignUp.css';
import './../../App.css';

const SignUp = () => {
    const [corporateEmail, setCorporateEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyNiche, setCompanyNiche] = useState('');
    const [cnpj, setCNPJ] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        alert(
            'Enviando os dados: ' +
                corporateEmail +
                ' - ' +
                companyName +
                ' - ' +
                companyNiche +
                ' - ' +
                password +
                ' - ' +
                cnpj
        );
    };

    return (
        <div className="signup-container">
            <div className="Logo" />
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h1>Cadastro</h1>
                    <div className="input-field">
                        <input
                            type="email"
                            placeholder="E-mail corporativo"
                            onChange={(e) => setCorporateEmail(e.target.value)}
                        />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-field">
                        <input
                            type="text"
                            placeholder="Nome da empresa"
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-field">
                        <input
                            type="text"
                            placeholder="Ramo da empresa"
                            onChange={(e) => setCompanyNiche(e.target.value)}
                        />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-field">
                        <input
                            type="text"
                            placeholder="CNPJ"
                            onChange={(e) => setCNPJ(e.target.value)}
                        />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-field">
                        <input
                            type="password"
                            placeholder="Senha"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FaLock className="icon" />
                    </div>

                    <button>Cadastrar-se</button>
                    <div className="signup-link">
                        <p>
                            Já tem uma conta?
                            <Link to="/login"> Entre</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
