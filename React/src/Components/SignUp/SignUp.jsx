import { useState } from "react";
import { Link } from "react-router-dom";
import { createUser } from "./../../../firebase/userService";
import { validateSignUpForm } from "./../../utils/validators";
import "./SignUp.css";
import "./../../App";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    niche: "",
    cnpj: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setSuccessMessage("");
    setErrorMessage("");

    // Validação dos dados
    const validationErrors = validateSignUpForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Cadastrar usuário
    const result = await createUser(formData);
    if (result.success) {
      setSuccessMessage("Usuário cadastrado com sucesso!");
      setFormData({ email: "", name: "", niche: "", cnpj: "", password: "" });
    } else {
      setErrorMessage("Erro ao cadastrar usuário: " + result.error);
    }
  };

  return (
    <div className="signup-container">
      <div className="Logo" />
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Cadastro</h1>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="input-field">
            <input
              type="email"
              name="email"
              placeholder="E-mail corporativo"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="input-field">
            <input
              type="text"
              name="name"
              placeholder="Nome da empresa"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="input-field">
            <input
              type="text"
              name="niche"
              placeholder="Ramo da empresa"
              value={formData.niche}
              onChange={handleChange}
            />
          </div>

          <div className="input-field">
            <input
              type="text"
              name="cnpj"
              placeholder="CNPJ"
              value={formData.cnpj}
              onChange={handleChange}
            />
            {errors.cnpj && <p className="error">{errors.cnpj}</p>}
          </div>

          <div className="input-field">
            <input
              type="password"
              name="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <button type="submit">Cadastrar-se</button>

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
