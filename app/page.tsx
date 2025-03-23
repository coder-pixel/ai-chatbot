import LandingSections from "@/components/LandingSections";
import ChatBot from "@/components/chatbot/ChatBot";
export default function Chat() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingSections />

      <ChatBot />
    </div>
  );
}
