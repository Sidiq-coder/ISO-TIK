/**
 * Validate username
 */
export const validateUsername = (username) => {
  if (!username) {
    return "Username wajib diisi";
  }
  if (username.length < 3) {
    return "Username minimal 3 karakter";
  }
  return "";
};

/**
 * Validate password
 */
export const validatePassword = (password) => {
  if (!password) {
    return "Password wajib diisi";
  }
  if (password.length < 6) {
    return "Password minimal 6 karakter";
  }
  return "";
};

/**
 * Validate login form
 */
export const validateLoginForm = (username, password) => {
  const errors = {};
  
  const usernameError = validateUsername(username);
  if (usernameError) errors.username = usernameError;
  
  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;
  
  return errors;
};
