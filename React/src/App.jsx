import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import Dashboard from './Components/Dashboard/Dashboard'; // Importa o Dashboard
import { useState } from 'react';

const App = () => {
    const [user, setUser] = useState(null); // Estado para armazenar o usuário logado

    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Rotas públicas */}
                    <Route path="/login" element={<Login onLogin={setUser} />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/forgotpassword" element={<ForgotPassword />} />

                    {/* Rota privada: Dashboard */}
                    <Route
                        path="/dashboard"
                        element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
                    />

                    {/* Rota padrão */}
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
