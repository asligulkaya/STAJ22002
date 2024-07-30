import axios from "axios";
import { jwtDecode } from "jwt-decode";

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

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
}

export function hasPermission(requiredRole) {
  const token = getToken();
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.role === requiredRole;
  } catch (error) {
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

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/login";
      } else if (error.response.status === 403) {
        window.location.href = "/not-authorized";
      }
    }
    return Promise.reject(error);
  }
);
