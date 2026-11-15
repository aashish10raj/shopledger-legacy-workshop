# ShopLedger

ShopLedger is a lightweight internal point-of-sale application for a retail and wholesale kirana shop. It records orders, tracks inventory, calculates GST and coupon discounts, maintains customer credit accounts (Khata), and generates printable invoices.

## Features

- Product catalog with sellable-stock and reservation visibility
- Order history with search, status, and date-range filters
- HSN-based GST calculation with CGST/SGST splits
- Coupon validation and capped discounts
- Customer Khata credit limits, balances, and settlements
- Dashboard, stock summary, and invoice-versus-ledger reconciliation
- Printable HTML tax invoices

## Getting Started

Requires Node.js and npm.

```bash
npm install
npm start
```

Open `http://localhost:3000`. Set `PORT` to use another port:

```bash
PORT=3100 npm start
```

## Tests

Run the Node.js test runner directly:

```bash
node --test
```

The test suite covers order date sorting/filtering and Khata settlement amount handling. The `npm test` script is a legacy placeholder and is not the test command for this repository.

## Project Layout

```text
server.js       Express entry point and route registration
routes/         HTTP handlers for products, orders, customers, and reports
lib/            Pricing, tax, inventory, ledger, invoice, and storage logic
public/         Browser UI (HTML, CSS, and JavaScript)
data/db.json    JSON-backed application data
config.js       Shop details, GST slabs, coupon rules, and defaults
test/           Node.js regression tests
```

## Data and Security

`data/db.json` is rewritten when orders and settlements are saved. Back it up before experimenting with live data. The application is intended for trusted internal use: it does not provide user authentication, and configuration currently contains administrative settings. Do not expose it directly to the public internet or commit real customer data or secrets.

## Documentation

See [Repository Guidelines](AGENTS.md) for contributor conventions and [`docs/shopledger-architecture.png`](docs/shopledger-architecture.png) for the architecture diagram.
