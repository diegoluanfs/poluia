import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';

const App = () => {
    return (
        <Router>
          <div className="App">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<Login />} /> {/* Rota padrão */}
            </Routes>
          </div>
        </Router>
    );
};

export default App;