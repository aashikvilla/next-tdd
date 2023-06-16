import { render, screen } from "@testing-library/react";
import Login from "@/app/login/page";
import { toast } from "react-toastify";
import { LoginTestConstants } from "@/__tests__/__utils__/testConstants";
import {
  clickLoginButton,
  fillInputField,
} from "@/__tests__/__utils__/helperFunctions";
import { LoginFakeData } from "@/__tests__/__fixtures__/login";
import * as api from "../../../app/login/loginApiCalls";
import { ToastConstants } from "@/app/constants/ToastConstants";
import { useDispatch } from 'react-redux';


jest.mock("../../../app/login/loginApiCalls");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("react-redux", () => ({
  useDispatch:  jest.fn()
}));

describe("Login form", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<Login />);
  });

  it("renders an email input field", () => {
    const emailElement = screen.getByLabelText(LoginTestConstants.emailLabel);
    expect(emailElement).toBeInTheDocument();
  });

  it("renders a password input field", () => {
    const passwordElement = screen.getByLabelText(
      LoginTestConstants.passwordLabel
    );
    expect(passwordElement).toBeInTheDocument();
  });

  it("renders a login button", () => {
    const loginButtonElement = screen.getByRole("button", {
      name: LoginTestConstants.loginButton,
    });
    expect(loginButtonElement).toBeInTheDocument();
  });

  it("renders a link to the registration page", () => {
    const registerLinkElement = screen.getByRole("link", {
      name: LoginTestConstants.registerLink,
    });
    expect(registerLinkElement).toBeInTheDocument();
    expect(registerLinkElement).toHaveAttribute("href", "/register");
  });

  describe("Password validation", () => {
    it("displays an error when password is not provided", async () => {
      await clickLoginButton();
      const passwordErrorElement = await screen.findByText(
        LoginTestConstants.passwordIsRequired
      );
      expect(passwordErrorElement).toBeInTheDocument();
    });

    it("displays an error when password is less than 8 characters", async () => {
      fillInputField(
        LoginTestConstants.passwordLabel,
        LoginFakeData.shortPassword
      );
      await clickLoginButton();
      const passwordErrorElement = await screen.findByText(
        LoginTestConstants.passwordLengthError
      );
      expect(passwordErrorElement).toBeInTheDocument();
    });

    it("displays an error when password does not contain required types of characters", async () => {
      fillInputField(
        LoginTestConstants.passwordLabel,
        LoginFakeData.invalidPassword
      );
      await clickLoginButton();
      const passwordErrorElement = await screen.findByText(
        LoginTestConstants.passwordTypeError
      );
      expect(passwordErrorElement).toBeInTheDocument();
    });
  });

  describe("Email validation", () => {
    it("displays an error when email is not provided", async () => {
      await clickLoginButton();
      const emailErrorElement = await screen.findByText(
        LoginTestConstants.emailIsRequired
      );
      expect(emailErrorElement).toBeInTheDocument();
    });

    it("displays an error when email format is invalid", async () => {
      fillInputField(LoginTestConstants.emailLabel, LoginFakeData.invalidEmail);
      await clickLoginButton();
      const emailErrorElement = await screen.findByText(
        LoginTestConstants.invalidEmailFormat
      );
      expect(emailErrorElement).toBeInTheDocument();
    });
  });
});

describe("Login on submit", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays an error toast when credentials are incorrect", async () => {
    const mockValidateLogin = jest.spyOn(api, "validateLogin");
    mockValidateLogin.mockRejectedValueOnce(new Error("Invalid credentials"));

    render(<Login />);
    const { email, password } = LoginFakeData.validCredentials;
    fillInputField(LoginTestConstants.emailLabel, email);
    fillInputField(LoginTestConstants.passwordLabel, password);

    await clickLoginButton();

    expect(toast.error).toHaveBeenCalledWith(ToastConstants.invalidCredentials);
  });

  it("displays a success toast when login is successful", async () => {
    const mockValidateLogin = jest.spyOn(api, "validateLogin");
    mockValidateLogin.mockResolvedValueOnce({ success: true });

    render(<Login />);

    const { email, password } = LoginFakeData.validCredentials;
    fillInputField(LoginTestConstants.emailLabel, email);
    fillInputField(LoginTestConstants.passwordLabel, password);

    await clickLoginButton();

    expect(toast.success).toHaveBeenCalledWith(ToastConstants.loginSuccess);
  });
});
