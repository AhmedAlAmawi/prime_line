import React, { Fragment } from "react";

const content = [
  {
    header: "How does it work?",
    copy: "The calculator implements the Sieve of Atkin algorithm to list out all the prime numbers up to the provided limit. The median of the prime number list is then calculated and returned.",
  },
  {
    header: "What is a prime number?",
    copy: "A prime number is a whole number greater than 1 that has only two distinct positive divisors: 1 and itself. This means it can only be divided by 1 and the number itself without leaving any remainder. For example, the first few prime numbers are 2, 3, 5, 7, 11, and 13. Unlike other numbers, prime numbers are not the product of multiplying two smaller numbers together. ",
  },
];
const FAQ: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 my-8">
      {content.map((entry, index) => (
        <Fragment key={index}>
          <h2 className="mt-16 text-3xl font-bold tracking-tight text-gray-900">
            {entry.header}
          </h2>
          <p className="mt-3 text-lg">{entry.copy}</p>
        </Fragment>
      ))}
    </div>
  );
};

export default FAQ;
