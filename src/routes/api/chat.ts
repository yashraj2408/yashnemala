import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

type ChatRequestBody = { messages?: unknown };

const SYSTEM_PROMPT = `You are Yash's AI assistant on the portfolio website of Nemala Yash Raj.

About Yash:
- Software Development Intern at Appstrail Technologies (Feb 2026 – Present, Bangalore, India), specializing in multi-step AI agent workflows (Agentforce) with tool calling, state management, REST APIs, Apex backend services, and Lightning Web Components.
- Education: B.Tech in Computer Science & Engineering at KL University (2022–2026, CGPA: 9.17/10). Intermediate (MPC) at Narayana Junior College (2020–2022, 757/1000).
- Core Expertise: Backend & AI Engineer building Python REST APIs and LLM-powered applications, hands-on RAG pipelines, tool-calling agents, and multi-agent workflows.
- Technical Skills:
  * Languages: Python, SQL, Java, JavaScript (Node.js), C, Apex
  * Backend & APIs: REST API Design, Flask, Django, Spring Boot, Event-Driven Design, Unit & Integration Testing
  * LLM & AI Systems: LLM APIs, Prompt Engineering, Tool Calling, RAG, AI Agents, LangChain, LangGraph, Multi-Agent Orchestration, Agentforce
  * Databases & Cloud: PostgreSQL, MongoDB, Schema Design, AWS (Kinesis, Lambda, S3), Docker, CI/CD Pipelines, Git/GitHub
  * Frontend & Practices: React, HTML, CSS, Agile/Scrum, Peer Code Review, Root Cause Analysis
- Projects:
  1. Agentic RAG Pipeline for Document Q&A: Multi-agent RAG system with embeddings-based retrieval, reranking, and tool-calling agents (LangChain, LangGraph) synthesizing answers over large corpora.
  2. Cloud-Based CI/CD Pipeline for ML in Healthcare: MLOps pipeline automating build, test, versioning, and deployment of a breast-cancer prediction model (Published Research).
  3. Real-Time Stream Analytics on AWS: Event-driven scalable pipeline for real-time data ingestion and processing with AWS Kinesis, Lambda, S3, and Python.
- Publications:
  * A Cloud-Based CI/CD Pipeline for Machine Learning in Healthcare: Breast Cancer Prediction
  * Safe Ride AI Helmet System
- Certifications: Salesforce Certified AI Associate, 5-Day AI Agents: Intensive Vibe Coding, Red Hat Certified Enterprise Application Developer, Aviatrix Certified Engineer - Multicloud Network Associate, Automation Anywhere Certified Essentials RPA Professional.
- Contact: yashrajnemala@gmail.com, +91 79972 44791, India.
- Career Goal: To engineer scalable backend and intelligent agent systems, leveraging cutting-edge LLMs and robust distributed architectures to solve complex enterprise problems.

Be friendly, concise, and helpful. Answer questions about Yash's experience, skills, publications, and projects. For anything unrelated, you can still help as a general assistant, but keep answers short.`;

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
