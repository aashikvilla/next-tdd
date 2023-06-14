import { ApiRouteConstants } from "../ApiService/ApiRouteConstants";
import ApiService from "../ApiService/ApiService";
import { LoginData } from "./page";

export const validateLogin = async (data:LoginData) => {
  return ApiService.post(ApiRouteConstants.Auth.Login, data);
};