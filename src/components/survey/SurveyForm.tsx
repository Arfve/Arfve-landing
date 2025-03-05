"use client";
interface Question {
    id: string;
    text: string;
    type: "radio" | "checkbox" | "textarea" | "email"|string; // These are the core types
    options?: string[]; // Optional options for radio/checkbox questions
    otherOption?: boolean; // This is present in some questions (e.g., q3, q6)
    likert?: boolean; // This is present in Likert scale questions (e.g., q11, q14)
   
  }
  
  
  interface SurveyFormProps {
    questions: Question[];
    errors: Record<string, boolean>;
    questionRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
    surveyData: Record<string, string | string[] | undefined>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleCheckboxChangeSQ: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    responseMessage: string;
  }
  
  

export function SurveyForm({
  questions,
  errors,
  questionRefs,
  handleChange,
  handleCheckboxChangeSQ,
  handleCheckboxChange,
  handleSubmit,
 
}: SurveyFormProps) {
    
  return (
    <>
      {questions.map((question) => (
        <div
          key={question.id}
          ref={(el) => {
            questionRefs.current[question.id] = el;
          }}
          className={`mb-4 p-2 ${errors[question.id] ? "border border-red-500" : ""}`}
        >
          <p className="text-sm font-bold mb-2">{question.text}</p>

          {question.type === "radio" && question.options && (
            <div className="flex flex-col">
              {question.options.map((option: string) => (
                <label key={option} className="inline-flex items-center">
                  <input
                    type="radio"
                    name={question.id}
                    value={option}
                    onChange={handleChange}
                    className="form-radio text-indigo-600"
                  />
                  <span className="ml-2">{option}</span>
                </label>
              ))}
            </div>
          )}

          {question.type === "checkbox" && question.options && (
            <div className="flex flex-col">
              {question.options.map((option: string) => (
                <label key={option} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name={question.id}
                    value={option}
                    onChange={handleChange}
                    className="form-checkbox text-indigo-600"
                  />
                  <span className="ml-2">{option}</span>
                </label>
              ))}
            </div>
          )}

          {question.type === "textarea" && (
            <>
              <textarea
                name={question.id}
                onChange={handleChange}
                placeholder="Skriv dina tankar här..."
                className="shadow border rounded w-full py-2 px-3"
              />
              <label className="inline-flex items-center mt-2">
                <input
                  type="checkbox"
                  name={`anonymousThoughts_${question.id}`}
                  onChange={handleCheckboxChangeSQ}
                  className="form-checkbox text-indigo-600"
                />
                <span className="ml-2">Svara anonymt</span>
              </label>
            </>
          )}

          {question.type === "email" && (
            <>
              <input
                type="email"
                name={question.id}
                onChange={handleChange}
                placeholder="Din e-postadress..."
                className="shadow border rounded w-full py-2 px-3"
              />
              <label className="inline-flex items-center mt-2">
                <input
                  type="checkbox"
                  name={`anonymousEmail_${question.id}`}
                  onChange={handleCheckboxChange}
                  className="form-checkbox text-indigo-600"
                />
                <span className="ml-2">Svara anonymt</span>
              </label>
            </>
          )}
        </div>
      ))}
   
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Skicka
      </button>
    </>
  );
}
