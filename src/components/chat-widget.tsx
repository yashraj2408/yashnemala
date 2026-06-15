import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import botAvatar from "@/assets/chat-bot.png";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";

const STORAGE_KEY = "yash-portfolio-chat";

function loadMessages(): UIMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UIMessage[]) : [];
  } catch {
    return [];
  }
}

const SUGGESTIONS = [
  "What are Yash's main skills?",
  "Tell me about his projects",
  "What does an Agentforce Developer do?",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [initial] = useState<UIMessage[]>(() => loadMessages());

  const { messages, sendMessage, status, setMessages } = useChat({
    id: "portfolio-chat",
    messages: initial,
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  // persist to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* ignore */
    }
  }, [messages]);

  // focus textarea when opened or after stream completes
  useEffect(() => {
    if (open && status !== "streaming") {
      const t = setTimeout(
        () => containerRef.current?.querySelector("textarea")?.focus(),
        120,
      );
      return () => clearTimeout(t);
    }
  }, [open, status]);

  const isBusy = status === "submitted" || status === "streaming";

  function submit(message: PromptInputMessage, e?: { preventDefault: () => void }) {
    e?.preventDefault();
    const text = (message.text ?? input).trim();
    if (!text || isBusy) return;
    sendMessage({ text });
    setInput("");
  }

  function ask(text: string) {
    if (isBusy) return;
    sendMessage({ text });
  }

  function clearChat() {
    setMessages([]);
    if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <>
      {/* launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat assistant"}
        className="fixed bottom-6 right-6 z-[60] grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/30 transition-transform hover:scale-105"
      >
        {open ? (
          <span className="text-2xl leading-none">✕</span>
        ) : (
          <img src={botAvatar} alt="" width={1024} height={1024} className="h-9 w-9 object-contain" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-[60] flex h-[min(560px,75vh)] w-[min(390px,calc(100vw-3rem))] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
          >
            {/* header */}
            <div className="flex items-center justify-between gap-3 border-b border-border bg-gradient-to-r from-primary/15 to-card px-5 py-4">
              <div className="flex items-center gap-3">
                <img src={botAvatar} alt="" width={1024} height={1024} className="h-9 w-9 object-contain" />
                <div>
                  <p className="font-display text-sm font-bold leading-tight">Yash's AI Assistant</p>
                  <p className="text-xs text-muted-foreground">Ask me anything</p>
                </div>
              </div>
              {messages.length > 0 && (
                <button
                  onClick={clearChat}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>

            {/* conversation */}
            <Conversation className="flex-1">
              <ConversationContent className="gap-4">
                {messages.length === 0 ? (
                  <ConversationEmptyState
                    title="Hi there! 👋"
                    description="I can tell you about Yash's skills, experience, and projects."
                  >
                    <div className="mt-2 flex flex-col gap-2">
                      {SUGGESTIONS.map((s) => (
                        <button
                          key={s}
                          onClick={() => ask(s)}
                          className="rounded-full border border-border bg-muted px-4 py-2 text-xs transition-colors hover:border-primary/50"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </ConversationEmptyState>
                ) : (
                  messages.map((m) => {
                    const text = m.parts
                      .map((p) => (p.type === "text" ? p.text : ""))
                      .join("");
                    return (
                      <Message from={m.role} key={m.id}>
                        <MessageContent>
                          <MessageResponse>{text}</MessageResponse>
                        </MessageContent>
                      </Message>
                    );
                  })
                )}
                {status === "submitted" && (
                  <Message from="assistant">
                    <MessageContent>
                      <Shimmer>Thinking...</Shimmer>
                    </MessageContent>
                  </Message>
                )}
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>

            {/* composer */}
            <div ref={containerRef} className="border-t border-border p-3">
              <PromptInput onSubmit={submit}>
                <PromptInputTextarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                />
                <PromptInputFooter className="justify-end">
                  <PromptInputSubmit status={status} disabled={!input.trim() && !isBusy} />
                </PromptInputFooter>
              </PromptInput>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
