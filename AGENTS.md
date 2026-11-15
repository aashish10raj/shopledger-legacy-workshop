# Repository Guidelines

## Project Structure & Module Organization

ShopLedger is a small Express application with a browser-based POS interface.

- `server.js` configures Express, static assets, API routers, and invoice rendering.
- `routes/` contains HTTP handlers: products, orders, customers, and reports.
- `lib/` contains business logic. Keep stock logic in `inventory.js`, pricing/GST in `pricing.js` and `tax.js`, credit accounts in `ledger.js`, and JSON persistence in `store.js`.
- `public/` contains `index.html`, `js/app.js`, and CSS.
- `data/db.json` is the application database; treat it as business data, not a fixture.
- `config.js` holds shop metadata, GST slabs, inventory defaults, and coupon rules.

## Build, Test, and Development Commands

- `npm start` runs `node server.js` and serves the app on `PORT` or port `3000`.
- `npm test` currently exits with an error because no test suite has been added. Add tests before relying on this command in CI.
- `npm ls --depth=0` checks the installed top-level dependency versions without changing them.

There is no build step, linter, formatter, or test framework configured.

## Coding Style & Naming Conventions

Use the existing Node.js style: CommonJS (`require`, `module.exports`), `var`, semicolons, and two-space indentation. Keep route files thin: validate request input, call `lib/` functions, and return JSON. Use lower-case file names such as `order-history.js`; use camelCase for functions and variables.

Preserve the established data shapes (`products`, `orders`, `customers`, `settlements`, `auditLog`) and round money values to two decimals. Do not accept browser-supplied prices or tax rates as authoritative.

## Testing Guidelines

When adding tests, place them in `test/` and name them `*.test.js`. Cover order creation, stock boundaries, cancellation, khata charging/settlement, coupons, GST totals, and invoice reconciliation. Include a regression test for each fixed financial or inventory defect. Do not mutate the tracked `data/db.json` during tests; use a temporary database or isolated fixture.

## Commit & Pull Request Guidelines

Follow the history’s concise, imperative style: `support hsn gst slabs and coupon maxDiscount caps` or `add invoice reconciliation`. Keep each commit focused. PRs should explain user-visible behavior, list data/configuration changes, identify financial or inventory effects, and include screenshots for UI changes. Call out any migration or backup requirement for `data/db.json`.

## Security & Data Handling

Do not commit secrets, real customer data, or generated backups. Keep admin credentials out of source code, validate all write inputs, and escape user-controlled values rendered into HTML.
