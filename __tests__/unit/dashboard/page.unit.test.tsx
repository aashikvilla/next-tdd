import { mockTaskList } from "@/__tests__/__fixtures__/tasks";
import Dashboard from "@/app/dashboard/page";
import { getAllTasks } from "../../../app/dashboard/taskApiCalls";
import { render, screen, waitFor } from "@testing-library/react";
import { DashboardTestConstants } from "@/__tests__/__utils__/testConstants";

jest.mock("../../../app/dashboard/taskApiCalls");

describe("Dashboard", () => {
  beforeEach(() => {
    (getAllTasks as jest.Mock).mockResolvedValue(mockTaskList);
  });

  it(`renders dashboard`, async () => {
    render(<Dashboard />);
    
    const header = await screen.findByText(DashboardTestConstants.DashboardHeading);
    expect(header).toBeInTheDocument();
  });

  describe("Rendering all filter buttons", () => {
    DashboardTestConstants.Status.forEach((status) => {
      it(`renders ${status} button`, async () => {
        const regexPattern = new RegExp(status, "i");
        render(<Dashboard />);
  
        await waitFor(() => {
          const statusButton = screen.getByRole("button", { name: regexPattern });
          expect(statusButton).toBeInTheDocument();
        });
      });
    });
  });

  describe("Rendering all columns", () => {
    DashboardTestConstants.Columns.forEach((column) => {
      it(`renders ${column} column`, async () => {
        const regexPattern = new RegExp(column, "i");
        render(<Dashboard />);
  
        await waitFor(() => {
          const columnHeader = screen.getByRole("columnheader", { name: regexPattern });
          expect(columnHeader).toBeInTheDocument();
        });
      });
    });
  });

  it("renders correct pagination text for mockData", async () => {
    render(<Dashboard />);

    await waitFor(() => {
      const mockDataLength = mockTaskList.length;
      const expectedPaginationText =
        mockDataLength > 5
          ? `1–5 of ${mockDataLength}`
          : `1–${mockDataLength} of ${mockDataLength}`;
      const paginationText = screen.getByText(
        new RegExp(expectedPaginationText, "i")
      );
      expect(paginationText).toBeInTheDocument();
    });
  });
});
