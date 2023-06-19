
import { ApiRouteConstants } from "../apiService/ApiRouteConstants";
import ApiService from "../apiService/ApiService";

export const getAllTasks = async () => {
  return ApiService.get(ApiRouteConstants.Tasks.GetAll);
};