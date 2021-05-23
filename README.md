# Financial API

## Requirements

- [x] It must be possible to create an account
- [x] It must be possible to get the customer's bank statement
- [x] It must be possible to make a deposit
- [x] It must be possible to make a withdrawal
- [x] It must be possible to retrieve the customer's bank statement by date
- [x] It must be possible to update customer's account name
- [x] It must be possible to get custormer's account data
- [x] It must be possible to delete account
- [x] It must be possible to get customer's balance

## Business rules

- [x] It must not be possible to register an account when CPF already exists
- [x] It must not be possible to search customer's bank statement of a non existing account
- [x] It must not be possible to make a deposit in a non existing account
- [x] It must not be possible to make a withdrawal in a non existing account
- [x] It must be possible to make a withdrawal when the balance is insufficient
- [x] It must be possible to delete just existings accounts

## API Documentation

Base url: `http://localhost:3333`

| Method | Route             | Headers | Body                                                                    | Parameters       | Return                                        |
| ------ | ----------------- | ------- | ----------------------------------------------------------------------- | ---------------- | --------------------------------------------- |
| GET    | `/account`        | cpf     | -                                                                       | -                | Object: id, name, cpf, statement[]            |
| POST   | `/account`        | -       | <pre lang="json">{ "cpf": "22925290094", "name": "Joseph Satur" }</pre> | -                | Object: id, name, cpf, statement[]            |
| PUT    | `/account`        | cpf     | <pre lang="json">{ "name": "Joseph Satur" }</pre>                       | -                | Object: id, name, cpf, statement[]            |
| DELETE | `/account`        | cpf     | -                                                                       | -                | Object: success, remainingCustomers[]         |
| GET    | `/balance`        | cpf     | -                                                                       | -                | Number                                        |
| POST   | `/withdraw`       | cpf     | <pre lang="json">{ "amount": 200 }</pre>                                | -                | Object: amount, created_at, type              |
| POST   | `/deposit`        | cpf     | <pre lang="json">{ "description": "Book sell", "amount": 50 }</pre>     | -                | Object: amount, created_at, type, description |
| GET    | `/statement`      | cpf     | -                                                                       | -                | Array: amount, created_at, type, description  |
| GET    | `/statement/date` | cpf     | -                                                                       | ?date=2021-05-23 | Array: amount, created_at, type, description  |
