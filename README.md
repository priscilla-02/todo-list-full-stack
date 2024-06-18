# To-do List 📝

## Welcome 👋🏻

---

## Overview

This project is a full-stack application with a front-end server developed using React.js/Next.js and TypeScript, styled with Tailwind CSS. The backend RESTful API is designed with Express.js in Node.js and written in TypeScript.

This setup utilizes Next.js for server-side rendering and static generation capabilities on the frontend, and leverages the Express.js framework for API development and backend logic. The backend employs Prisma as an ORM tool for MySQL databases, facilitating smooth database operations, migrations, and schema management. Additionally, it integrates Zod for validating incoming request payloads within Express.js routes, ensuring robust data integrity and effective error handling. A simple unit-testing demo for the backend is demonstrated using the Jest testing library as an example.

## User Functionality

After successful registration and login with authentication, users can:

**Create To-Do Lists** Add items to their to-do lists.
**Mark Items as Complete/Incomplete:** Toggle the status of to-do list items.
**Delete To-Do List Items:** Remove items from their to-do lists in a secure environment.

---

## Getting Started

## Prerequisites

-   Node.js (v 18.17.0 or above)
-   npm or yarn
-   MySQL Database

## Setup Instructions:

**1. Clone the repository:**a

```
   git clone https://github.com/priscilla-02/todo-list-full-stack.git
```

**2. Install dependencies:**

Run `npm istall` from your terminal in both backend and frontend folders to install the required dependencies

**3. Set up the database:**

-   Ensure MySQL is running.
-   Create a .env file in the root of the project with the following environment variables:

```
   DATABASE_URL="mysql://user:password@localhost:3306/databaseName"
```

**4. Run database migrations::**

```
npx prisma migrate dev
```

**5. Start the development server:**

To run the app locally, run the command `npm run dev` in both backend and frontend folders.
The front-end server will open at http://localhost:3000, and the back-end API will be accessible at http://localhost:5000 in your browser.

**6. Have fun exploring! Welcome any feedback and enhancement suggestions**
