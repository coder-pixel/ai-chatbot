import { NextRequest } from "next/server";
import { Message, streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { initialMessage } from "@/lib/data";

const goggle = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export const runtime = "edge";

const generateId = () => Math.random()?.toString(36)?.slice(2, 10);

const buildGoogleGenAIPrompt = (messages: Message[]): Message[] => [
  // initial context that we want to pass to the AI, to generate better responses (the better the context, the better the response)
  {
    id: generateId(),
    role: "user",
    content: initialMessage?.content,
  },

  ...messages?.map((message) => ({
    id: message?.id || generateId(),
    role: message?.role,
    content: message?.content,
  })),
];

export async function POST(request: NextRequest) {
  const { messages } = await request.json();
  console.log(messages);

  const stream = await streamText({
    model: goggle("gemini-2.0-flash-001"),
    messages: buildGoogleGenAIPrompt(messages),
    temperature: 0.7, // 0.0 - 1.0 (0.0 is deterministic, 1.0 is random), the higher the temperature, the better the response
  });

  return stream?.toDataStreamResponse();
}
