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

  req.customer = customer;

  return next();
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
  const { customer } = req;

  return res.send(customer.statement);
});

app.post("/deposit", accountExistsByCpf, (req, res) => {
  const { description, amount } = req.body;
  const { customer } = req;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit",
  };

  customer.statement.push(statementOperation);

  return res.status(201).send(statementOperation);
});

app.listen(3333, () => {
  console.log("🚀 Listening on port 3333");
});
