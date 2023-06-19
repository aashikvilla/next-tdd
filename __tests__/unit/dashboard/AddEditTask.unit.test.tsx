import { taskFields } from "@/__tests__/__fixtures__/tasks";
import AddEditTask from "@/app/dashboard/AddEditTask";
import { saveTask } from "@/app/dashboard/taskApiCalls";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event';


jest.mock("../pages/taskApiCalls");



describe('AddEditTask component', () => {

    
    taskFields.forEach(({ id, errorMessage }) => {
    test(`renders ${id} field`, async () => {
      render(<AddEditTask taskDetails={null} />);
      const inputElement = screen.getByLabelText(id);
      expect(inputElement).toBeInTheDocument();
    });
  
    test(`shows error message for ${id} when empty`, async () => {
      render(<AddEditTask taskDetails={null} />);
      const inputElement = screen.getByLabelText(id);
      fireEvent.blur(inputElement);
      expect(await screen.findByText(errorMessage)).toBeInTheDocument();
    });
  });


  
  test('calls saveTask on form submission with valid input', () => {
   
    render(<AddEditTask taskDetails={null} />);
    taskFields.forEach(({ id, value }) => {
      const inputElement = screen.getByLabelText(id);
      userEvent.type(inputElement, value);
    });
    userEvent.click(screen.getByText(/save/i));
    expect(saveTask).toHaveBeenCalled();
  });
});
