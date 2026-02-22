import axios from "axios";

const TOKEN_KEY = "jwt";

const auth = {
  saveToken: (token) => {
    localStorage.setItem(TOKEN_KEY, token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },

  loadToken: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
    return token;
  },

  clearToken: () => {
    localStorage.removeItem(TOKEN_KEY);
    delete axios.defaults.headers.common["Authorization"];
  },
};

export default auth;
