import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",

  user: process.env.DB_USER,

  password: process.env.DB_PASSWORD,

  database: process.env.DB_NAME,
});

async function checkDatabaseConnection() {
  try {
    await db.query("SELECT 1");

    console.log("Database is connected and active!");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to connect to the database:", error.message);
    } else {
      console.error("Failed to connect to the database:", error);
    }
  }
}

// Add environment variable validation

function validateDbEnv() {
  const required = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(
      `Warning: Missing required database environment variables: ${missing.join(", ")}`
    );

    console.error(
      "Database connections may fail. Please check your .env.local file."
    );
  }
}

// Validate environment variables

validateDbEnv();

// Check database connection

checkDatabaseConnection();

export default db;
