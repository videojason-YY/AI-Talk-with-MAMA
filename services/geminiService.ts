
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getThoughtfulIdeas = async (userName: string = "Martha") => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Suggest 4 gentle, meaningful activities for an elderly person named ${userName} to do today. Keep them simple, encouraging, and easy to perform at home or in a nearby park. Return them as a JSON list.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "A short, catchy title for the activity." },
              description: { type: Type.STRING, description: "A one-sentence description." },
              icon: { type: Type.STRING, description: "A Material Symbol name that represents the activity." },
            },
            required: ["title", "description", "icon"],
          },
        },
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error fetching ideas from Gemini:", error);
    // Fallback ideas
    return [
      { title: "Water Plants", description: "Give your green friends a refreshing drink.", icon: "local_florist" },
      { title: "Family Call", description: "Ring Sarah to hear about her morning.", icon: "call" },
      { title: "Short Walk", description: "Enjoy the fresh air for 10 minutes.", icon: "directions_walk" },
      { title: "Photo Lane", description: "Look through the summer album.", icon: "photo_library" },
    ];
  }
};
