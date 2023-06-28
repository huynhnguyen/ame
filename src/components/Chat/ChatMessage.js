import React, {useState, useEffect, useRef, forwardRef} from "react";
const Profile = ({avatar, name, link, status})=><div className="chat-image avatar">
        <div className="w-10 rounded-full">
            {avatar?<a href={link}><img src={avatar}/></a>
            :<svg xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24" 
                strokeWidth={1.5} stroke="currentColor" 
                className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            }
        </div>
    </div>
    
const ChunkMessage = forwardRef(({chunks, profile}, ref)=>{
    return <div className="chat chat-start opacity-75" ref={ref}>
        <Profile {...(profile??={})}/>
        <div className="chat-bubble">{chunks.join(' ')}</div>
    </div>
});
export const ChatMessage = ({chatMessage, setMessagePage, chatBot})=>{
    const messageRef = useRef();
    useEffect(()=>{
        if(chatMessage.botChunkMessage){
            console.log(messageRef.current)
            messageRef.current?.scrollIntoView({behavior: 'smooth'});
        }
    }, [chatMessage.botChunkMessage])
    return chatMessage?<div className=" h-[calc(100vh-11rem)] bg-stone-300 p-1 overflow-x-auto x-scrollbar">
    {chatMessage.messageList?.map(({as, text, profile}, idx)=><div key={idx} ref={messageRef}
                className={[(as==='bot'||as==='member')?"chat chat-start":"chat chat-end"].join(' ')}>
                <Profile {...(profile??={})}/>
                <div className="chat-bubble">{text}</div>
            </div>)}
    {chatMessage.botChunkMessage && <ChunkMessage {...chatMessage.botChunkMessage} ref={messageRef}/>}
    </div>:<div></div>
}