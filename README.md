# lendsqr-task-api
A NodeJS API mimicking basic banking/financial transactions such as creating an account, making deposits, withdrawals and transfer etc. 

<div align="center">
   Solution for a challenge from  <a href="https://lendsqr.com" target="_blank">lendsqr - Backend Engineer Challenge</a>.
   Hosted at: <a href="https://lendsqr-api-task.herokuapp.com/" target="_blank"> www.lendsqr-api-task.herokuapp.com </a>
</div>

<div align="center">
  <h3>
    <a href="https://www.postman.com/lexnwimue/workspace/my-workspace/collection/21509773-0a6f696e-1fdb-4d09-b146-b8b3294b9e33">
      Postman Collection Public URL
    </a>
  </h3>
</div>

<!-- TABLE OF CONTENTS -->

## Contents

- [Overview](#overview)
- [Built With](#built-with)
- [Features](#features)
- [How to use](#how-to-use)
- [Contact](#contact)

<!-- OVERVIEW -->

## Overview

I expected this app to be an easy breeze through, because I already pictured the entire project structure in my head. It actually turns out I was right. It didn't take up 
to an hour writing the API and testing it out. However, for some technical and personal reasons, I could not include tests for the API. This was partly due to the time
constrain as well. To show the working process of the app, I have included a link to a video showing the use of the API here ...



### Built With

<!-- This section should list any major frameworks that you built your project using. Here are a few examples.-->

- [JavaScript](https://javascript.com/)
- [NodeJS](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://mongodb.com/)

## Features
The local version of the API runs on localhost:4000, and the API provides different endpoints for accessing the application. The include:
- /signup
- /deposit
- /withdraw
- /transfer
- /account

## How To Use

<!-- Example: -->

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/lexNwimue/lendsqr-task-api.git

# Install dependencies
$ npm install
# Run the app
$ npm start
```

Each of the endpoints listed above requires x-www-form-urlencoded body data to be provided along with them. The primary key for each document is the
email field. 
For the signup endpoint you can provide the following data
```javascript
{
  email: ....
  name: ....
  amount: <Number> [Optional]
}
```


The amount field is optional and defaults to 0 if it isn't provided. All other fields are required. The system checks for the existence 
of the provided email in the database and throws an error if such email exists. 

For the /deposit endpoint you can provide the following data
```javascript
{
  email: ....
  amount: <Number>
}
```

The email provided must exist before the operation can be carried out successfully. And non-negative numerical amounts must be 
provided, otherwise the system prompts the user to enter a valid amount. 

For the /withdraw endpoint you can provide the following data
```javascript
{
  email: ....
  amount: <Number>
}
```

Works exactly like the /deposit endpoint and is in fact implemented by the same function, except that the amount is deducated 
from the user balance. An additional action is that it allows only withdrawals less than the user's current balance, 
otherwise it responds with an 'Insufficient Funds' message. 

For the /transfer endpoint you can provide the following data
```javascript
{
  sender: <sender email>
  receiver: <receiver email>
  amount: <Number>
}
```

The emails provided must be valid before the operation can be carried out successfully. On verification of both emails 
the amount entered is validated and the same checks for deposits and withdrawals are performed, because a transfer is the embodiment
of a withdrawal action (from the senders account) and a deposit action (to the withdrawer's account). 


For the /account endpoint you can provide the following data
```javascript
{
  email: ...
}
```
This endpoint returns the complete account details of the email specified if valid, and can be used to confirm if other transactions
were successful by checking if there is a change in balance
