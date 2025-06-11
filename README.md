# Wallet Backend API

A modular backend wallet system built using **Node.js**, **Express.js**, and **MySQL (via Sequelize ORM)**. Supports wallet setup, credit/debit transactions, fetching wallet details, and paginated transaction history.

---

## Web App Link



---

## Features

- Setup a new wallet with an initial balance
- Perform credit/debit operations on the wallet
- Fetch recent wallet transactions (with pagination)
- Retrieve wallet details
- Input validation with `express-validator`
- Centralized error handling
- Modular and scalable code structure
- CORS enabled

---

## Technologies Used

- **Express.js** - Framework for building scalable server-side applications
- **Sequelize** - ORM for database operations
- **MySQL** - Database for storing wallet and transaction data

---

## Setup and Installation

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MySQL

---

#### Installation Steps
1. Clone the repository:
```
git clone https://github.com/your-repository/document-management.git
cd wallet-system
```
2. Install dependencies:
```
npm install
```
3. Set up environment variables: Create a .env file in the root directory and configure it with your settings (refer to the Environment Variables section).
4. Run MySQL on your local system.

---

## Running the Application
### Start the Application
```
npm run dev
```
The server will start at http://localhost:3000.

---

## Environment Variables

Create a **.env.development** file in the project root with the following variables:
```
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=your_password
DB_NAME=wallet_db
```

---

## Folder Structure

wallet-system <br>
├── config <br>
| --- ├── constants.js <br>
├── controllers <br>
| --- ├── transaction.controller.js <br>
| --- ├── wallet.controller.js <br>
├── database <br>
| --- ├── sequelize.js <br>
├── middlewares <br>
| --- ├── errorHandler.js <br>
| --- ├── validateRequest.js <br>
├── models <br>
| --- ├── transaction.model.js <br>
| --- ├── wallet.model.js <br>
├── routes <br>
| --- ├── wallet.routes.js <br>
├── utils <br>
| --- ├── helpers.js <br>
├── validators <br>
| --- ├── wallet.validator.js <br>
├── .gitignore <br>
├── app.js <br>
├── package-lock.json <br>
├── package.json <br>
├── server.js <br>
├── README.md <br>

---

## 🧾 API Endpoints

### 1. Setup Wallet

- **POST** `/setup`
```json
Request Body:
{
  "balance": 20.5612, (optional)
  "name": "John Doe"
}
Response Body:
{
  "id": "...",
  "name": "John Doe",
  "balance": "20.5612",
  "transactionId": "...",
  "date": "..."
}
```

### 2. Credit/Debit Transaction
- **POST** `/transact/:walletId`
```json
Request Body:
{
  "amount": 10.5032, (Positive for credit, negative for debit)
  "description": "Top-up"
}
Response Body:
{
  "balance": "31.0644",
  "transactionId": "..."
}
```

### 3. Fetch Transactions
- **GET** `/transactions?walletId=<walletId>&skip=0&limit=10`
```json
Response Body:
[
  {
    "id": "...",
    "walletId": "...",
    "amount": "10.0000",
    "balance": "30.0000",
    "description": "Recharge",
    "date": "...",
    "type": "CREDIT"
  },
  ...
]
```

### Get Wallet Details
- **GET** `/wallet/:id`
```json
Response Body:
{
  "id": "...",
  "name": "John Doe",
  "balance": "30.0000",
  "date": "..."
}
```

---

<samp>***Enjoy Learning!!!***</samp>

---

