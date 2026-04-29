import { useEffect, useRef } from "react";
import { ArrowUp, Square } from "lucide-react";

interface ChatComposerProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onStop?: () => void;
  isLoading: boolean;
}

export function ChatComposer({
  value,
  onChange,
  onSubmit,
  onStop,
  isLoading,
}: ChatComposerProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && value.trim()) onSubmit();
    }
  };

  return (
    <div className="w-full px-4 pb-6 pt-2">
      <div className="mx-auto max-w-3xl">
        <div
          className="relative flex items-end gap-2 rounded-2xl border border-border bg-card p-2 transition-shadow focus-within:border-primary/50"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <textarea
            ref={ref}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message the assistant..."
            rows={1}
            className="flex-1 resize-none bg-transparent px-3 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none"
            style={{ maxHeight: "200px" }}
          />
          {isLoading ? (
            <button
              type="button"
              onClick={onStop}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground transition-colors hover:bg-accent"
              aria-label="Stop"
            >
              <Square className="h-4 w-4" fill="currentColor" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onSubmit}
              disabled={!value.trim()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-primary-foreground transition-all disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:scale-105"
              style={{
                background: "var(--gradient-primary)",
                boxShadow: value.trim() ? "var(--shadow-glow)" : undefined,
              }}
              aria-label="Send"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          )}
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          AI can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
}
