import React, {useState, useEffect} from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatMember } from "./ChatMember";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { useChat } from "hooks/useChat";

export const Chat = ({botId})=>{
    const [sendMessage, 
            {   chatMessage, 
                chatting, 
                chatMember, 
                loading, error, 
                chatBot}, 
            {   setMemberPage, 
                setMessagePage, 
                setChatTopic}] = useChat({botId});
    return <div className={[loading?'':'', error?'':'', ''].join(' ')}>
        <div>
            <ChatMember members={chatMember} 
                setMemberPage={setMemberPage}/>
        </div>
        <div>
        <ChatHeader chatBot={chatBot} 
            setChatTopic={setChatTopic}/>
        <ChatMessage 
            chatMessage={chatMessage} 
            setMessagePage={setMessagePage}/>
        <ChatInput 
            sendMessage={sendMessage} 
            botTyping={chatting.typing}/>
        </div>
    </div>
}