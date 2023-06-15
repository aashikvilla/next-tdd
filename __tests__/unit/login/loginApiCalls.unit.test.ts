import { LoginFakeData } from "@/__tests__/__fixtures__/login";
import { ApiRouteConstants } from "@/app/apiService/ApiRouteConstants";
import ApiService from "@/app/apiService/ApiService";
import { validateLogin } from "@/app/login/loginApiCalls";

jest.mock("../../../app/apiService/ApiService", () => ({
  post: jest.fn(),
}));

describe("validateLogin", () => {
  it("should call the ApiService.post with correct parameters", async () => {
    const mockData = LoginFakeData.validCredentials;
    (ApiService.post as jest.Mock).mockResolvedValue({});
    await validateLogin(mockData);
    expect(ApiService.post).toHaveBeenCalledWith(
      ApiRouteConstants.Auth.Login,
      mockData
    );
  });
});
