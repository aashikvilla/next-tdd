
import { ApiRouteConstants } from "../apiService/ApiRouteConstants";
import ApiService from "../apiService/ApiService";
import { Task } from "./page";

export const getAllTasks = async () => {
  return ApiService.get(ApiRouteConstants.Tasks.GetAll);
};


export const saveTask = async (data:Task) => {
  if(data.id == ""){
    return ApiService.post(ApiRouteConstants.Tasks.AddTask, data);
  }
  return ApiService.put(ApiRouteConstants.Tasks.UpdateTask, data);
};
