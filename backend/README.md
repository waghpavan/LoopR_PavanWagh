# TypeScript Backend Application

This is a minimal TypeScript backend application that implements JWT authentication and provides a route to fetch all transactions from a MongoDB database.

## Project Structure

```
ts-backend-app
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
├── README.md
├── db.ts
├── index.ts
├── auth.ts
├── transaction.ts
```

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd ts-backend-app
   ```

2. **Install Dependencies**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   DATABASE_URL=mongodb://<username>:<password>@localhost:27017/<dbname>
   ```

4. **Compile TypeScript**
   To compile the TypeScript files, run:
   ```bash
   npx tsc
   ```

5. **Run the Application**
   Start the server using:
   ```bash
   npm start
   ```

## Usage

- **Authentication**
  - **Sign Up**: POST `/auth/signup`
  - **Sign In**: POST `/auth/signin`

- **Fetch Transactions**
  - **Get All Transactions**: GET `/transactions`

## Dependencies

- Express: Web framework for Node.js
- Mongoose: MongoDB object modeling tool
- Zod: TypeScript-first schema declaration and validation
- JSON Web Token: For secure authentication

## License

This project is licensed under the MIT License.