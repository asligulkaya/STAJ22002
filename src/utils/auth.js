import axios from "axios";
import { jwtDecode } from "jwt-decode";

axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function removeToken() {
  localStorage.removeItem("token");
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
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
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

export async function logout() {
  try {
    const token = getToken();

    const response = await axios.post(
      "http://localhost:5165/api/user/logout",
      {},
      {
        headers: {
          token,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      removeToken();
      console.log("Logout successful");
      window.location.href = "/login";
    }
  } catch (error) {
    console.error(
      "Logout failed: ",
      error.response?.data?.message || error.message
    );
  }
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

export async function checkLoginStatus() {
  const token = getToken();
  if (!token) {
    console.log("No token found.");
    return false;
  }

  try {
    const response = await axios.post(
      "http://localhost:5165/api/user/check-login",
      {},
      {
        headers: {
          token,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Response status:", response.status);
    return response.status === 200;
  } catch (error) {
    console.error(
      "Check login status failed: ",
      error.response?.data?.message || error.message
    );
    return false;
  }
}
