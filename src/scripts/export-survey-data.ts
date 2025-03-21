// Export survey data to CSV
import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
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

async function exportSurveyData() {
  // Create a connection pool
  const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    console.log('Exporting survey data to CSV...');
    
    // Get all survey responses
    const [responses] = await db.query<SurveyResponse[]>('SELECT * FROM usersfromsurvey ORDER BY created_at DESC');
    
    if (!responses.length) {
      console.log('No survey responses found to export.');
      return;
    }
    
    // Create CSV header row based on the first response's keys
    const firstResponse = responses[0];
    const headers = Object.keys(firstResponse).join(',');
    
    // Create CSV rows
    const rows = responses.map(response => {
      return Object.values(response).map(value => {
        // Handle values that might contain commas by wrapping in quotes
        if (value === null || value === undefined) return '""';
        return `"${String(value).replace(/"/g, '""')}"`;
      }).join(',');
    });
    
    // Combine header and rows
    const csvContent = [headers, ...rows].join('\n');
    
    // Create exports directory if it doesn't exist
    const exportDir = path.join(process.cwd(), 'exports');
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir);
    }
    
    // Create filename with current date
    const date = new Date().toISOString().split('T')[0];
    const filename = `survey_data_${date}.csv`;
    const filepath = path.join(exportDir, filename);
    
    // Write to file
    fs.writeFileSync(filepath, csvContent);
    
    console.log(`✅ Survey data exported successfully to: ${filepath}`);
    console.log(`Total records exported: ${responses.length}`);
    
    // Close the connection
    await db.end();
  } catch (error) {
    console.error('Error exporting survey data:', error);
    process.exit(1);
  }
}

exportSurveyData(); 