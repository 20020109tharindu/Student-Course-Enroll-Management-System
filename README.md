# Student Course Enrollment Management System

A full-stack web application designed to manage student enrollments, allowing administrators to view, add, edit, and delete student records.

## Features

- **Dashboard**: View a list of all students with their enrollment status.
- **Search & Filter**: Search students by name or filter by course.
- **Student Management**: Add new students, update existing details, and delete records.
- **Status Tracking**: Visual indicators for student status (Active, Pending, Completed, Dropped).
- **Responsive Design**: Built with Tailwind CSS for a modern, mobile-friendly interface.

## Tech Stack

- **Frontend**: React.js (Vite), Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local or Atlas)

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Student-Course-Enroll-Management-System
```

### 2. Backend Setup
Navigate to the backend folder and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/student_mgmt
# Or use your MongoDB Atlas connection string
```

Start the backend server:
```bash
npm start
```
The server will run on `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal, navigate to the frontend folder, and install dependencies:
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```
The application will open at `http://localhost:5173`.

## API Endpoints

- `GET /api/students` - Get all students (supports `?name=` and `?course=` query params)
- `POST /api/students` - Create a new student
- `PUT /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student

## Project Structure

```
├── backend/
│   ├── config/         # Database configuration
│   ├── controllers/    # Route logic
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   └── server.js       # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── services/   # API service calls
│   │   └── App.jsx     # Main component
│   └── tailwind.config.js
│
└── README.md
```
