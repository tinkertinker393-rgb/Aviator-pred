# Aviator Predictor GitHub Actions Setup

This repo runs a full backend and a simple test in GitHub Actions (CI).  
It scrapes Aviator game sites for crash/multiplier values using robust selector logic.

## How it works

- `server.js` is the backend.
- `test.js` runs a test to check `/api/predict` for one platform (BETIKA).
- `.github/workflows/nodejs.yml` runs install and test on every push and PR.

## How to run locally

1. `npm install`
2. `npm start`
3. Open `index.html` in browser, or run `npm test` for backend test.

## CI/CD

- Every push/PR triggers the workflow (see `.github/workflows/nodejs.yml`).
- The workflow installs all dependencies, runs the backend, and runs a test.

## Troubleshooting CI

- Puppeteer runs with `--no-sandbox` and `--disable-setuid-sandbox` for CI.
- If scraping fails in CI, check selectors and site accessibility.

## Extending Tests

- Add more platforms and selectors in `server.js`.
- Expand `test.js` to test more platforms or prediction logic.