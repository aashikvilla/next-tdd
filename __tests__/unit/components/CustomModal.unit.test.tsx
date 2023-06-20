import { render, screen } from "@testing-library/react";
import CustomModal from "@/app/components/CustomModal";
import { mockCustomModalProps } from "@/__tests__/__fixtures__/components";
import { faker } from "@faker-js/faker";

describe("Modal", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the modal with proper header", () => {
    const mockProps = { ...mockCustomModalProps };
    render(<CustomModal {...mockProps} />);

    const modalHeader = screen.getByText(mockProps.header);
    expect(modalHeader).toBeInTheDocument();
  });

  it("renders the modal proper content", () => {
    const mockProps = { ...mockCustomModalProps };
    const modalBody = faker.lorem.sentence(1);
    mockProps.children=<div>{modalBody}</div>
  
    render(<CustomModal {...mockProps} />);

    const modalContent = screen.getByText(modalBody);
    expect(modalContent).toBeInTheDocument();
  });
});
