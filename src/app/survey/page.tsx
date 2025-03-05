"use client";

import { useState, useRef } from "react";
import Questions from "@/data/questions.json";
import { SurveyForm } from "@/components/survey/SurveyForm";

interface SurveyData {
  [key: string]: string | string[] | undefined;
}

interface Errors {
  [key: string]: boolean;
}

interface QuestionRef {
  [key: string]: HTMLDivElement | null;
}


export default function Survey() {
  const questionRefs = useRef<QuestionRef>({});

  const [surveyData, setSurveyData] = useState<SurveyData>({});
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [SQ, setSQ] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      setSurveyData((prevData) => {
        const prevValue = prevData[name];
        const newValue = Array.isArray(prevValue)
          ? checked
            ? [...prevValue, value]
            : prevValue.filter((v) => v !== value)
          : checked
            ? [value]
            : [];
        return { ...prevData, [name]: newValue };
      });
    } else {
      setSurveyData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleCheckboxChangeSQ = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSQ(e.target.checked);
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setIsAnonymous(e.target.checked);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Errors = {};

    Questions.forEach((q) => {
      if (q.id === "q17" && !SQ && !surveyData[q.id]?.toString().trim()) {
        newErrors[q.id] = true;
      } else if (
        q.id === "q18" &&
        !isAnonymous &&
        !surveyData[q.id]?.toString().trim()
      ) {
        newErrors[q.id] = true;
      } else if (
        !surveyData[q.id] ||
        (q.type === "checkbox" && (surveyData[q.id] as string[]).length === 0)
      ) {
        newErrors[q.id] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorKey = Object.keys(newErrors)[0];
      questionRefs.current[firstErrorKey]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    setErrors({});

    const payload = {
      ...surveyData,
      q18: isAnonymous ? "anonymous" : surveyData["q18"] || "",
      q17: SQ ? "Skipped" : surveyData["q17"] || "",
    };

    try {
      await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setResponseMessage("Tack för ditt svar!");
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Något gick fel, försök igen.");
    }
  };

  return (
    <SurveyForm
      questions={Questions}
      surveyData={surveyData}
      errors={errors}
      questionRefs={questionRefs}
      handleChange={handleChange}
      handleCheckboxChangeSQ={handleCheckboxChangeSQ}
      handleCheckboxChange={handleCheckboxChange}
      handleSubmit={handleSubmit}
      responseMessage={responseMessage}
    />
  );
}
