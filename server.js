const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
// Implement A Swagger API Documentation Page
const swaggerDocument = require("./swagger/output.json");
const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/invoices", async (req, res) => {
  // Implement Getting Invoices Using Best Practices
  
  res.json({ message: "Find list of invoices" });
});

app.get("/invoices/:id", (req, res) => {
  // Implement Getting Invoice By Id Using Best Practices
  res.json({ message: "Find invoice by id" });
});

app.post("/invoices", (req, res) => {
  // Implement Creating An Invoice Using Best Practices
  res.json({ message: "Create an invoice" });
});

app.put("/invoices/:id", (req, res) => {
  // Implement Updating An Invoice By Id Using Best Practices
  res.json({ message: "Update an invoice by id" });
});

app.delete("/invoices/:id", (req, res) => {
  // Implement Deleting An Invoice By Id Using Best Practices
  res.json({ message: "Delete an invoice by id" });
});

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
