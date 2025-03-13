// Check survey data in the database
import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
import { RowDataPacket } from 'mysql2';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Define types for database results
interface SurveyResponse extends RowDataPacket {
  id: number;
  Q1: string;
  Q2: string;
  Q3: string;
  Q4: string;
  Q5: string;
  Q6: string;
  Q7: string;
  Q8: string;
  Q9: string;
  Q10: string;
  Q11: string;
  Q12: string;
  Q13: string;
  Q14: string;
  Q15: string;
  Q16: string;
  Q17: string;
  Q18: string;
  created_at: Date;
}

interface CountResult extends RowDataPacket {
  count: number;
}

async function checkSurveyData() {
  // Create a connection pool
  const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    console.log('Checking survey data in the database...');
    
    // Count the number of survey responses
    const [countResult] = await db.query<CountResult[]>('SELECT COUNT(*) as count FROM usersfromsurvey');
    console.log('Number of survey responses:', countResult[0].count);
    
    // Get the most recent survey response
    const [latestResult] = await db.query<SurveyResponse[]>('SELECT * FROM usersfromsurvey ORDER BY created_at DESC LIMIT 1');
    
    if (latestResult.length > 0) {
      console.log('Most recent survey response:');
      console.log('---------------------------');
      const latestResponse = latestResult[0];
      
      // Print each question and answer
      for (let i = 1; i <= 18; i++) {
        const question = `Q${i}` as keyof SurveyResponse;
        console.log(`${question}: ${latestResponse[question]}`);
      }
      console.log('Submitted at:', latestResponse.created_at);
    } else {
      console.log('No survey responses found in the database.');
    }
    
    // Close the connection
    await db.end();
  } catch (error) {
    console.error('Error checking survey data:', error);
    process.exit(1);
  }
}

checkSurveyData(); 