import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Sparkles, User } from "lucide-react";

export type ChatRole = "user" | "assistant";

export interface ChatMessageProps {
  role: ChatRole;
  content: string;
  isStreaming?: boolean;
}

export function ChatMessage({ role, content, isStreaming }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className="w-full px-4 py-5 animate-in fade-in slide-in-from-bottom-1 duration-300">
      <div className="mx-auto flex max-w-3xl gap-4">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md"
          style={{
            background: isUser
              ? "var(--color-secondary)"
              : "var(--gradient-primary)",
            boxShadow: isUser ? undefined : "var(--shadow-glow)",
          }}
        >
          {isUser ? (
            <User className="h-4 w-4 text-foreground" />
          ) : (
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          )}
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <div className="mb-1 text-xs font-medium text-muted-foreground">
            {isUser ? "You" : "Assistant"}
          </div>
          {isUser ? (
            <div className="whitespace-pre-wrap break-words text-foreground/95 leading-relaxed">
              {content}
            </div>
          ) : (
            <div className="prose-chat break-words">
              {content ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content}
                </ReactMarkdown>
              ) : null}
              {isStreaming && (
                <span className="ml-1 inline-flex gap-1 align-middle">
                  <span
                    className="typing-dot inline-block h-1.5 w-1.5 rounded-full bg-primary"
                    style={{ animationDelay: "0s" }}
                  />
                  <span
                    className="typing-dot inline-block h-1.5 w-1.5 rounded-full bg-primary"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <span
                    className="typing-dot inline-block h-1.5 w-1.5 rounded-full bg-primary"
                    style={{ animationDelay: "0.4s" }}
                  />
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
