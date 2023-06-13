import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Login from '@/app/login/page';
import { toast } from 'react-toastify';
import * as api from '../../../app/login/LoginApiCalls' // /app/login/LoginApiCalls';
import userEvent from '@testing-library/user-event';

jest.mock('../../../app/login/LoginApiCalls');
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));


describe('Login form', () => {
  beforeEach(() => {
    jest.clearAllMocks()    
    render(<Login />);
  });

  it('renders an email input field', () => {
    const emailElement = screen.getByLabelText(/email/i);
    expect(emailElement).toBeInTheDocument();
  });

  it('renders a password input field', () => {
    const passwordElement = screen.getByLabelText(/password/i);
    expect(passwordElement).toBeInTheDocument();
  });

  it('renders a login button', () => {
    const loginButtonElement = screen.getByRole('button', { name: /login/i });
    expect(loginButtonElement).toBeInTheDocument();
  });

  it('renders a link to the registration page', () => {
    const registerLinkElement = screen.getByRole('link', { name: /register/i });
    expect(registerLinkElement).toBeInTheDocument();
    expect(registerLinkElement).toHaveAttribute('href', '/register');
  });


  describe('Password validation', () => {
    it('displays an error when password is not provided', async () => {      
      const loginButtonElement = screen.getByRole('button', { name: /login/i });
  
      fireEvent.click(loginButtonElement);
  
      const passwordErrorElement = await screen.findByText('Password is required');
      expect(passwordErrorElement).toBeInTheDocument();
    });
  
    it('displays an error when password is less than 8 characters', async () => {
      const passwordElement = screen.getByLabelText(/password/i);
      const loginButtonElement = screen.getByRole('button', { name: /login/i });
  
      fireEvent.change(passwordElement, { target: { value: '123' } });
      fireEvent.click(loginButtonElement);
  
      const passwordErrorElement = await screen.findByText('Password should be at least 8 characters long');
      expect(passwordErrorElement).toBeInTheDocument();
    });
  
    it('displays an error when password does not contain required types of characters', async () => {
      const passwordElement = screen.getByLabelText(/password/i);
      const loginButtonElement = screen.getByRole('button', { name: /login/i });
  
      fireEvent.change(passwordElement, { target: { value: 'abcdefgh' } });
      fireEvent.click(loginButtonElement);
  
      const passwordErrorElement = await screen.findByText('Password should contain at least 1 number, lowercase and uppercase letter');
      expect(passwordErrorElement).toBeInTheDocument();
    });
  });


  describe('Email validation', () => {
    it('displays an error when email is not provided', async () => {    
      const loginButtonElement = screen.getByRole('button', { name: /login/i });
  
      fireEvent.click(loginButtonElement);
  
      const emailErrorElement = await screen.findByText('Email is required');
      expect(emailErrorElement).toBeInTheDocument();
    });
  
    it('displays an error when email format is invalid', async () => {
      const emailElement = screen.getByLabelText(/email/i);
      const loginButtonElement = screen.getByRole('button', { name: /login/i });
  
      fireEvent.change(emailElement, { target: { value: 'not-valid-email' } });
      fireEvent.click(loginButtonElement);
  
      const emailErrorElement = await screen.findByText('Email should be in proper format: abc@example.com');
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

    const emailElement = screen.getByLabelText(/email/i);
    const passwordElement = screen.getByLabelText(/password/i);
    const loginButtonElement = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailElement, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordElement, { target: { value: 'Password123' } });
     
     await userEvent.click(loginButtonElement);   
     expect(toast.error).toHaveBeenCalledWith('Invalid credentials');
    
  });

  
  it('displays a success toast when login is successful', async () => {
    
    const mockValidateLogin = jest.spyOn(api, 'validateLogin');
    mockValidateLogin.mockResolvedValueOnce({ success: true });
    render(<Login />);

    const emailElement = screen.getByLabelText(/email/i);
    const passwordElement = screen.getByLabelText(/password/i);
    const loginButtonElement = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailElement, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordElement, { target: { value: 'Password123' } });
   
    await userEvent.click(loginButtonElement);   
    expect(toast.success).toHaveBeenCalledWith('Logged in successfully');

  });

})