import { Textbox } from "@/app/components/form/TextBox";
import { render, renderHook, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";

describe("Textbox component", () => {
    it("renders label and input field", () => {
      const { register } = renderHook(() => useForm()).result.current;
      
      render(<Textbox id="email" type="text" label="Email" register={register("email")} />);
      
      const labelElement = screen.getByText(/Email/i);
      expect(labelElement).toBeInTheDocument();
  
      const inputElement = screen.getByRole('textbox', { name: /Email/i });
      expect(inputElement).toBeInTheDocument();
    });
  
    it("displays error message when error prop provided", () => {
      const { register } = renderHook(() => useForm()).result.current;
  
      render(<Textbox id="email" type="text" label="Email" register={register("email")} error="Email is required" />);
  
      const errorElement = screen.getByText(/Email is required/i);
      expect(errorElement).toBeInTheDocument();
    });
  });