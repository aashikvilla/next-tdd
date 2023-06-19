import { mockTaskList } from "@/__tests__/__fixtures__/tasks";
import Dashboard, { TaskColumns } from "@/app/dashboard/page";
import { getAllTasks } from "../../../app/dashboard/taskApiCalls";
//import { getAllTasks } from '@/app/dashboard/taskApiService';
import { GridColDef } from "@mui/x-data-grid";
import { Matcher, act, render, screen, waitFor } from "@testing-library/react";

jest.mock("../../../app/dashboard/taskApiCalls");

describe("Dashboard",()=>{

  beforeEach(() => {
    (getAllTasks as jest.Mock).mockResolvedValue(mockTaskList);
  });
  
  
it(`renders dashboard`, async () => {
  render(<Dashboard />);
  
  const columnHeader = await screen.findByText(/Dashboard/i);
  expect(columnHeader).toBeInTheDocument();
});

it(`renders Id column`, async () => {
  render(<Dashboard />);
  await waitFor(async () => {
    const columnHeader = await screen.findByText(/Id/i);
    expect(columnHeader).toBeInTheDocument();
  });
});
it(`renders Title column`, async () => {
  render(<Dashboard />);
  
  await waitFor(async () => {
    const columnHeader = await screen.findByText(/Title/i);
    expect(columnHeader).toBeInTheDocument();
  });
});
it(`renders Description column`, async () => {
  render(<Dashboard />);

  await waitFor(async () => {
    const columnHeader = await screen.findByText(/Description/i);
    expect(columnHeader).toBeInTheDocument();
  }); 
});


it(`renders Priority column`, async () => {
  render(<Dashboard />);

  await waitFor(async () => {
    const columnHeader = await screen.findByText(/Priority/i);
    expect(columnHeader).toBeInTheDocument();
  });
  screen.debug(undefined, Infinity);
  
});


it(`renders Action column`, async () => {
  render(<Dashboard />);

  await waitFor(async () => {
    const columnHeader = await screen.findByText(/Action/i);
    expect(columnHeader).toBeInTheDocument();
  });
  screen.debug(undefined, Infinity);
  
});


it(`renders Action column`, async () => {
  render(<Dashboard />);

  await waitFor(async () => {
    const columnHeader = await screen.findByText(/Action/i);
    expect(columnHeader).toBeInTheDocument();
  });
  screen.debug(undefined, Infinity);
  
});


it("renders correct pagination text for mockData", async () => {
  render(<Dashboard />);

  await waitFor(() => {
    const mockDataLength = mockTaskList.length;
    const expectedPaginationText = mockDataLength > 5 ? `1–5 of ${mockDataLength}` : `1–${mockDataLength} of ${mockDataLength}`;
    const paginationText = screen.getByText(new RegExp(expectedPaginationText, "i"));
    expect(paginationText).toBeInTheDocument();
  });
});


})

// TaskColumns.forEach((column: GridColDef, index) => {
//   it(`renders column header: ${column.headerName}`, async () => {
//     render(<Dashboard />);
//     const headerName = column.headerName ?? "";

//     const columnHeader = await screen.findByText(headerName);
//     expect(columnHeader).toBeInTheDocument();
//   });
// });

