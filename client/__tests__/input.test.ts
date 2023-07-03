import React from "react";
import { render, screen } from "@testing-library/react";
import Input, { InputProps } from "../src/components/input";

describe("Input component", () => {
  const inputProps: InputProps = {
    label: "Enter a positive number",
    register: jest.fn(),
    errors: undefined,
    name: "numberInput",
    type: "number",
    placeholder: "Enter a positive number...",
    disabled: false,
  };

  it("should render without errors", () => {
    render(React.createElement(Input, inputProps));
    expect(
      screen.getByLabelText("Enter a positive number")
    ).toBeInTheDocument();
  });

  it("should not allow non number inputs", () => {
    render(React.createElement(Input, inputProps));
    const inputElement = screen.getByLabelText(
      "Enter a positive number"
    ) as HTMLInputElement;
    const testValue = "test@example.com";
    inputElement.value = testValue;
    expect(inputElement.value).toBe("");
  });

  it("should display the error message when errors exist", () => {
    const errorProps: InputProps = {
      ...inputProps,
      errors: { type: "required", message: "Invalid input" },
    };
    render(React.createElement(Input, errorProps));
    const errorMessage = screen.getByText("Invalid input");
    expect(errorMessage).toBeInTheDocument();
  });

  it("Should apply red ring to the input when there are errors", () => {
    const errorProps: InputProps = {
      ...inputProps,
      errors: { type: "required", message: "Invalid input" },
    };
    render(React.createElement(Input, errorProps));
    const inputElement = screen.getByLabelText(
      "Enter a positive number"
    ) as HTMLInputElement;

    expect(inputElement).toHaveClass("ring-red-600");
  });
});
