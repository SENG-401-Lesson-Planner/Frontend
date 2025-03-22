import React, { useState, useEffect } from "react";
import { marked } from "marked";

interface PromptFormProps {
  onResponsePrinted: () => void;
}

const PromptForm: React.FC<PromptFormProps> = ({ onResponsePrinted }) => {
  const [grade, setGrade] = useState(1);
  const [lessonPlan, setLessonPlan] = useState("");
  const [error, setError] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [time, setTime] = useState("");
  const [lessonPlanResponse, setLessonPlanResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (lessonPlanResponse) {
      // Once the response is printed, notify the parent component
      onResponsePrinted();
    }
  }, [lessonPlanResponse, onResponsePrinted]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!lessonPlan.trim()) {
      setError("Lesson plan message cannot be empty.");
      return;
    }
    setError("");
    setLessonPlanResponse("");
    setSubmitted(true);

    const requestBody = {
      message: lessonPlan,
      GradeLevelPrompt: getGradeLabel(Math.round(grade)),
      SubjectPrompt: selectedSubject || customSubject,
      LessonLength: time,
    };

    try {
      const response = await fetch("https://api.lesso.help/LLM/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authentication": localStorage.getItem("accessToken") || "",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      if (response.status !== 200) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let fullResponse = "";

      while (!done) {
        const { value, done: readerDone } = await reader!.read();
        done = readerDone;
        const chunk = decoder.decode(value, { stream: true });
        fullResponse += chunk;
        setLessonPlanResponse((prev) => prev + chunk);
      }
      
    } catch (error) {
      console.error("Error fetching lesson plan:", error);
      setError("Failed to get lesson plan. Please try again.");
    }
  };

  const getGradeLabel = (value: number) => {
    return value >= 1 && value <= 12
      ? value.toString()
      : value === 13
      ? "Post Secondary"
      : "";
  };

  const renderedLessonPlan = marked.parse(lessonPlanResponse);

  return (
    <div
      className="relative w-full flex items-center justify-center bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: "/assets/background.webp",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          maxWidth: submitted ? "2000px" : "400px", // Increase maxWidth when submitted //Unfortunately doesnt work
          transition: "max-width 0.5s ease-in-out",
          marginTop: "7rem", // Add margin to prevent overlapping with fixed elements
          marginBottom: "4rem",
        }}
        className={`p-6 rounded-lg shadow-md transition-all duration-500`}
      >
        <h1 className="text-2xl text-center text-white font-bold mb-4">
          Lesson Plan Creator
        </h1>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="lesson-plan"
              className="block text-sm font-medium text-white mb-2"
            >
              What is your lesson plan about?
            </label>
            <input
              type="text"
              id="lesson-plan"
              name="lesson-plan"
              value={lessonPlan}
              onChange={(e) => setLessonPlan(e.target.value)}
              className="block w-full text-white p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-[#44264E] focus:border-[#44264E]"
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <fieldset className="mb-2">
              <legend className="text-sm font-medium text-white mb-2">
                What grade is the lesson plan for?
              </legend>
              <input
                type="range"
                min="1"
                max="13"
                step="1"
                value={grade.toString()}
                onChange={(e) => setGrade(Number(e.target.value))}
                className="w-full custom-range"
                style={{ accentColor: "#b35786" }}
              />
              <div className="text-white mt-2 text-center">
                {getGradeLabel(Math.round(grade))}
              </div>
            </fieldset>

            <label
              htmlFor="subject"
              className="block text-sm font-medium text-white mb-2"
            >
              Subject (Optional)
            </label>
            <div className="flex flex-wrap justify-center mb-8 gap-2">
              {[
                "Math",
                "Science",
                "English",
                "Social Studies",
                "Art",
                "Physical Education",
              ].map((subject, index) => (
                <button
                  key={index}
                  type="button"
                  className={`w-1/4 px-4 py-2 rounded-md text-center flex items-center justify-center ${
                    selectedSubject === subject
                      ? "bg-[#44264E] text-[#b35786]"
                      : "bg-[#b35786] text-[#44264E]"
                  } hover:bg-[#44264E] hover:text-white`}
                  onClick={() => {
                    setSelectedSubject(
                      selectedSubject === subject ? "" : subject
                    );
                    setCustomSubject("");
                    setShowCustomInput(false);
                  }}
                >
                  {subject}
                </button>
              ))}
              <button
                type="button"
                className={`w-1/4 px-4 py-2 rounded-md text-center flex items-center justify-center ${
                  customSubject
                    ? "bg-[#44264E] text-[#b35786]"
                    : "bg-[#b35786] text-[#44264E]"
                } hover:bg-[#44264E] hover:text-white`}
                onClick={() => {
                  setShowCustomInput(!showCustomInput);
                  setSelectedSubject("");
                }}
              >
                {customSubject || "Other"}
              </button>
            </div>

            {showCustomInput && (
              <div className="mb-8">
                <label
                  htmlFor="custom-subject"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Enter Subject
                </label>
                <input
                  type="text"
                  id="custom-subject"
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  className="block w-full text-white p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#44264E] focus:border-[#44264E]"
                />
              </div>
            )}

            <label
              htmlFor="time"
              className="block text-sm font-medium text-white mb-2"
            >
              Lesson Length (Minutes)
            </label>
            <input
              type="number"
              id="time"
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="block w-full text-white p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-[#44264E] focus:border-[#44264E]"
            />

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-4 py-2 bg-white text-[#44264E] rounded-md hover:bg-[#44264E] hover:text-white"
              >
                Get Lesson Plan
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-8">
            <div
              className="text-white"
              dangerouslySetInnerHTML={{ __html: renderedLessonPlan }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptForm;
