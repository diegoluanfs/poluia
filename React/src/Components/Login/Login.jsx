import {FaUser, FaLock} from 'react-icons/fa';

import {useState} from "react";

import "./Login.css";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        
        alert("Enviando os dados: " + username + " - " + password);
    }

    return (
        <div>
            <div className="Logo"/>
            
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="input-field">
                        <input 
                            type="email" 
                            placeholder="E-mail"
                            onChange={(e) => setUsername(e.target.value)}/>
                        <FaUser className="icon" />
                    </div>
                    <div className="input-field">
                        <input 
                            type="password" 
                            placeholder="Senha"
                            onChange={(e) => setPassword(e.target.value)}/>
                        <FaLock className="icon" />
                    </div>

                    <div className="recall-forget">
                        <label>
                            <input type="checkbox"/>
                            Lembre de mim
                        </label>
                        <a href="#">Esqueci minha senha?</a>
                    </div>

                    <button>Entrar</button>
                    <div className="signup-link">
                        <p>
                            Não tem uma conta? 
                            <a href="#"> Cadastre-se</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login