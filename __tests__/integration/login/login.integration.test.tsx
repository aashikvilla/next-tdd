import { render } from "@testing-library/react";
import { server } from "@/__tests__/__mocks__/server";
import {
  clickLoginButton,
  fillInputField,
} from "@/__tests__/__utils__/helperFunctions";
import Login from "@/app/login/page";
import { toast } from "react-toastify";
import { LoginFakeData } from "@/__tests__/__fixtures__/login";
import { LoginTestConstants } from "@/__tests__/__utils__/testConstants";
import { ToastConstants } from "@/app/constants/ToastConstants";
import { Wrapper } from "@/__tests__/__utils__/Wrapper";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("Intergration : Login on submit", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });

  afterAll(() => {
    server.close();
  });

  it("displays an error toast when credentials are incorrect", async () => {
    render(<Wrapper><Login /></Wrapper>);
    const { email, password } = LoginFakeData.invalidCredentials;
    fillInputField(LoginTestConstants.emailLabel, email);
    fillInputField(LoginTestConstants.passwordLabel, password);

    await clickLoginButton();

    expect(toast.error).toHaveBeenCalledWith(ToastConstants.invalidCredentials);
  });

  it("displays a success toast when login is successful", async () => {
    render(<Wrapper><Login /></Wrapper>);
    const { email, password } = LoginFakeData.validCredentials;
    fillInputField(LoginTestConstants.emailLabel, email);
    fillInputField(LoginTestConstants.passwordLabel, password);

    await clickLoginButton();

    expect(toast.success).toHaveBeenCalledWith(ToastConstants.loginSuccess);
  });
});
