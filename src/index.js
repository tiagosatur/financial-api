const express = require("express");
const { v4: uuid } = require("uuid");
const nodeCpf = require("node-cpf");
const app = express();
app.use(express.json());

let customers = [];

function accountExistsByCpf(req, res, next) {
  const { cpf } = req.headers;

  if (!cpf) {
    return res.status(400).json({
      error: "CPF is required",
    });
  }

  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return res.status(400).json({
      error: "Customer not found",
    });
  }

  req.body.customer = customer;

  return next();
}

function getBalance(statement) {
  const balance = statement.reduce((total, operation) => {
    if (operation.type === "credit") {
      return total + operation.amount;
    }
    return total - operation.amount;
  }, 0);

  return balance;
}

// All the routes belows would have the middleware
//app.use(accountExistsByCpf)

/**
 * cpf - string
 * name - string
 * id - uuid
 * statement []
 */

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

app.get("/statement", accountExistsByCpf, (req, res) => {
  const { customer } = req.body;

  return res.send(customer.statement);
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
  console.log("🚀 ~ balance", balance);

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

app.listen(3333, () => {
  console.log("🚀 Listening on port 3333");
});
