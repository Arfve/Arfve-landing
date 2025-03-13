// Test database connection
import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Define a type for errors
interface DbError extends Error {
  code?: string;
}

async function testConnection() {
  // Create a connection pool with the same configuration as in src/lib/db.ts
  const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    console.log('Attempting to connect to the database...');
    console.log(`Host: ${process.env.DB_HOST}`);
    console.log(`Database: ${process.env.DB_NAME}`);
    
    // Try a simple query
    const [result] = await db.query('SELECT 1 as test');
    
    console.log('✅ Successfully connected to AWS RDS database!');
    console.log('Query result:', result);
    
    // Try to create the survey table if it doesn't exist
    try {
      await db.query(`
        CREATE TABLE IF NOT EXISTS usersfromsurvey (
          id INT AUTO_INCREMENT PRIMARY KEY,
          Q1 VARCHAR(255),
          Q2 VARCHAR(255),
          Q3 VARCHAR(255),
          Q4 VARCHAR(255),
          Q5 TEXT,
          Q6 TEXT,
          Q7 TEXT,
          Q8 VARCHAR(255),
          Q9 TEXT,
          Q10 VARCHAR(255),
          Q11 VARCHAR(255),
          Q12 VARCHAR(255),
          Q13 VARCHAR(255),
          Q14 VARCHAR(255),
          Q15 VARCHAR(255),
          Q16 TEXT,
          Q17 TEXT,
          Q18 VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('✅ Survey table created or already exists');
    } catch (tableError) {
      console.error('❌ Error creating survey table:', tableError);
    }
    
    // Close the connection
    await db.end();
  } catch (error) {
    const dbError = error as DbError;
    console.error('❌ Failed to connect to the database:', dbError);
    
    if (dbError.code === 'ENOTFOUND') {
      console.error('Check if the DB_HOST value is correct in your .env.local file');
    } else if (dbError.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('Check if your DB_USER and DB_PASSWORD are correct');
    } else if (dbError.code === 'ER_BAD_DB_ERROR') {
      console.error('Check if your DB_NAME is correct and the database exists');
    }
    
    process.exit(1);
  }
}

testConnection(); 