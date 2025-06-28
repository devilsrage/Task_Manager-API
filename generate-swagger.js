const fs = require("fs");
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description: "A simple Task Manager API using Express and SQLite",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      schemas: {
        Task: {
          type: "object",
          properties: {
            id: { type: "integer" },
            title: { type: "string" },
            description: { type: "string" },
            completed: { type: "integer" }
          },
          required: ["title"]
        }
      }
    }
  },
  apis: ["./routes/tasks.js"], // Ensure this path is correct
};

const swaggerSpec = swaggerJSDoc(options);

// Write to file
fs.writeFileSync("./swagger-output.json", JSON.stringify(swaggerSpec, null, 2));
console.log("✅ OpenAPI schema saved to swagger-output.json");
