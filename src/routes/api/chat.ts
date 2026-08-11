import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

type ChatRequestBody = { messages?: unknown };

const SYSTEM_PROMPT = `You are Yash's AI assistant on the portfolio website of Nemala Yash Raj.

About Yash:
- Agentforce Developer Intern at Appstrail (joined 23 February 2026).
- B.Tech in Computer Science Engineering (AI specialization) at KL University (2022–2026).
- Skills: Java, Python, C, SQL, React, MongoDB; Salesforce (Agentforce, Lightning Web Components, Apex, SOQL); AI (Machine Learning, Deep Learning, Neural Networks, Computer Vision, Speech Processing, RAG, LLMs, LangChain).
- Projects: Tomato Leaf Disease Prediction, Sonar Classification, Vehicle Classification.
- Contact: yashrajnemala@gmail.com, +91 7997244791, India.
- Goal: to grow in AI fields and build impactful innovations.

Be friendly, concise, and helpful. Answer questions about Yash's experience, skills, and projects. For anything unrelated, you can still help as a general assistant, but keep answers short.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let parsedBody: ChatRequestBody;
        try {
          parsedBody = (await request.json()) as ChatRequestBody;
        } catch {
          return new Response("Invalid request", { status: 400 });
        }
        const { messages } = parsedBody;
        if (!Array.isArray(messages) || messages.length === 0) {
          return new Response("Messages are required", { status: 400 });
        }

        const MAX_MESSAGES = 40;
        const MAX_TOTAL_CHARS = 12000;
        if (messages.length > MAX_MESSAGES) {
          return new Response("Too many messages", { status: 400 });
        }

        let totalChars = 0;
        for (const m of messages as UIMessage[]) {
          const parts = Array.isArray(m?.parts) ? m.parts : [];
          for (const p of parts) {
            if (p && typeof p === "object" && "text" in p && typeof (p as { text?: unknown }).text === "string") {
              totalChars += (p as { text: string }).text.length;
            }
          }
        }
        if (totalChars > MAX_TOTAL_CHARS) {
          return new Response("Message content too large", { status: 400 });
        }


        const key = process.env.LOVABLE_API_KEY;
        if (!key) {
          return new Response("Missing LOVABLE_API_KEY", { status: 500 });
        }

        const gateway = createLovableAiGatewayProvider(key);
        const result = streamText({
          model: gateway("google/gemini-3-flash-preview"),
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages as UIMessage[]),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
        });
      },
    },
  },
});
