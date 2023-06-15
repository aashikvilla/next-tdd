import "@testing-library/jest-dom/extend-expect";

jest.mock("next/navigation", () => require("next-router-mock"));

afterEach(() => {
  jest.clearAllMocks();
});
