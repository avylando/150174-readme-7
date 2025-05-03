const API_URL = import.meta.env.VITE_API_URL;

export const ApiRoute = {
  BASE_URL: API_URL,
  LOGIN: `/users/login`,
  LOGOUT: `/users/logout`,
  REGISTER: `/users/register`,
  REFRESH_TOKEN: `/users/refresh-token`,
};
