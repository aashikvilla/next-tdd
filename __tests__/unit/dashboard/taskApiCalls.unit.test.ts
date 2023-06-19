import { ApiRouteConstants } from "@/app/apiService/ApiRouteConstants";
import ApiService from "@/app/apiService/ApiService";
import { getAllTasks } from "@/app/dashboard/taskApiCalls";

jest.mock("../../../app/apiService/ApiService", () => ({
  get: jest.fn(),
}));

describe("getAllTasks", () => {
  it("should call the ApiService.get with correct parameters", async () => { 
    await getAllTasks();
    expect(ApiService.get).toHaveBeenCalledWith(ApiRouteConstants.Tasks.GetAll);   
  });
});
