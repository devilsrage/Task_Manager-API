
# Task Manager API + Frontend (Node.js + Express + SQLite)

This is a simple **Task Manager project** built with **Node.js**, **Express**, and **SQLite**.  
It provides a REST API for managing tasks, a Bootstrap-styled frontend to interact with the API, and comprehensive **unit**, **integration**, and **API tests**.

---

## 🚀 Features

- RESTful API with Create, Read, Update, Delete (CRUD) operations
- SQLite file-based database (`tasks.db`) — no separate DB server needed
- Bootstrap frontend (HTML + JS) served by the same Express server
- Unit tests (mocked + real DB), integration tests, API tests
- 80%+ code coverage

---

## 📂 Project Structure

```
task-manager-sqlite/
├── server.js            # Express server + API routes + DB logic
├── index.html           # Frontend (Bootstrap + JS)
├── package.json         # Project config + dependencies
├── tasks.db             # SQLite DB file (auto-created at runtime)
├── tests/
│   ├── api.test.js      # API endpoint tests (Supertest)
│   ├── integration.test.js # Integration tests (real DB)
│   ├── unit.test.js     # Unit tests (non-mocked DB logic)
│   └── mocked.unit.test.js # Unit tests (mocked DB)
├── .gitignore           # Ignore node_modules, tasks.db, coverage
└── coverage.png         # Test coverage screenshot (add yours here)
```

---

## 📌 API Endpoints

### `GET /api/tasks`
➡ Get all tasks  
**Example response**
```json
[
  {
    "id": 1,
    "title": "Sample Task",
    "description": "Example description",
    "completed": 0
  }
]
```

---

### `GET /api/tasks/:id`
➡ Get a task by ID  
**Example response**
```json
{
  "id": 1,
  "title": "Sample Task",
  "description": "Example description",
  "completed": 0
}
```

---

### `POST /api/tasks`
➡ Create a new task  
**Request body**
```json
{
  "title": "New Task",
  "description": "Details of the task"
}
```
**Example response**
```json
{
  "id": 2,
  "title": "New Task",
  "description": "Details of the task",
  "completed": 0
}
```

---

### `PUT /api/tasks/:id`
➡ Update a task  
**Request body**
```json
{
  "title": "Updated Task",
  "description": "Updated description",
  "completed": 1
}
```
**Example response**
```json
{
  "message": "Task updated"
}
```

---

### `DELETE /api/tasks/:id`
➡ Delete a task  
**Example response**
```json
{
  "message": "Task deleted"
}
```

---

## 🗄 Database Used and Integration

- **Database:** SQLite (via `sqlite3` NPM package)  
- The DB file `tasks.db` is auto-created at runtime.
- **Schema:**
```sql
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  completed INTEGER DEFAULT 0
);
```
- Integrated using:
```javascript
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./tasks.db');
```

---

## ⚙ How to Run the Application

1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/task-manager-sqlite.git
cd task-manager-sqlite
```

2️⃣ Install dependencies
```bash
npm install
```

3️⃣ Run the server
```bash
node server.js
```
✅ App URL:  
http://localhost:3000/

---

## 💻 How to Run the Frontend Locally

Open your browser at:
```
http://localhost:3000/
```
✅ Frontend lets you:
- Add tasks
- View all tasks
- Update/complete tasks
- Delete tasks

---

## 🧪 How to Run Tests

Run all tests + coverage:
```bash
npm test -- --coverage
```
✅ This includes:
- Unit tests (mocked + real DB)
- Integration tests
- API tests

---

## 🛠 Tech Stack

- **Node.js**
- **Express**
- **SQLite3**
- **Jest** (unit, integration tests)
- **Supertest** (API tests)
- **Bootstrap (frontend)**

---

## 📊 Test Coverage

✅ We aimed for **70%+ code coverage** — we achieved:

| Metric      | Coverage |
|-------------|----------|
| Statements  | 81.48%   |
| Branches    | 66.66%   |
| Functions   | 84.61%   |
| Lines       | 93.02%   |

### Screenshot:
![Test Coverage](./coverage.png)

---

## ✅ Notes

- You can extend the app with auth, pagination, deployment, etc.
- This is a simple starter fullstack CRUD app with solid test coverage.
