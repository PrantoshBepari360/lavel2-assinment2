# Project Name: assinment-2

## Description

- Create a new Node.js Express project.
- Set up a MongoDB database using Mongoose for storing user and order data.

## Version

1.0.0

## Author

Prantosh Bepari

## License

ISC

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [License](#license)

## Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start the server in production mode
npm run start-prod

# Start the server in development mode
npm run start-dev

## Scripts

- build: Compile TypeScript files.
- start-prod: Start the server in production mode.
- start-dev: Start the server in development mode.
- lint: Run ESLint to check for linting issues.
- lint-fix: Run ESLint to fix fixable linting issues.
- prettier: Run Prettier to format code.
- prettier-fix: Run Prettier to fix formatting issues.
- test: Placeholder for running tests.

## Dependencies

@types/cors: ^2.8.16
@typescript-eslint/eslint-plugin: ^6.11.0
@typescript-eslint/parser: ^6.11.0
bcrypt: ^5.1.1
cors: ^2.8.5
dotenv: ^16.3.1
eslint: ^8.54.0
eslint-config-prettier: ^9.0.0
express: ^4.18.2
mongoose: ^8.0.1
prettier: ^3.1.0
ts-node-dev: ^2.0.0
validator: ^13.11.0

## Dev Dependencies

@types/bcrypt: ^5.0.2
@types/express: ^4.17.21
@types/node: ^20.9.2
@types/validator: ^13.11.7
typescript: ^5.2.2

## Route Endpoint

1. Create a new user
   Endpoint: POST /api/users

2. Retrieve a list of all users
   Endpoint: GET /api/users

3. Retrieve a specific user by ID
   Endpoint: GET /api/users/:userId

4. Update user information
   Endpoint: PUT /api/users/:userId

5. Delete a user
   Endpoint: DELETE /api/users/:userId

## Github Link

Github Link: https://github.com/PrantoshBepari360/lavel2-assinment2

## Live Link

Live link: https://assinment-2-rho.vercel.app
```
