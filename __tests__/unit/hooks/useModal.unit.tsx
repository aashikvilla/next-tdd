import { renderHook, act } from "@testing-library/react";
import {useModal} from "../../../app/hooks/useModal";

describe("useModal", () => {
  it("should initialize with isOpen set to false", () => {
    const { result } = renderHook(() => useModal());
    const { isOpen } = result.current;
    expect(isOpen).toBe(false);
  });

  it("should set isOpen to true when openModal is called", () => {
    const { result } = renderHook(() => useModal());
    const { openModal } = result.current;

    act(() => {
      openModal();
    });

    const { isOpen } = result.current;
    expect(isOpen).toBe(true);
  });

  it("should set isOpen to false when closeModal is called", () => {
    const { result } = renderHook(() => useModal());
    const { openModal, closeModal } = result.current;

    act(() => {
      openModal();
      closeModal();
    });

    const { isOpen } = result.current;
    expect(isOpen).toBe(false);
  });
});
