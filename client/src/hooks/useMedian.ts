import { useState } from "react";
import { SubmitHandler } from "react-hook-form";

type FormInputs = {
  numberInput: string;
};

interface MedianHook {
  medianPrime: {
    formattedMedianPrime: string;
    primes: number[];
    medianPrime: number[];
  } | null;
  serverError: string | null;
  isFetching: boolean;
  onSubmit: SubmitHandler<FormInputs>;
}

const useMedian = (): MedianHook => {
  const [isFetching, setIsFetching] = useState<MedianHook["isFetching"]>(false);
  const [medianPrime, setMedianPrime] = useState<
    MedianHook["medianPrime"] | null
  >(null);
  const [serverError, setServerError] =
    useState<MedianHook["serverError"]>(null);

  const onSubmit: SubmitHandler<FormInputs> = async (data: {
    numberInput: string;
  }) => {
    const numberInput = parseInt(data.numberInput, 10);

    if (isNaN(numberInput)) {
      setServerError("Invalid input. Please enter a number.");
      return;
    }

    try {
      setIsFetching(true);
      const response = await fetch("/api/median_prime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ n: parseInt(data.numberInput, 10) }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error);
      }

      const responseData = await response.json();
      setMedianPrime(responseData);
      setServerError(null);
      setIsFetching(false);
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      setIsFetching(false);
      setServerError(
        errorMessage.includes("Unexpected")
          ? "Server not available"
          : errorMessage
      );
    }
  };

  return {
    medianPrime,
    serverError,
    isFetching,
    onSubmit,
  };
};

export default useMedian;
