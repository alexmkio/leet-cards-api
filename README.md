# Leet Cards, the API
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
    <td>Get all cards</td>
    <td>/cards/</td>
    <td>GET</td>
    <td>none</td>
    <td>an array of all family objects:<br />[ { id: 1, mod: 2, tests: [ 1, 2 ], title: "Kitties", datasets: [ "dataset #1", "dataset #2" ] }, ... ]</td>
  </tr>
  <tr>
    <td>Get a single test</td>
    <td>https://mythical-wars-api.herokuapp.com/tests/:id</td>
    <td>GET</td>
    <td>none</td>
    <td>A single test object:<br />{ id: 1, test_name: "orangeKittyNames", instructions: null, expected: "[`Tiger`, `Snickers`]", methods: ["`filter`","`reduce`"], family: 1 }</td>
  </tr>
  <tr>
    <td>Get all test attempts given a certain test and user # (route does not accomplish this currently)</td>
    <td>https://mythical-wars-api.herokuapp.com/attempts</td>
    <td>GET</td>
    <td>none</td>
    <td>An array of attempt objects:<br />[ { id: 1, user_id: 1, test_id: 1, passing: true, code: "testing", result: "not bad" } ]</td>
  </tr>
  <tr>
    <td>Create a new user</td>
    <td>https://mythical-wars-api.herokuapp.com/user</td>
    <td>POST</td>
    <td>{ user_name: "string", current_mod: number }</td>
    <td>A new user object:<br />{ id: number, user_name: "string", current_mod: number }</td>
  </tr>
  <tr>
    <td>Create a new family</td>
    <td>https://mythical-wars-api.herokuapp.com/families</td>
    <td>POST</td>
    <td>{ mod: number, title: "string", datasets: [ "dataset1", "dataset2" ] }</td>
    <td>A new family object:<br />{ id: number, mod: number, title: "string", datasets: [ "dataset1", "dataset2" ] }</td>
  </tr>
  <tr>
    <td>Create a new test</td>
    <td>https://mythical-wars-api.herokuapp.com/tests</td>
    <td>POST</td>
    <td>{ test_name: "string", instructions: "string", expected: "string", methods: [ "string1", "string2" ], family: number }</td>
    <td>A new test object:<br />{ id: number, test_name: "string", instructions: "string", expected: "string", methods: [ "string1", "string2" ], family: number }</td>
  </tr>
  <tr>
    <td>Create a new attempt</td>
    <td>https://mythical-wars-api.herokuapp.com/attempts</td>
    <td>POST</td>
    <td>{ user_id: number, test_id: number, passing: boolean, code: "string", result: "string" }</td>
    <td>A new attempt object:<br />{ id: number, user_id: number, test_id: number, passing: boolean, code: "string", result: "string" }</td>
  </tr>
  <tr>
    <td>Update an attempt</td>
    <td>https://mythical-wars-api.herokuapp.com/attempts/:id</td>
    <td>PUT</td>
    <td>{ passing: boolean, code: "string", result: "string" }</td>
    <td>"Attempt was updated!"</td>
  </tr>
  <tr>
    <td>Delete an attempt</td>
    <td>https://mythical-wars-api.herokuapp.com/attempts/:id</td>
    <td>DELETE</td>
    <td>none</td>
    <td>"Attempt was deleted!"</td>
  </tr>
</table>

## Install
1. Clone down this repository `git clone https://github.com/alexmkio/leet-cards-api`
2. CD into your local clone `cd leet-cards-api`
3. Install project dependencies `npm install`
4. Run `npm start`

## Contributors
This application was built by [Alex Kio](https://github.com/alexmkio/); a Front End Engineering alum from the [Turing School of Software and Design](https://turing.io/).
