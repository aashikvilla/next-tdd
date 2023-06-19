import { fireEvent, screen ,render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginTestConstants } from './testConstants';
import { Wrapper } from "@/__tests__/__utils__/Wrapper";

export const fillInputField = (label: string|RegExp, value: string) => {
    const inputElement = screen.getByLabelText(label);
    fireEvent.change(inputElement, { target: { value } });
  };

  
export const clickLoginButton = async () => {
  const loginButtonElement = screen.getByRole('button', { name: LoginTestConstants.loginButton });  
  await userEvent.click(loginButtonElement);  
};



export const renderWithWrapper = (component : React.ReactNode)=>{
  render(
    <Wrapper>
      {component}
    </Wrapper>
  );

}

