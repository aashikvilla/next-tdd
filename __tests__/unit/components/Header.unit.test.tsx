import { mockUserData } from '@/__tests__/__fixtures__/store';
import { HeaderTestConstants } from '@/__tests__/__utils__/testConstants';
import Header from '@/app/components/Header';
import { initialUserState } from '@/app/store/features/user/userSlice';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';


jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

describe('Header Component', () => {

  it('renders login button if user is not authenticated', () => {
    (useSelector as jest.Mock).mockReturnValue(initialUserState);

    render(<Header />);

    const loginButton = screen.getByRole('button', { name: HeaderTestConstants.loginButton });
    expect(loginButton).toBeInTheDocument();
  });


  it('renders user name if user is authenticated', () => {
    const userData=mockUserData;
    (useSelector as jest.Mock).mockReturnValue(userData);

    render(<Header />);

    const userName = screen.getByText( `${userData.firstName} ${userData.lastName}` );
    expect(userName).toBeInTheDocument();
  });

  it('renders logout button if user is authenticated', () => {
    (useSelector as jest.Mock).mockReturnValue(mockUserData);

    render(<Header />);

    const logoutButton = screen.getByRole('button', { name: HeaderTestConstants.logoutButton });
    expect(logoutButton).toBeInTheDocument();
  });
});
