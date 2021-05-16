const express = require("express");
const { v4: uuid } = require("uuid");
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
  const id = uuid();

  const newAccount = {
    id,
    cpf,
    name,
    statement: [],
  };
  customers.push(newAccount);
  res.status(200).send(newAccount);
});

app.listen(3333, () => {
  console.log("🚀 Listening on port 3333");
});
