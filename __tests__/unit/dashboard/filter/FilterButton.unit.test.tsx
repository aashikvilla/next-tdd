import { FilterButton } from "@/app/dashboard/filter/FilterButton";
import { DashboardContext } from "@/app/dashboard/page";
import { faker } from "@faker-js/faker";
import { render, fireEvent, screen } from "@testing-library/react";


const mockSetSelectedStatus = jest.fn();

const renderWithDashboardContext = (
  ui: JSX.Element,
  selectedStatus: string = ""
) => {
  return render(
    <DashboardContext.Provider
      value={{
        selectedStatus,
        setSelectedStatus: mockSetSelectedStatus
      }}
    >
      {ui}
    </DashboardContext.Provider>
  );
};

describe("FilterButton", () => {
  it("renders with the correct status", () => {
    const status = faker.lorem.word();
    renderWithDashboardContext(<FilterButton status={status} />);

    expect(screen.getByText(status)).toBeInTheDocument();
  });

  it("adds 'selected' class when status is selected", () => {
    const status = faker.lorem.word();
    renderWithDashboardContext(<FilterButton status={status} />, status);

    expect(screen.getByText(status)).toHaveClass("selected");
  });

  it("calls setSelectedStatus with empty string when selected status is clicked", () => {
    const status = faker.lorem.word();
    renderWithDashboardContext(<FilterButton status={status} />, status);

    fireEvent.click(screen.getByText(status));

    expect(mockSetSelectedStatus).toHaveBeenCalledWith("");
  });

  it("calls setSelectedStatus with status when unselected status is clicked", () => {
    const status = faker.lorem.word();
    renderWithDashboardContext(<FilterButton status={status} />);

    fireEvent.click(screen.getByText(status));

    expect(mockSetSelectedStatus).toHaveBeenCalledWith(status);
  });
});
