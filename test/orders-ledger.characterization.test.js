var test = require('node:test');
var assert = require('node:assert/strict');

var orders = require('../lib/orders');
var ledger = require('../lib/ledger');

function order(id, date) {
  return { id: id, date: date, customer: 'Walk-in', coupon: '' };
}

test('orders.list sorts DD/MM/YYYY dates newest first', function () {
  var db = {
    orders: [
      order(1008, '15/03/2022'),
      order(1004, '30/01/2022'),
      order(1001, '28/12/2021')
    ]
  };

  assert.deepEqual(
    orders.list(db, { status: 'all' }).map(function (o) { return o.id; }),
    [1008, 1004, 1001]
  );
});

test('orders.list includes only orders within an ISO date range', function () {
  var db = {
    orders: [
      order(1001, '28/12/2021'),
      order(1004, '30/01/2022'),
      order(1006, '18/02/2022'),
      order(1008, '15/03/2022')
    ]
  };

  assert.deepEqual(
    orders.list(db, { from: '2022-02-01', to: '2022-02-28' })
      .map(function (o) { return o.id; }),
    [1006]
  );
});

test('ledger.recordSettlement treats a string amount as a numeric settlement', function () {
  var meera = {
    id: 1,
    name: 'Meera Joshi',
    openingBalance: 450,
    totalBilled: 1982.01,
    totalSettled: 1200
  };
  var db = {
    customers: [meera],
    settlements: [],
    nextSettlementId: 505
  };

  var result = ledger.recordSettlement(db, 1, '500', 'upi', 'characterization');

  assert.equal(result.ok, true);
  assert.equal(meera.totalSettled, 1700);
  assert.equal(meera.balance, 732.01);
  assert.equal(result.settlement.amount, 500);
  assert.equal(db.settlements.length, 1);
});

test('ledger.recordSettlement recovers a previously string Total Settled value', function () {
  var customer = {
    id: 2,
    name: 'Existing String Balance',
    openingBalance: 0,
    totalBilled: 2000,
    totalSettled: '1200'
  };
  var db = { customers: [customer], settlements: [], nextSettlementId: 1 };

  ledger.recordSettlement(db, 2, '500');

  assert.equal(customer.totalSettled, 1700);
  assert.equal(customer.balance, 300);
});

test('ledger.recordSettlement rejects a nonnumeric settlement before mutating a customer', function () {
  var customer = {
    id: 3,
    name: 'Invalid Amount Customer',
    openingBalance: 0,
    totalBilled: 1000,
    totalSettled: 100
  };
  var db = { customers: [customer], settlements: [], nextSettlementId: 1 };

  var result = ledger.recordSettlement(db, 3, 'abc');

  assert.deepEqual(result, { ok: false, error: 'Settlement amount must be greater than zero' });
  assert.equal(customer.totalSettled, 100);
  assert.equal(db.settlements.length, 0);
});
