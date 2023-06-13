import { render, screen } from '@testing-library/react';
import Login from '@/app/login/page';
import { toast } from 'react-toastify';
import * as api from '../../../app/login/LoginApiCalls' 
import userEvent from '@testing-library/user-event';
import { LoginConstants } from '@/__tests__/__utils__/testConstants';
import { fillInputField } from '@/__tests__/__utils__/helperFunctions';


jest.mock('../../../app/login/LoginApiCalls');
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));


const clickLoginButton = async () => {
  const loginButtonElement = screen.getByRole('button', { name: LoginConstants.loginButton });  
  await userEvent.click(loginButtonElement);  
};


describe('Login form', () => {
  beforeEach(() => {
    jest.clearAllMocks()    
    render(<Login />);
  });

  it('renders an email input field', () => {
    const emailElement = screen.getByLabelText(LoginConstants.emailLabel);
    expect(emailElement).toBeInTheDocument();
  });

  it('renders a password input field', () => {
    const passwordElement = screen.getByLabelText(LoginConstants.passwordLabel);
    expect(passwordElement).toBeInTheDocument();
  });

  it('renders a login button', () => {
    const loginButtonElement = screen.getByRole('button', { name: LoginConstants.loginButton });
    expect(loginButtonElement).toBeInTheDocument();
  });

  it('renders a link to the registration page', () => {
    const registerLinkElement = screen.getByRole('link', { name: LoginConstants.registerLink });
    expect(registerLinkElement).toBeInTheDocument();
    expect(registerLinkElement).toHaveAttribute('href', '/register');
  });

  describe('Password validation', () => {
    it('displays an error when password is not provided', async () => {
      await clickLoginButton();
      const passwordErrorElement = await screen.findByText(LoginConstants.passwordIsRequired);
      expect(passwordErrorElement).toBeInTheDocument();
    });

    it('displays an error when password is less than 8 characters', async () => {
      fillInputField(LoginConstants.passwordLabel, '123');
      await clickLoginButton();
      const passwordErrorElement = await screen.findByText(LoginConstants.passwordLengthError);
      expect(passwordErrorElement).toBeInTheDocument();
    });

    it('displays an error when password does not contain required types of characters', async () => {
      fillInputField(LoginConstants.passwordLabel, 'abcdefgh');
      await clickLoginButton();
      const passwordErrorElement = await screen.findByText(LoginConstants.passwordTypeError);
      expect(passwordErrorElement).toBeInTheDocument();
    });
  });

  describe('Email validation', () => {
    it('displays an error when email is not provided', async () => {
      await clickLoginButton();
      const emailErrorElement = await screen.findByText(LoginConstants.emailIsRequired);
      expect(emailErrorElement).toBeInTheDocument();
    });

    it('displays an error when email format is invalid', async () => {
      fillInputField(LoginConstants.emailLabel, 'not-valid-email');
      await clickLoginButton();
      const emailErrorElement = await screen.findByText(LoginConstants.invalidEmailFormat);
      expect(emailErrorElement).toBeInTheDocument();
    });
  });
});


describe('Login on submit',()=>{

  beforeEach(() => {
    jest.clearAllMocks()   
  });

  it('displays an error toast when credentials are incorrect', async () => {
    const mockValidateLogin = jest.spyOn(api, 'validateLogin');
    mockValidateLogin.mockRejectedValueOnce(new Error('Invalid credentials'));

    render(<Login />);
    fillInputField(LoginConstants.emailLabel, 'test@example.com');
    fillInputField(LoginConstants.passwordLabel, 'Password123');
    await  clickLoginButton();

    expect(toast.error).toHaveBeenCalledWith('Invalid credentials');
    
  });

  
  it('displays a success toast when login is successful', async () => {
    
    const mockValidateLogin = jest.spyOn(api, 'validateLogin');
    mockValidateLogin.mockResolvedValueOnce({ success: true });

    render(<Login />);
    fillInputField(LoginConstants.emailLabel, 'test@example.com');
    fillInputField(LoginConstants.passwordLabel, 'Password123');
    await  clickLoginButton();

    expect(toast.success).toHaveBeenCalledWith('Logged in successfully');

  });

})