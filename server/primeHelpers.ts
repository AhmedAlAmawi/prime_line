/* Implements Sieve of Atkin algorithm, lower time complexity smaller memory usage, more info in ReadME */
export function getPrimes(n: number): number[] {
  // Check if the input number is valid
  if (n <= 2) {
    throw new Error("Input must be greater than 2");
  }

  // Calculate the limit for the sieve
  const limit = Math.floor(Math.sqrt(n));

  let primes: number[] = [];
  let sieve: boolean[] = [];

  // Preprocessing primes up to sqrt(n) using Atkin Sieve
  for (let x = 1; x * x <= n; x++) {
    for (let y = 1; y * y <= n; y++) {
      // Check quadratic formulas: 4x^2 + y^2 | 3x^2 + y^2 | 3x^2 - y^2
      let num = 4 * x * x + y * y;
      if (num <= n && (num % 12 === 1 || num % 12 === 5)) {
        sieve[num] = !sieve[num];
      }

      num = 3 * x * x + y * y;
      if (num <= n && num % 12 === 7) {
        sieve[num] = !sieve[num];
      }

      num = 3 * x * x - y * y;
      if (x > y && num <= n && num % 12 === 11) {
        sieve[num] = !sieve[num];
      }
    }
  }

  // Mark sieve numbers for multiples of their squares as non-prime
  for (let r = 5; r <= limit; r++) {
    if (sieve[r]) {
      for (let i = r * r; i <= n; i += r * r) {
        sieve[i] = false;
      }
    }
  }

  // Include 2 and 3 in primes list
  if (n > 2) primes.push(2);
  if (n > 3) primes.push(3);

  // Include remaining prime numbers
  for (let a = 5; a <= n; a += 2) {
    if (sieve[a]) {
      primes.push(a);
    }
  }

  // Check if there are no primes and throw error
  if (primes.length === 0) {
    throw new Error("There are no prime numbers less than the input number");
  }

  return primes;
}

export function getMedian(primes: number[]): number[] {
  const middleIndex = Math.floor(primes.length / 2);
  if (primes.length % 2) {
    // odd length
    return [primes[middleIndex]];
  } else {
    // even length
    return [primes[middleIndex - 1], primes[middleIndex]];
  }
}
