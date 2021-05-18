const express = require("express");
const { v4: uuid } = require("uuid");
const nodeCpf = require("node-cpf");
const app = express();
app.use(express.json());

let customers = [];

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

app.get("/statement/:cpf", (req, res) => {
  const { cpf } = req.body;

  const customer = customers.find((customer = customer.cpf === cpf));

  return res.send(customer.statement);
});

app.listen(3333, () => {
  console.log("🚀 Listening on port 3333");
});
