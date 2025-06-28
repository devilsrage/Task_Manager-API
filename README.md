# 🗂️ Task Manager – Fullstack API Project

**Task Manager** is a full-stack application that allows users to manage their daily tasks with ease. The app is built with Node.js, Express, and SQLite on the backend, and supports automated API testing and documentation generation.

![Task Manager UI](assets\task-manager-ui.png)

---

## 🚀 Features

- ✅ Add, update, and delete tasks
- 📝 View all tasks in a clean JSON format
- 📦 RESTful API built using Express.js
- 🧩 SQLite database integration
- 📄 Swagger documentation (OpenAPI 3.0)
- 🤖 Keploy-based test case generation
- 🔁 CI/CD integration with GitHub Actions

---

## 📂 API Endpoints

| Method | Endpoint             | Description         |
|--------|----------------------|---------------------|
| GET    | `/api/tasks`         | Get all tasks       |
| GET    | `/api/tasks/:id`     | Get task by ID      |
| POST   | `/api/tasks`         | Create new task     |
| PUT    | `/api/tasks/:id`     | Update task by ID   |
| DELETE | `/api/tasks/:id`     | Delete task by ID   |

---

## 🔗 Swagger Documentation

- **Swagger UI:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- **OpenAPI JSON Schema:** `/swagger-output.json`

![Swagger UI](assets\swagger-ui.png)

---

## 🔬 Keploy API Testing

This project uses **Keploy** to record and replay API calls for test generation using real-time traffic. This ensures high test coverage with minimal effort.

### 🔁 Example Test Report

![Keploy Report](assets\keploy test image.jpg)

---

## 🏗️ Project Structure

```
task-manager/
├── routes/
│   └── tasks.js           # All API routes
├── server.js              # Express server entry point
├── swagger.js             # Swagger setup
├── generate-swagger.js    # Swagger JSON generator
├── swagger-output.json    # Generated OpenAPI spec
├── tasks.db               # SQLite DB file
└── public/
    └── index.html         # Optional frontend (static)
```

---

## 📄 Example Request

### POST `/api/tasks`

```json
{
  "title": "Finish report",
  "description": "Complete by EOD",
  "completed": false
}
```

---

## ⚙️ How to Run the Project

### 🔧 Setup

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
npm install
```

### ▶️ Start Server

```bash
npm run dev
```

> Server runs on: `http://localhost:3000`

---

## 🧪 Testing

### Run Keploy in another terminal:

```bash
keploy record -c "npm run dev" --delay 5
```

Then use Postman or Swagger UI to trigger requests.

### Replay tests:

```bash
keploy test
```

---

## 🔁 CI/CD

This project includes a GitHub Actions workflow that runs API tests using Keploy on every push.

```yaml
# .github/workflows/keploy.yml
name: Keploy Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Node
        uses: actions/setup-node@v2
        with:
          node-version: 18
      - run: npm install
      - run: keploy test
```

---

## 📝 License

MIT License

---

## 👨‍💻 Author

Nikhil Dwivedi – [@nikhil](https://github.com/devilsrage)