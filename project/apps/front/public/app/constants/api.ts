const API_URL = import.meta.env.VITE_API_URL;

export const ApiRoute = {
  BASE_URL: API_URL,
  LOGIN: `${API_URL}/users/login`,
  LOGOUT: `${API_URL}/users/logout`,
  REGISTER: `${API_URL}/users/register`,
  REFRESH_TOKEN: `${API_URL}/users/refresh-token`,
};
