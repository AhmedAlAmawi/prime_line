import request from "supertest";
import server from "../server";
import { getPrimes, getMedian } from "../primeHelpers";

describe("POST /api/median_prime", () => {
  it("should return an object with correct keys", async () => {
    const res = await request(server).post("/api/median_prime").send({ n: 10 });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("formattedMedianPrime");
    expect(res.body).toHaveProperty("primes");
    expect(res.body).toHaveProperty("medianPrime");
  });

  it("should calculate median prime correctly for even number of primes", async () => {
    const res = await request(server).post("/api/median_prime").send({ n: 10 });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("formattedMedianPrime");
    expect(res.body.formattedMedianPrime).toEqual("[3, 5]");
  });

  it("should calculate median prime correctly for odd number of primes", async () => {
    const res = await request(server).post("/api/median_prime").send({ n: 18 });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("formattedMedianPrime");
    expect(res.body.formattedMedianPrime).toEqual("[7]");
  });

  it("should handle large inputs", async () => {
    const res = await request(server)
      .post("/api/median_prime")
      .send({ n: 12000 });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("formattedMedianPrime");
    expect(res.body.formattedMedianPrime).toEqual("[5441, 5443]");
  });

  it("should return error when input is not a number", async () => {
    const res = await request(server)
      .post("/api/median_prime")
      .send({ n: "a" });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Input must be a number");
  });

  it("should return error when input is a negative number", async () => {
    const res = await request(server).post("/api/median_prime").send({ n: -1 });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Input must be greater than 2");
  });

  it("should return error when input is less than or equal to 2", async () => {
    const res = await request(server).post("/api/median_prime").send({ n: 2 });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Input must be greater than 2");
  });

  it("should handle case where only one prime exists below input (n=3)", async () => {
    const res = await request(server).post("/api/median_prime").send({ n: 3 });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("formattedMedianPrime");
    expect(res.body.formattedMedianPrime).toEqual("[2]");
  });

  it("should return error when no input is provided", async () => {
    const res = await request(server).post("/api/median_prime").send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Input must be a number");
  });

  it("should return error when no body is provided", async () => {
    const res = await request(server).post("/api/median_prime");
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Input must be a number");
  });

  it("should ignore extra fields in body", async () => {
    const res = await request(server)
      .post("/api/median_prime")
      .send({ n: 10, extra: "field" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("formattedMedianPrime");
    expect(res.body.formattedMedianPrime).toEqual("[3, 5]");
  });
});

describe("getPrimes", () => {
  it("should return correct primes for n = 10", () => {
    expect(getPrimes(10)).toEqual([2, 3, 5, 7]);
  });
});

describe("getMedian", () => {
  it("should return correct median for [2, 3, 5, 7]", () => {
    expect(getMedian([2, 3, 5, 7])).toEqual([3, 5]);
  });
});
