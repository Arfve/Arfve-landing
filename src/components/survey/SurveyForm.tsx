"use client";
interface Question {
  id: string;
  text: string;
  type: "radio" | "checkbox" | "textarea" | "email" | string;
  options?: string[];
  otherOption?: boolean;
  likert?: boolean;
  Choice?: string
}

interface SurveyFormProps {
  questions: Question[];
  errors: Record<string, boolean>;
  questionRefs: React.MutableRefObject<{
    [key: string]: HTMLDivElement | null;
  }>;
  surveyData: Record<string, string | string[] | undefined>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
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
      <div>
        <h1>

          <strong>Welcome To the Arfve Survey</strong>
        </h1>
        <div>
          <p>Hello,</p>
          <p>Help Us Shape the Future of Earbuds – Your Voice Matters</p>
          <p>
            Thank you for taking the time to be part of{" "}
            <strong>Arfve’s journey.</strong>You’re not just answering a
            survey—you’re helping us{" "}
            <strong>redefine the future of Earbuds</strong>.
          </p>
          <p>
            At Arfve, we believe in{" "}
            <strong>technology that evolves with you</strong>—not against you.
            The world doesn’t need more disposable earbuds. It needs{" "}
            <strong>
              sound that lasts, design that adapts, and technology that doesn’t
              expire.
            </strong>
          </p>
          <p>
            Your insights will shape <strong>Arfve</strong>, we’re not just
            launching a product, we’re building a movement against throwaway
            tech, and <strong>we want you to be part of it.</strong>
          </p>
          <p>
            This short <strong>4-minute survey</strong> (18 questions) will
            directly shape the final design and features of our product. As a
            thank you, you’ll <strong> get early </strong>access to exclusive
            discounts, product updates, and a chance to{" "}
            <strong>win a pair of Legacy 1 Earbuds! </strong>
          </p>
          <p>
            This survey is completely anonymous, and your responses will remain
            confidential. However, if you’d like to receive your incentive,
            please provide <strong>your email</strong> at the end of the survey.
          </p>
          <p>
            Let’s build something different. Let’s build <strong>Arfve.</strong>
          </p>
          <p>Thank you for being a part of this.</p>
          <strong>– The Arfve Team</strong>
        </div>
      </div>
      {questions.map((question) => (
        <div
          key={question.id}
          ref={(el) => {
            questionRefs.current[question.id] = el;
          }}
          className={`mb-4 p-2 ${errors[question.id] ? "border border-red-500" : ""}`}>

          <p className="text-sm  mb-2"><strong>{question.text}</strong> {question.Choice}</p>

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
                placeholder="Write done your thoughts here..."
                className="shadow border rounded w-full py-2 px-3"
              />
              <label className="inline-flex items-center mt-2">
                <input
                  type="checkbox"
                  name={question.id}
                  onChange={handleCheckboxChangeSQ}
                
                  className="form-checkbox text-indigo-600"
                />
                <span className="ml-2">skip</span>
              </label>
            </>
          )}

          {question.type === "email" && (
            <>
              <input
                type="email"
                name={question.id}
                onChange={handleChange}
                placeholder="Your email"
                className="shadow border rounded w-full py-2 px-3"
              />
              <label className="inline-flex items-center mt-2">
                <input
                  type="checkbox"
                  name={`anonymousEmail_${question.id}`}
                  onChange={handleCheckboxChange}
                  className="form-checkbox text-indigo-600"
                />
                <span className="ml-2"> answer anonymously </span>
              </label>
            </>
          )}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="mt-4 bg-[#42b99f] text-white py-2 px-4 rounded">
       Submit
      </button>
    </>
  );
}
