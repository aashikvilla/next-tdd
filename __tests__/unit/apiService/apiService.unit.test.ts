import ApiService from "@/app/apiService/ApiService";
import { axiosInstance } from "../../../app/apiService/AxiosSetUp";
import { faker} from '@faker-js/faker';

jest.mock("../../../app/apiService/AxiosSetUp", () => ({
  axiosInstance: {
    request: jest.fn(),
  },
}));

describe("ApiService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should make a POST request with the correct parameters", async () => {
    
    const endpoint = faker.internet.domainWord();
    const data = { test: faker.location.city() };
    (axiosInstance.request as jest.Mock).mockResolvedValue({
      data: { success: true },
    });

    await ApiService.post(endpoint, data);
    expect(axiosInstance.request).toHaveBeenCalledTimes(1);
    expect(axiosInstance.request).toHaveBeenCalledWith({
      method: "post",
      url: endpoint,
      data: data,
    });
  });

  it("should make a GET request with the correct parameters", async () => {
    
    const endpoint =  faker.internet.domainWord();

    (axiosInstance.request as jest.Mock).mockResolvedValue({
      data: { success: true },
    });
    await ApiService.get(endpoint);
    expect(axiosInstance.request).toHaveBeenCalledTimes(1);
    expect(axiosInstance.request).toHaveBeenCalledWith({
      method: "get",
      url: endpoint,
    });
  });
});
