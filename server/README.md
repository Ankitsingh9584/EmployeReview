# Simple Performance Review App (MERN)

This is a basic MERN stack application where employees can give feedback on each other's performance reviews.

The project is intentionally kept simple (no auth, no complex UI) just to demonstrate core functionality.

---

## Tech Used

* MongoDB
* Express
* React
* Node.js

---

## Project Structure

```
project/
  backend/
    models/
    routes/
    server.js
  frontend/
    src/
```

---

## Features

### Admin

* Add employee
* View employees
* Create performance review
* Update review
* Delete review
* Assign employees to review

### Employee

* View assigned reviews
* Submit feedback

---

## Setup Instructions

### 1. Clone project

```
git clone <your-repo-link>
cd project
```

---

## Backend Setup

```
cd backend
npm install
```

### Start backend

```
npm start
```

Server runs on:

```
http://localhost:5000
```

---

## Frontend Setup

```
cd frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

## MongoDB Setup

Make sure MongoDB is running locally.

Default connection used:

```
mongodb://127.0.0.1:27017/reviewApp
```

---

## Important Notes

* No authentication implemented (admin/employee is just UI separation)
* Data is stored in 3 collections:

  * employees
  * reviews
  * feedbacks

---

## API Endpoints

### Employee

* `POST /emp/add`
* `GET /emp/all`

### Review

* `POST /review/add`
* `GET /review/all`
* `POST /review/update`
* `POST /review/delete`
* `POST /review/assign`
* `GET /review/my/:id`

### Feedback

* `POST /feedback/add`
* `GET /feedback/review/:id`

---

## Known Limitations

* No login system
* No validation
* Basic UI only
* Manual employee ID input

---

## Possible Improvements

* Add authentication (JWT)
* Improve UI
* Add validation
* Prevent duplicate assignments
* Add ratings system

---

## How to Use

1. Add employees (Admin)
2. Create review for employee
3. Assign other employees
4. Use employee ID to login (manually)
5. Submit feedback

---

## Author

Simple implementation for learning/demo purpose.
