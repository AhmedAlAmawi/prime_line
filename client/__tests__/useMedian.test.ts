import { renderHook, act, waitFor } from "@testing-library/react";
import useMedian from "../src/hooks/useMedian";

describe("useMedian hook", () => {
  let mockFetch: jest.Mock;

  beforeAll(() => {
    mockFetch = jest.fn();
    global.fetch = mockFetch as any;
  });

  afterEach(() => {
    mockFetch.mockClear();
  });

  it("should start with an initial state", () => {
    const { result } = renderHook(() => useMedian());
    expect(result.current.isFetching).toBe(false);
    expect(result.current.medianPrime).toBeNull();
    expect(result.current.serverError).toBeNull();
  });

  it("should return error when onSubmit is called with an empty string", async () => {
    const { result } = renderHook(() => useMedian());
    await act(async () => {
      result.current.onSubmit({ numberInput: "" });
    });
    expect(result.current.serverError).toBe(
      "Invalid input. Please enter a number."
    );
  });

  it("should return error when onSubmit is called with a non-number string", async () => {
    const { result } = renderHook(() => useMedian());
    await act(async () => {
      result.current.onSubmit({ numberInput: "not a number" });
    });
    expect(result.current.serverError).toBe(
      "Invalid input. Please enter a number."
    );
  });

  it("should not make a fetch call when onSubmit is called with a non-number string", async () => {
    const { result } = renderHook(() => useMedian());
    await act(async () => {
      result.current.onSubmit({ numberInput: "not a number" });
    });
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("should not make a fetch call when onSubmit is called with an empty string", async () => {
    const { result } = renderHook(() => useMedian());
    await act(async () => {
      result.current.onSubmit({ numberInput: "" });
    });
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("should set isFetching to true when onSubmit is called", async () => {
    const { result } = renderHook(() => useMedian());
    act(() => {
      result.current.onSubmit({ numberInput: "10" });
    });
    await waitFor(() => expect(result.current.isFetching).toBe(true));
  });

  it("should call the fetch function with the correct arguments", async () => {
    const { result } = renderHook(() => useMedian());
    await act(async () => {
      result.current.onSubmit({ numberInput: "10" });
    });
    expect(mockFetch).toHaveBeenCalledWith("/api/median_prime", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ n: 10 }),
    });
  });

  it("should handle server error correctly", async () => {
    const errorResponse = { error: "Server error" };
    mockFetch.mockRejectedValueOnce(new Error(errorResponse.error));
    const { result } = renderHook(() => useMedian());
    await act(async () => {
      result.current.onSubmit({ numberInput: "10" });
    });
    expect(result.current.serverError).toBe(errorResponse.error);
    expect(result.current.isFetching).toBe(false);
  });

  it("should handle success response correctly", async () => {
    const successResponse = { data: "Some data" };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(successResponse),
    });
    const { result } = renderHook(() => useMedian());
    await act(async () => {
      result.current.onSubmit({ numberInput: "10" });
    });
    expect(result.current.medianPrime).toEqual(successResponse);
    expect(result.current.serverError).toBe(null);
    expect(result.current.isFetching).toBe(false);
  });
});
