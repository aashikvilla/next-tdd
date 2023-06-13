import { fireEvent, screen } from '@testing-library/react';

export const fillInputField = (label: string|RegExp, value: string) => {
    const inputElement = screen.getByLabelText(label);
    fireEvent.change(inputElement, { target: { value } });
  };