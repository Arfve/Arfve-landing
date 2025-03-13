import { NextRequest } from "next/server"; // Import NextRequest


export async function POST(request: NextRequest) { // Define the type of request
    try {
        const surveyData = await request.json();
        
        const requiredFields = [
            "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10",
            "q11", "q12", "q13", "q14", "q15", "q16", "q18" // q17 is skippable
        ];

        const missingFields = requiredFields.filter(field => {
            return !surveyData[field] || (Array.isArray(surveyData[field]) && surveyData[field].length === 0);
        });

        if (missingFields.length > 0) {
            return new Response(
                JSON.stringify({ error: `Missing required fields: ${missingFields.join(", ")}` }),
                { status: 400 }
            );
        }

        console.log("Survey data received:", surveyData);

        // const arrayToCommaString = (array: string | string[]) => Array.isArray(array) ? array.join(", ") : array;

        // await .query(
        //     `INSERT INTO usersfromsurvey (
        //         Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10, 
        //         Q11, Q12, Q13, Q14, Q15, Q16, Q17, Q18
        //     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        //     [
        //         surveyData.q1,
        //         surveyData.q2,
        //         surveyData.q3,
        //         surveyData.q4,
        //         arrayToCommaString(surveyData.q5),
        //         arrayToCommaString(surveyData.q6),
        //         arrayToCommaString(surveyData.q7),
        //         surveyData.q8,
        //         arrayToCommaString(surveyData.q9),
        //         surveyData.q10,
        //         surveyData.q11,
        //         surveyData.q12,
        //         surveyData.q13,
        //         surveyData.q14,
        //         surveyData.q15,
        //         arrayToCommaString(surveyData.q16),
        //         surveyData.q17 || "Skipped", 
        //         surveyData.q18,
        //     ]
        // );

        return new Response(
            JSON.stringify({ message: "Survey submitted successfully!" }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Failed to submit survey:", error);
        return new Response(
            JSON.stringify({ error: "Failed to submit survey" }),
            { status: 500 }
        );
    }
}
