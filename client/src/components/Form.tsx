import React from "react";

//HOOKS
import useMedian from "../hooks/useMedian";
import { useForm } from "react-hook-form";

//COMPONENTS
import Input from "./Input";
import LoadingAnimation from "./LoadingAnimation";

type FormInputs = {
  numberInput: string;
};

const Form: React.FC = () => {
  const { medianPrime, serverError, isFetching, onSubmit } = useMedian();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormInputs>();

  return (
    <div className="max-w-4xl mx-auto px-4 my-12">
      <div className="flex flex-col gap-10">
        <div className="border w-full border-darkBlue rounded-xl  h-max">
          <p className="w-full bg-bistroBlue text-white text-center rounded-t-xl py-1 mb-4">
            Median Prime Number(s) Calculator
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="px-6">
            <Input
              label="Enter a positive number"
              name="numberInput"
              type="number"
              disabled={isFetching}
              register={register}
              errors={errors.numberInput}
              placeholder="Enter a positive number..."
            />
            <div className="mt-4 w-full flex items-end justify-end ">
              <button
                type="submit"
                disabled={isFetching}
                className="flex flex-row gap-2 text-base items-center rounded bg-darkBlue px-4 py-2  font-semibold text-white shadow-sm hover:bg-blue-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                {isFetching && <LoadingAnimation />}
                Calculate
              </button>
            </div>
          </form>
          <div className="px-6 mb-6">
            {serverError ? (
              <p className="text-red-500">Error: {serverError}</p>
            ) : (
              medianPrime && (
                <div>
                  <p className="block text-sm font-medium leading-6 text-gray-900">
                    Median Prime Number(s):
                  </p>
                  <p className=" block w-full rounded-md border-0 p-2 font-semibold text-bistroBlue sm:leading-6">
                    {medianPrime.formattedMedianPrime}
                  </p>
                  <p className="block text-sm font-medium leading-6 text-gray-900 mt-4">
                    Breakdown:
                  </p>
                  <div className=" max-h-[40vh] overflow-auto bg-lightBlue gap-4  flex flex-col  w-full text-center rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6">
                    <p>
                      The set of prime numbers less than{" "}
                      <span className="font-bold">
                        {getValues("numberInput")}
                      </span>{" "}
                      is:
                    </p>
                    <p className=" text-gray-600">
                      {medianPrime.primes.length > 10
                        ? `[${medianPrime.primes
                            .slice(0, 7)
                            .join(", ")}, ..., ${medianPrime.primes
                            .slice(-3)
                            .join(", ")}]`
                        : `[${medianPrime.primes.join(", ")}]`}
                    </p>
                    <p>
                      The median of which is: [
                      {medianPrime.medianPrime.join(", ")}]
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
