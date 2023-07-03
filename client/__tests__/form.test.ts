import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "../src/components/Form";
import useMedian from "../src/hooks/useMedian";

describe("Form Component", () => {
  it("should render without crashing and contains an input and a submit button", () => {
    render(React.createElement(Form));
    const inputElement = screen.getByPlaceholderText(
      /Enter a positive number.../i
    );
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "number");
    expect(
      screen.getByRole("button", { name: /Calculate/i })
    ).toBeInTheDocument();
  });

  it("should display validation error when the form is submitted with empty input", async () => {
    render(React.createElement(Form));
    const submitButton = screen.getByRole("button", { name: /Calculate/i });
    userEvent.click(submitButton);
    expect(
      await screen.findByText(/Please enter a number/i)
    ).toBeInTheDocument();
  });

  it("should call the onSubmit function from useMedian when form is submitted", async () => {
    const mockOnSubmit = jest.fn();
    (useMedian as jest.Mock) = jest.fn().mockReturnValue({
      medianPrime: null,
      serverError: null,
      isFetching: false,
      onSubmit: mockOnSubmit,
    });
    render(React.createElement(Form));
    const numberInput = screen.getByPlaceholderText(
      /Enter a positive number.../i
    );
    const submitButton = screen.getByRole("button", { name: /Calculate/i });
    userEvent.type(numberInput, "10");
    userEvent.click(submitButton);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it("should display server error when there is one", () => {
    const mockServerError = "server error, please try again later.";
    (useMedian as jest.Mock).mockReturnValue({
      medianPrime: null,
      serverError: mockServerError,
      isFetching: false,
      onSubmit: jest.fn(),
    });
    render(React.createElement(Form));
    expect(screen.getByText(`Error: ${mockServerError}`)).toBeInTheDocument();
  });

  it("should display loading animation and disable form when isFetching is true", () => {
    (useMedian as jest.Mock).mockReturnValue({
      medianPrime: null,
      serverError: null,
      isFetching: true,
      onSubmit: jest.fn(),
    });
    render(React.createElement(Form));
    const loadingAnimation = screen.getByTestId("loading-animation");
    const numberInput = screen.getByRole("spinbutton");
    const submitButton = screen.getByRole("button", { name: /Calculate/i });
    expect(loadingAnimation).toBeInTheDocument();
    expect(numberInput).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });

  it("should display median prime numbers after successful form submission", () => {
    const mockMedianPrime = {
      formattedMedianPrime: "[3, 5]",
      primes: [2, 3, 5, 7],
      medianPrime: [3, 5],
    };
    (useMedian as jest.Mock).mockReturnValue({
      medianPrime: mockMedianPrime,
      serverError: null,
      isFetching: false,
      onSubmit: jest.fn(),
    });
    render(React.createElement(Form));
    expect(
      screen.getByText(`${mockMedianPrime.formattedMedianPrime}`)
    ).toBeInTheDocument();
  });
});
