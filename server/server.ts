import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

//HELPERS
import { getPrimes, getMedian } from "./primeHelpers";

const port = 8000;
const server = express();
server.use(cors());
server.use(express.json());

server.post(
  "/api/median_prime",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const n = Number(req.body.n);

      if (isNaN(n)) throw new Error("Input must be a number");

      const primes = getPrimes(n);
      const medianPrime = getMedian(primes);
      const formattedMedianPrime = `[${medianPrime.join(", ")}]`;
      res.json({ formattedMedianPrime, primes, medianPrime });
    } catch (error) {
      next(error);
    }
  }
);

// Error handling middleware
server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({ error: err.message });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default server;
