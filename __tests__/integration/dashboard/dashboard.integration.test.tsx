import { render, screen } from "@testing-library/react";
import Dashboard, { Task } from "@/app/dashboard/page";
import { getAllTasks } from "../../../app/dashboard/taskApiCalls";
import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";

jest.mock("../../../app/dashboard/taskApiCalls"); 

const mockTasks: Task[] = [
  {
    id: faker.lorem.text(),
    title: "Task 1",
    status: "NOT STARTED",
    description: faker.lorem.sentence(),
    priority: faker.lorem.word(),
  },
  {
    id: faker.lorem.text(),
    title: "Task 2",
    status: "IN PROGRESS",
    description: faker.lorem.sentence(),
    priority: faker.lorem.word(),
  },
  {
    id: faker.lorem.text(),
    title: "Task 3",
    status: "COMPLETED",
    description: faker.lorem.sentence(),
    priority: faker.lorem.word(),
  },
];

describe("Integration : Dashboard Filters", () => {
  beforeEach(() => {
    (getAllTasks as jest.Mock).mockResolvedValue(mockTasks);
  });

  it("NOT STARTED Filter button is functioning as expected", async () => {
    render(<Dashboard />);

    // Check if all tasks are displayed
    for (const task of mockTasks) {
      expect(await screen.findByText(task.title)).toBeInTheDocument();
    }

    // Click on 'NOT STARTED' filter button
    await userEvent.click(screen.getByRole("button", { name: /NOT STARTED/i }));

    // Check only 'NOT STARTED' task is displayed
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Task 3")).not.toBeInTheDocument();

    // Click on 'NOT STARTED' filter button again to remove filter
    await userEvent.click(screen.getByRole("button", { name: /NOT STARTED/i }));

    // Check if all tasks are displayed again
    for (const task of mockTasks) {
      expect(await screen.findByText(task.title)).toBeInTheDocument();
    }
  });

  it("IN PROGRESS Filter button is functioning as expected", async () => {
    render(<Dashboard />);

    // Click on 'IN PROGRESS' filter button
    await userEvent.click(screen.getByRole("button", { name: /IN PROGRESS/i }));

    // Check only 'IN PROGRESS' task is displayed
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Task 3")).not.toBeInTheDocument();

    // Click on 'IN PROGRESS' filter button again to remove the filter
    await userEvent.click(screen.getByRole("button", { name: /IN PROGRESS/i }));

    // Check if all tasks are displayed again
    for (const task of mockTasks) {
      expect(await screen.findByText(task.title)).toBeInTheDocument();
    }
  });

  it("COMPLETED Filter button is functioning as expected", async () => {
    render(<Dashboard />);

    // Click on 'COMPLETED' filter button
    await userEvent.click(screen.getByRole("button", { name: /COMPLETED/i }));

    // Check only 'COMPLETED' task is displayed
    expect(screen.getByText("Task 3")).toBeInTheDocument();
    expect(screen.queryByText("Task 2")).not.toBeInTheDocument();

    // Click on 'COMPLETED' filter button again to remove filter
    await userEvent.click(screen.getByRole("button", { name: /COMPLETED/i }));

    // Check if all tasks are displayed again
    for (const task of mockTasks) {
      expect(await screen.findByText(task.title)).toBeInTheDocument();
    }
  });
});
