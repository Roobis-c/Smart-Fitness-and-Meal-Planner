<p align="center">
  <img width="100" height="100" alt="smartfit (2)" style="float:left" src="https://github.com/user-attachments/assets/77445f60-ae07-4fa9-a0d6-306957aabdfd" />
</p>

<h1 align="center">Smart fitness routine and meal planner</h1>





A **full-stack fitness management web application** designed to help users track workouts, manage nutrition, and monitor personal fitness progress—all in one place. The platform includes a secure admin panel for managing users, assigning personalized workout and meal plans, and maintaining detailed fitness profiles. Built with a modern frontend and a scalable backend architecture, the application focuses on clean UI, efficient data handling, and real-world fitness planning workflows.

## 📌 Features

### 👤 Admin Module
* Create new users
* Update user profiles (age,height, weight)
* Manage workout plans ,Meal plan, Track progress
* View all users
* Delete users

### 🧑‍💻 User Module
* View personal profile
* Track height, weight, and goals
* 7‑Day workout plan and Meal Plan with completion tracking
* AI trainer (Can Ask doubt)
* Progress visualization



## 🛠️ Tech Stack

### Frontend

* Angular (Standalone Components)
* Angular Material UI
* TypeScript
* HTML5 / CSS3

### Backend

* Node.js
* Express.js
* TypeScript
* MySQL
* Express‑Session (authentication)

---
##  🏗️ Project Architecture
<div align="center">
  <img width="620" height="400" alt="architecture" src="https://github.com/user-attachments/assets/417130c1-3431-4e0d-bf59-38adbb6bca7a" />
</div>







## 📂 Project Structure

```

Smart fitness routine and meal planner
│
├── backend
│   ├── src
│   │   ├── routes
│   │   ├── controllers
│   │   ├── config
|   |   ├── app.ts
│   │   └── server.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── package-lock.json
│
├── frontend
|   ├── public
|       ├── assets
│   ├── src
│   │   ├── app
│   │   └── index.html
│   ├── angular.json
│   ├── package.json
│   ├── tsconfig.json
│   └── package-lock.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm
- MySQL Server
- Angular CLI (for frontend)


## 🔧 Backend Setup

```bash
cd backend
npm install
````

### Configure Database

* Create a MySQL database
* Update DB credentials in:

```
backend/src/config/db.ts
```

### Run Backend

```bash
npm run dev
```

Backend will start at:

```
http://localhost:5001
```


## 🎨 Frontend Setup

```bash
cd frontend
npm install
```

### Run Frontend

```bash
ng serve
```

Frontend will start at:

```
http://localhost:4200
```

> Note: `.angular` and `node_modules` folders are automatically generated when running `npm install`.

---

## 🔐 Authentication

* Admin and User login uses **session‑based authentication**
* Session expiry: **3 hours**
* Protected admin routes and User routes

---

## 🗄️ Database Schema (MySQL)

Use the following SQL commands to create the required database and tables for this project.

```sql
CREATE DATABASE smart_fitness;
USE smart_fitness;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,

  age INT,
  gender VARCHAR(10),
  height INT,
  weight INT,

  goal ENUM('weight_loss', 'muscle_gain', 'maintenance') NOT NULL,
  user_role ENUM('user','admin') DEFAULT 'user',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE workout_meal_plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  day ENUM('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'),

  exercises JSON,
  meals JSON,
  target_calories INT,
  meal_completed INT,
  completed_status JSON,

  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## 📡 API Endpoints (Complete Reference)

### 🔑 Authentication APIs

| Method | API Route          | Purpose                                                  |
| ------ | ------------------ | -------------------------------------------------------- |
| POST   | /api/auth/register | Register a new user account                              |
| POST   | /api/auth/login    | Login user and create session                            |
| GET    | /api/auth/me       | Fetch logged-in user profile details                     |
| PUT    | /api/auth/profile  | Update user profile and regenerate plans if goal changes |

### 👤 Admin APIs

| Method | API Route                 | Purpose                                    |
| ------ | ------------------------- | ------------------------------------------ |
| POST   | /api/admin/login          | Login admin and start admin session        |
| GET    | /api/admin/users          | Get all users for admin dashboard          |
| POST   | /api/admin/users          | Admin creates a new user                   |
| GET    | /api/admin/users/:id      | Get specific user profile and plans        |
| PUT    | /api/admin/users/profile  | Admin updates user profile and goal        |
| PUT    | /api/admin/users/:id/plan | Admin updates workout/meal plan for a user |
| DELETE | /api/admin/users/:id      | Delete user and all related data           |

### 🏋️ Workout APIs

| Method | API Route                | Purpose                                        |
| ------ | ------------------------ | ---------------------------------------------- |
| GET    | /api/workouts            | Get weekly workout plan with completion status |
| PUT    | /api/workouts/exercise   | Update completion status of an exercise        |
| PUT    | /api/workouts/reset-week | Reset weekly workout progress                  |

### 🍽️ Meal APIs

| Method | API Route             | Purpose                                      |
| ------ | --------------------- | -------------------------------------------- |
| GET    | /api/meals            | Get weekly meal plan with calories           |
| PUT    | /api/meals/meal       | Update meal completion and consumed calories |
| PUT    | /api/meals/reset-week | Reset weekly meal progress                   |


### 🤖 AI Integration API

| Method | API Route                                                                                                                                                                            | Purpose                                      |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| POST   | /api/ask-ai | Request the backend to communicate with AI |
| POST   | [https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent](https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent) | AI-based fitness guidance using user profile |


*Thank you



