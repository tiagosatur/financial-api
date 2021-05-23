# Financial API :moneybag:

With this api you can create/update/delete an account. Using the user CPF you can make a deposit; make a withdraw; get user balance get all user transactions and transactions by date.

This app was developed for study purposes.

## Run :running:

`yarn install`

`yarn dev`

## Stack :bowtie:

- Javascript
- NodeJS
- ExpressJS
- Nodemon
- Yarn

## Concepts :bulb:

- Rest API
- HTTP Methods
- Route middlewares
- Separation of concerns
- JSON

## Requirements :heavy_check_mark:

- [x] It must be possible to create an account
- [x] It must be possible to get the customer's bank statement
- [x] It must be possible to make a deposit
- [x] It must be possible to make a withdrawal
- [x] It must be possible to retrieve the customer's bank statement by date
- [x] It must be possible to update customer's account name
- [x] It must be possible to get custormer's account data
- [x] It must be possible to delete account
- [x] It must be possible to get customer's balance

## Business rules :briefcase:

- [x] It must not be possible to register an account when CPF already exists
- [x] It must not be possible to search customer's bank statement of a non existing account
- [x] It must not be possible to make a deposit in a non existing account
- [x] It must not be possible to make a withdrawal in a non existing account
- [x] It must be possible to make a withdrawal when the balance is insufficient
- [x] It must be possible to delete just existings accounts

## API Documentation :page_with_curl:

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
