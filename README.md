# Leet Cards, the API

test

Leet Code is an application designed to help software engineers study for common technical interview questions.

This API is deloyed to Heroku. The host name is https://leet-cards.herokuapp.com

## Technologies Used
This API was built in [Node.js](https://nodejs.org/) and [TypeScript](https://www.typescriptlang.org/) using the [express](https://expressjs.com/) framework. A [PostgreSQL](https://www.postgresql.org/) database is utilized.

## Security
* An API key is required, and is kept secret using [dotenv](https://www.npmjs.com/package/dotenv)
* Client requests are restricted to [the front-end application](https://github.com/alexmkio/leet-cards/) with the use of [cors](https://www.npmjs.com/package/cors)
* [Express Rate Limit](https://www.npmjs.com/package/express-rate-limit) is used to help protect against brute force/DDoS attacks
* [Helmet](https://www.npmjs.com/package/helmet) is used to secure HTTP headers

## Headers
* All GET requests should have the following headers:
```
{
"Content-Type": "application/json"
}
```
* All POST, PUT, and DELETE requests should have the following headers:
```
{
"Content-Type": "application/json",
"apiKey": "mySecret-NeverTelling-:p"
}
```

## Endpoints
<table>
  <tr>
    <td align="center">Description</td>
    <td align="center">Path</td>
    <td align="center">Method</td>
    <td align="center">Body Required for Request</td>
    <td align="center">Sample Successful Response</td>
  </tr>
  <tr>
    <td>Get all flash cards</td>
    <td>/cards/</td>
    <td>GET</td>
    <td>none</td>
    <td>An array of all flash card objects</td>
  </tr>
  <tr>
    <td>Get a single flash card</td>
    <td>/cards/:id</td>
    <td>GET</td>
    <td>none</td>
    <td>A single flash card object</td>
  </tr>
  <tr>
    <td>Create a new flash card</td>
    <td>/cards/</td>
    <td>POST</td>
    <td>{ question: "string", answer: "string", side: "string", categories: [ "string", ... ] }</td>
    <td>A new flash card object</td>
  </tr>
  <tr>
    <td>Update an existing flash card</td>
    <td>/cards/:id</td>
    <td>PUT</td>
    <td>{ answer: "string" }</td>
    <td>"The answer was updated!"</td>
  </tr>
  <tr>
    <td>Delete an existing flash card</td>
    <td>/cards/:id</td>
    <td>DELETE</td>
    <td>none</td>
    <td>"The card has been deleted!"</td>
  </tr>
</table>

### Shape Of A Flash Card Object
```
{
  "id": "number",
  "question": "string",
  "answer": "string",
  "side": "string",
  "categories": [
      "string",
      ...
  ]
}
```

## Install
1. Clone down this repository `git clone https://github.com/alexmkio/leet-cards-api`
2. CD into your local clone `cd leet-cards-api`
3. Install project dependencies `npm install`
4. Run `npm start`

## Contributors
This application was built by [Alex Kio](https://github.com/alexmkio/); a Front End Engineering alum from the [Turing School of Software and Design](https://turing.io/).
