class ApiRoute {
  static FRONTEND_DOMAIN = window.location.origin;
  static API_DOMAIN = "http://localhost:8000"; // to be read from .env on PROD
  static BASE_PATH = "/api/v1";
  static BASE_URL = `${ApiRoute.API_DOMAIN}${ApiRoute.BASE_PATH}`;
  static PROFILE_PATH = `${ApiRoute.BASE_URL}/profiles`;
  static LOGIN_PATH = `${ApiRoute.BASE_URL}/login`;
  static AUTH_USER_PATH = `${ApiRoute.BASE_URL}/user`;
  static LOGOUT_PATH = `${ApiRoute.BASE_URL}/logout`;
  static REGISTER_PATH = `${ApiRoute.BASE_URL}/register`;
  static AVATAR_PATH = `${ApiRoute.BASE_URL}/avatar`;
  static TRANSACTION_PATH = `${ApiRoute.BASE_URL}/transactions`;
}

export default ApiRoute;
