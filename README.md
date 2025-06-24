# Todo - Task Management Application

A modern task management application built with the MERN stack (MongoDB, Express.js, React, Node.js) that helps users organize their tasks and notes efficiently.

## Live Link:
https://what-matters-frontend.vercel.app/

## Features

- 🔐 User authentication (Login/Signup)
- ✏️ Create, Read, Update, Delete tasks
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS
- 🔒 Secure JWT authentication
- 🎯 Intuitive task organization

## Tech Stack

### Frontend
- React v19.1.0
- React Router DOM v7.6.0
- React Bootstrap v2.10.10
- Tailwind CSS v4.1.7
- React Icons v5.5.0
- Vite v6.3.5

### Backend
- Node.js
- Express.js v5.1.0
- MongoDB with Mongoose v8.15.0
- JWT for authentication
- bcryptjs for password hashing
- dotenv for environment variables

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd todo
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd frontend
npm install
```

4. Set up environment variables
Create a `.env` file in the backend directory with the following variables:
```
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Running the Application

1. Start the backend server
```bash
cd backend
npm run dev
```

2. Start the frontend development server
```bash
cd frontend
npm run dev
```

The application should now be running on:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## API Endpoints

### Authentication
- POST `/api/v1/user/register` - Register a new user
- POST `/api/v1/user/login` - Login user

### Tasks
- POST `/api/v1/list/addTask` - Create a new task
- PUT `/api/v1/list/updateTask/:id` - Update a task
- DELETE `/api/v1/list/deleteTask/:id` - Delete a task
- GET `/api/v1/list/getTasks` - Get all tasks for a user

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
