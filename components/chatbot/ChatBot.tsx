"use client";

import { motion, AnimatePresence } from "framer-motion";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { ArrowDownIcon } from "lucide-react";
import { MessageCircleIcon } from "lucide-react";
import ChatWindow from "../ui/ChatWindow";

const ChatBot = () => {
  const chatIconRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showChatIcon, setShowChatIcon] = useState(false);

  const _toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const _handleScroll = () => {
    if (window.scrollY > 200) {
      setShowChatIcon(true);
    } else {
      setShowChatIcon(false);
      // setIsChatOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", _handleScroll);

    // cleanup
    return () => {
      window.removeEventListener("scroll", _handleScroll);
    };
  });

  return (
    <>
      <AnimatePresence>
        {showChatIcon && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full bg-background/80 backdrop-blur-sm shadow-lg"
          >
            <Button
              ref={chatIconRef}
              onClick={_toggleChat}
              className="rounded-full p-2 size-14 shadow-lg"
            >
              {!isChatOpen ? (
                <MessageCircleIcon className="size-12" />
              ) : (
                <ArrowDownIcon className="size-12" />
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 z-50 w-[95%] md:w-[400px]"
          >
            <ChatWindow toggleChat={_toggleChat} scrollRef={scrollRef} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
