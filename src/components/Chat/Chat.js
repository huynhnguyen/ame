import React, {useState, useEffect} from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatList } from "./ChatList";
import { ChatMessageList } from "./ChatMessageList";
import { ChatInput } from "./ChatInput";
import { useChat } from "hooks/useChat";

export const Chat = ({botId})=>{
    const [sendMessage, {messages, stream, botTyping, loading, error, members, topics, user}] = useChat({botId});
    return <div className="">
        <ChatHeader user={user} topics={topics}/>
        <ChatList members={null}/>
        <ChatMessageList messages={messages} stream={stream}/>
        <ChatInput sendMessage={sendMessage} botTyping={botTyping}/>
    </div>
}