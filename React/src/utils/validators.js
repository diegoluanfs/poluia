/**
 * Valida os dados do formulário de cadastro.
 * @param {Object} userData Dados do usuário.
 * @returns {Object} Resultado da validação.
 */
export const validateSignUpForm = (userData) => {
    const errors = {};
    if (!userData.email) errors.email = "E-mail é obrigatório.";
    if (!userData.name) errors.name = "Nome é obrigatório.";
    if (!userData.password || userData.password.length < 6)
      errors.password = "A senha deve ter pelo menos 6 caracteres.";
    if (!userData.cnpj) errors.cnpj = "CNPJ é obrigatório.";
    return errors;
  };
  