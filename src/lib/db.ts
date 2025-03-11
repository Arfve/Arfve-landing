import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.db_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


async function checkDatabaseConnection() {
  try {
    await db.query('SELECT 1');
    console.log('Database is connected and active!');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to connect to the database:', error.message);
    } else {
      console.error('Failed to connect to the database:', error);
    }
  }
}

checkDatabaseConnection();

export default db;
