const customers = require("./customers");

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

module.exports = accountExistsByCpf;
