import { createFileRoute } from "@tanstack/react-router";
import { ChatAgent } from "@/components/ChatAgent";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Nova — AI Assistant" },
      {
        name: "description",
        content:
          "Chat with Nova, a fast AI assistant for answers, ideas, code, and more.",
      },
      { property: "og:title", content: "Nova — AI Assistant" },
      {
        property: "og:description",
        content: "Fast, helpful AI agent powered by Lovable AI.",
      },
    ],
  }),
});

function Index() {
  return (
    <>
      <ChatAgent />
      <Toaster />
    </>
  );
}
