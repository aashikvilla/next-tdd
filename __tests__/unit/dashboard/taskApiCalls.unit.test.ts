import { mockTask } from "@/__tests__/__fixtures__/tasks";
import { ApiRouteConstants } from "@/app/apiService/ApiRouteConstants";
import ApiService from "@/app/apiService/ApiService";
import { getAllTasks, saveTask } from "@/app/dashboard/taskApiCalls";

jest.mock("../../../app/apiService/ApiService", () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
}));

describe("getAllTasks", () => {

  beforeEach(() => {
    jest.clearAllMocks();    
  });

  it("should call the ApiService.get with correct parameters", async () => { 
    await getAllTasks();
    expect(ApiService.get).toHaveBeenCalledWith(ApiRouteConstants.Tasks.GetAll);   
  });

  it('should call ApiService.put when task id is not empty', async () => {
    const mockTaskData=mockTask;
    await saveTask(mockTaskData);
    expect(ApiService.put).toHaveBeenCalledWith(ApiRouteConstants.Tasks.UpdateTask, mockTaskData);
    
  });
  it('should call ApiService.post when task id is empty', async () => {
    const mockTaskData=mockTask;
   
    mockTaskData.id = '';
    await saveTask(mockTaskData);
    expect(ApiService.post).toHaveBeenCalledWith(ApiRouteConstants.Tasks.AddTask, mockTaskData);
   
  });


});

