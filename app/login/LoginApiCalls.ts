import { ApiRouteConstants } from "../apiService/ApiRouteConstants";
import ApiService from "../apiService/ApiService";
import { LoginData } from "./page";

export const validateLogin = async (data:LoginData) => {
  return ApiService.post(ApiRouteConstants.Auth.Login, data);
};