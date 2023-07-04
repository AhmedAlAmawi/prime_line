# PrimeLine
Median Prime Number(s) Calculator

https://github.com/AhmedAlAmawi/prime_line/assets/64613884/f8327347-55c1-4ec5-a499-a86bad3ddb65

## Getting Started
Clone the app. ensure you have [Docker](https://docs.docker.com/get-started/) properly configured, with  [compose v2](https://docs.docker.com/compose/gettingstarted/) 

### Running Application
to run the application simple run the following script in the root directory:

```
docker compose up
```

### Testing Application
You can test the front end and back end individually run the snippet of script at the root directory of the codebase

Frontend:
```
cd client
npm run test
```

Backend:
```
cd server
npm run test
```

## Overview
overview of the stack and structure.

### Frontend
built with CRA [create react app: typescript](https://create-react-app.dev/docs/adding-typescript/) and [tailwind css](https://tailwindcss.com/).

```
├── components 
│   ├── **/*.tsx       # Common UI components for the application
│  
├── Hooks
│   ├── **/*.ts        # Custom hooks for handling requirements of the application 
│
├── App.tsx            # Parent Component
│
└── index.tsx          # Entry point to application
```


### Backend
built with [Express](https://expressjs.com/)

```
├── primeHelpers.ts    # helper utility functions
│
└── server.ts          # Entry point for server
```

### Algorithm
Prime-finding algorithms were researched to identify a suitable candidate to implement. [Sieve of Eratosthenes](https://www.geeksforgeeks.org/sieve-of-eratosthenes/) was considered and tested locally and identified to be a source of a bottleneck as it utilized large amounts of memory and took a long amount of time to compute for any number greater than 1M. [Sieve of Atkin](https://www.geeksforgeeks.org/sieve-of-atkin/) was ultimately considered the most suitable option for this implementation with less time complexity and less utilization of memory.

**Comparision**

Theoretical Time Complexity:
- Sieve of Eratosthenes: O(n log log n)
- Sieve of Atkin: O(n/log log n)

Local Testing (avg of 3):
| Limit | Sieve of Atkin | Sieve of Eratosthenes |
| -------- | -------- | -------- |
| 40000000  | 7.189s  | 8.852s  |
| 50000000  | 8.163s  | 44.682s |
| 60000000  | 12.456s  |  heap out of memory  |
| 70000000  | 14.367s  |  heap out of memory  |
| 80000000  | 15.159ss  |  heap out of memory  |



## BIO
- 4+ years of Production Node Experience
- 6+ years of Production React Experience
- Ahmed Al Amawi
