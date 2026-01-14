import { GoogleGenAI, Type, Schema } from "@google/genai";
import { StudyPlanResponse, UserFormData } from "../types";

const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

const studyPlanSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    roast: {
      type: Type.STRING,
      description: "A short, funny, slightly roast-y comment about the user's situation.",
    },
    motivationalQuote: {
        type: Type.STRING,
        description: "A funny or weirdly specific motivational quote for a CS student.",
    },
    weeklySchedule: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.STRING },
          theme: { type: Type.STRING, description: "A funny theme title for the day" },
          tasks: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING },
                activity: { type: Type.STRING },
                description: { type: Type.STRING },
              },
            },
          },
        },
      },
    },
    resources: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          type: { type: Type.STRING },
          description: { type: Type.STRING },
        },
      },
    },
    careerAdvice: {
      type: Type.STRING,
      description: "Actionable, slighty unconventional career advice.",
    },
  },
  required: ["roast", "weeklySchedule", "resources", "careerAdvice", "motivationalQuote"],
};

export const generateStudyPlan = async (data: UserFormData, feedback?: string): Promise<StudyPlanResponse> => {
  const model = "gemini-3-flash-preview";

  let prompt = `
    I am a CS student. Create a study plan for me.
    Current Semester/Status: ${data.semester}
    Subjects/Backlogs: ${data.subjects}
    Upcoming Exams: ${data.exams}
    Daily Free Time: ${data.freeTime}
    Goals: ${data.goals}
    Desired Vibe: ${data.vibe} (If roast, be mean but helpful. If chill, be supportive. If hardcore, be intense).
  `;

  if (feedback) {
    prompt += `\n\n ADJUSTMENT REQUEST: The user has this feedback on the previous plan: "${feedback}". Please adjust the schedule accordingly but keep the personality.`;
  }

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: studyPlanSchema,
      systemInstruction: "You are a senior developer mentor who is smart, funny, and keeps up with Gen Z internet culture. You provide realistic, actionable advice for Computer Science students. Your tone should match the requested vibe. Return strictly JSON.",
    },
  });

  if (response.text) {
    return JSON.parse(response.text) as StudyPlanResponse;
  }

  throw new Error("No response generated");
};
