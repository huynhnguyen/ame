import React, {useState, useEffect} from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatMember } from "./ChatMember";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { useChat } from "hooks/useChat";

export const Chat = ({botId})=>{
    const [sendMessage, 
            {   chatMessage,  
                chatMember, 
                loading, error, 
                chatBot}, 
            {   setMemberPage, 
                setMessagePage, 
                setChatTopic}] = useChat({botId});
    return <div className={[loading?'':'', error?'':'', 'flex flex-row'].join(' ')}>
        <div className="w-fit">
            <ChatMember 
                chatMember={chatMember} 
                setMemberPage={setMemberPage}/>
        </div>
        <div className="w-full">
        <ChatHeader chatBot={chatBot} 
            setChatTopic={setChatTopic}/>
        <ChatMessage 
            chatMessage={chatMessage}
            botStatus={chatBot.status}
            setMessagePage={setMessagePage}/>
        <ChatInput 
            sendMessage={sendMessage} 
            botTyping={chatBot.typing}/>
        </div>
    </div>
}