# Task App
#### Overview

Task app has been built using NextJS as frontend and NestJS as backend it uses MongoDB as database
Task app is deployed using vercel, and it is mobile responsive,

Check it live on: https://todo-client-akez9vbh5-jay-movaliyas-projects.vercel.app

Demo Video
https://www.loom.com/share/383cda44dccf4de9a4885dc5eaf107a5?sid=744ce94f-bb8f-47fa-bad5-82c0d879c8b0

## Features

- Sign up user
- Login user
- List todos
- Create new todo
- Update todo
- Delete todo
- Filter todo by status

## Installation

Dillinger requires [Node.js](https://nodejs.org/) run.
Clone repository and navigate to folder location

#### Server setup
Install the dependencies and devDependencies and start the server.
Create .env file in server folder and add below variables
```sh
DB_CONNECTION=<MONGODB_CONNECTION_URI>
PORT=9091
JWT_SECRET=<JWT_SECRET>
JWT_EXPIRY=<JWT_EXPIRY>
```
 Save .env file and run these commands
```sh
cd server
yarn install / npm install
yarn start:dev / npm start:dev
```
Your backend should be running on http://localhost:9091 port

#### Frontend
Create .env file in server folder and add below variables

```sh
NEXT_PUBLIC_API_URL=http//localhost:9091
```
Save .env file and run these commands
```sh
cd client
yarn install / npm install
yarn dev / npm dev
```

Your frontend should be running on http://localhost:3000 port.