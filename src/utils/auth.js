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

// export function isAuthenticated() {
//   const token = getToken();
//   if (!token) {
//     return false;
//   }

//   try {
//     const decoded = jwtDecode(token);
//     const currentTime = Date.now() / 1000;
//     return decoded.exp > currentTime;
//   } catch (error) {
//     return false;
//   }
// }

export function hasPermission(requiredRole) {
  const token = getToken();
  if (!token) return false;
  console.log(token);
  try {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
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
    const userData = response.data.data;
    localStorage.setItem("user", JSON.stringify(userData.user));
    setToken(userData.token);
    return {
      token: userData.token,
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
      localStorage.removeItem("user");
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
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp <= currentTime) {
      console.log("Token has expired.");
      return false;
    }
  } catch (error) {
    console.error("Token decoding failed: ", error.message);
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
