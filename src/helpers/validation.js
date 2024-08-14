export function isNotEmpty(value) {
  return value !== undefined && value.trim() !== "";
}

export function validateForm(data, requiredFields) {
  const errors = {};
  requiredFields.forEach((field) => {
    if (!isNotEmpty(data[field])) {
      errors[field] = "This field is required";
    }
  });
  return errors;
}

export function validateLogin(credentials) {
  let errors = {};
  if (!isNotEmpty(credentials.username)) {
    errors.username = "Username is required.";
  }
  if (!isNotEmpty(credentials.password)) {
    errors.password = "Password is required.";
  }
  return errors;
}
