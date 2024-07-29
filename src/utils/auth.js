import axios from "axios";

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function removeToken() {
  localStorage.removeItem("token");
}

export function isAuthenticated() {
  const token = getToken();
  if (!token) {
    return false;
  }
}

export async function login(credentials) {
  try {
    const response = await axios.post(
      "http://localhost:5165/api/user/login",
      credentials
    );
    // console.log(response.data)
    setToken(response.data.data.token);
    return {
      token: response.data.data.token,
    };
  } catch (error) {
    throw new Error(
      "Login failed: " + (error.response?.data?.message || error.message)
    );
  }
}

export function logout() {
  removeToken();
}
