const express = require("express");

const accountExistsByCpf = require("./utils/accountExistsByCpf");
const getBalance = require("./utils/getBalance");
const customers = require("./utils/customers");

const { v4: uuid } = require("uuid");
const nodeCpf = require("node-cpf");
const app = express();

app.use(express.json());

// All the routes belows would have the middleware
//app.use(accountExistsByCpf)

/**
 * cpf - string
 * name - string
 * id - uuid
 * statement []
 */

app.get("/account", accountExistsByCpf, (req, res) => {
  const { customer } = req.body;
  return res.status(201).json(customer);
});

app.post("/account", (req, res) => {
  const { cpf, name } = req.body;
  const isValid = nodeCpf.validate(cpf);

  if (!cpf || !isValid) {
    return res.status(400).send({
      error: "Provide a valid CPF",
    });
  }

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlreadyExists) {
    return res.status(400).send({
      error: "Customer already exists",
    });
  }

  const newAccount = {
    id: uuid(),
    cpf,
    name,
    statement: [],
  };
  customers.push(newAccount);
  res.status(200).send(newAccount);
});

app.put("/account", accountExistsByCpf, (req, res) => {
  const { customer, name } = req.body;
  if (!name) {
    return res.status(400).json({
      error: "Name is required",
    });
  }
  customer.name = name;
  res.status(200).json(customer);
});

app.delete("/account", accountExistsByCpf, (req, res) => {
  const { customer } = req.body;

  // Delete method 1
  // customers = customers.filter((item) => item.id !== customer.id);

  // Delete method 2
  const findExactCustomer = customers.findIndex(
    (item) => item.cpf === customer.cpf
  );
  customers.splice(findExactCustomer, 1);

  res.status(200).json({
    success: "Account succesfully deleted",
    customers,
  });
});

app.get("/statement", accountExistsByCpf, (req, res) => {
  const { customer } = req.body;

  return res.send(customer.statement);
});

app.get("/statement/date", accountExistsByCpf, (req, res) => {
  const { customer } = req.body;
  const { date } = req.query;

  if (!date) {
    return res.status(400).send({
      error: "Date is required",
    });
  }

  const dateFormat = new Date(date + " 00:00");

  const statement = customer.statement.filter((statement) => {
    return (
      statement.created_at.toDateString() ===
      new Date(dateFormat).toDateString()
    );
  });

  return res.status(200).json(statement);
});

app.post("/deposit", accountExistsByCpf, (req, res) => {
  const { description, amount, customer } = req.body;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit",
  };

  customer.statement.push(statementOperation);

  return res.status(201).send(statementOperation);
});

app.post("/withdraw", accountExistsByCpf, (req, res) => {
  const { amount, customer } = req.body;
  const balance = getBalance(customer.statement);

  if (balance < amount) {
    return res.status(400).json({ error: "Insufficient funds" });
  }

  const statementOperation = {
    amount,
    created_at: new Date(),
    type: "debit",
  };

  customer.statement.push(statementOperation);

  return res.status(201).json(statementOperation);
});

app.get("/balance", accountExistsByCpf, (req, res) => {
  const { customer } = req.body;
  const balance = getBalance(customer.statement);

  return res.status(200).json(balance);
});

app.listen(3333, () => {
  console.log("🚀 Listening on port 3333");
});
