import React from "react";
import { Card, CardTitle, CardHeader, CardContent, CardFooter } from "./card";
import { Button } from "./button";
import { SendIcon, XIcon, StopCircleIcon } from "lucide-react";
import { ScrollArea } from "./scroll-area";
import { useChat } from "@ai-sdk/react";
import { Input } from "./input";

interface ChatWindowProps {
  toggleChat: () => void;
}

const ChatWindow = ({ toggleChat }: ChatWindowProps) => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    reload,
    error,
  } = useChat({
    api: "/api/gemini",
  });

  return (
    <Card className="border-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-semibold">Chat with AI</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="px-2 py-2"
          onClick={toggleChat}
        >
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-2">
          {messages?.length > 0 ? (
            messages?.map((message) => (
              <div key={message?.id}>
                <p>{message?.content}</p>
              </div>
            ))
          ) : (
            <div className="w-full mt-32 text-gray-500 items-center flex justify-center gap-3">
              <p>No messages yet</p>
            </div>
          )}

          {error && (
            <div className="w-full mt-32 text-gray-500 items-center flex justify-center gap-3">
              <p>Error generating response.</p>
              <Button
                variant="link"
                className="underline px-0 py-0"
                onClick={() => reload()}
              >
                Retry?
              </Button>
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form
          className="w-full flex justify-between items-center space-x-2"
          onSubmit={isLoading ? stop : handleSubmit}
        >
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message here..."
            className="flex-1"
          />
          <Button type="submit">
            {isLoading ? (
              <StopCircleIcon className="size-4" />
            ) : (
              <SendIcon className="size-4" />
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatWindow;
