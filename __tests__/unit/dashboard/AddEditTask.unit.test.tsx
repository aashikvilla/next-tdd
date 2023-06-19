import { mockTask, taskFields } from "@/__tests__/__fixtures__/tasks";
import { fillInputField } from "@/__tests__/__utils__/helperFunctions";
import AddEditTask from "@/app/dashboard/AddEditTask";
import { saveTask } from "@/app/dashboard/taskApiCalls";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("../../../app/dashboard/taskApiCalls");

describe("AddEditTask component", () => {
  taskFields.forEach(({ id, errorMessage }) => {
    it(`renders ${id} field`, async () => {
      render(<AddEditTask taskDetails={null} />);
      const inputElement = screen.getByLabelText(id);
      expect(inputElement).toBeInTheDocument();
    });

    it(`shows error message for ${id} when empty`, async () => {
      render(<AddEditTask taskDetails={null} />);
      const saveButtonElement = screen.getByRole("button", { name: /save/i });
      await userEvent.click(saveButtonElement);
      expect(await screen.findByText(errorMessage)).toBeInTheDocument();
    });
  });

  it("calls saveTask on form submission with valid input", async () => {
    render(<AddEditTask taskDetails={null} />);

    for (let field of taskFields) {
      const { id, value } = field;
      fillInputField(id, value);
    }

    const saveButtonElement = screen.getByRole("button", { name: /save/i });
    await userEvent.click(saveButtonElement);

    expect(saveTask).toHaveBeenCalled();
  });

  it("renders default values in input fields", () => {
    const taskDetails = { ...mockTask };

    render(<AddEditTask taskDetails={taskDetails} />);

    Object.entries(taskDetails).forEach(([id, defaultValue]) => {
      if (id !== "id") {
        const inputElement = screen.getByLabelText(new RegExp(id, "i"));
        expect(inputElement).toHaveValue(defaultValue);
      }
    });
  });
});
