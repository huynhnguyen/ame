import React, {useState, useEffect} from "react";
import { useBotUser } from "../hooks/useBotUser";
import { Chat } from "components/Chat/Chat";

const ChatPage = () => {
  const [setBot, {user, loading, error, botId}] = useBotUser({});
  return (
    <Chat/>
  )
}

export default ChatPage;
