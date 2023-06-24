import React, {useState, useEffect} from "react";
export const ChatMessage = ({chatMessage, setMessagePage, chatMember})=>{
    return chatMessage?<div className="h-full">
    {chatMessage.messageList?.map(({by, as, text, profile}, idx)=>
    <div key={idx} 
                className={[as==='bot'?"chat chat-start":"chat chat-end"].join(' ')}>
                <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    {profile?.avatar?<a href={profile?.link}><img src={profile.avatar}/></a>
                    :<svg xmlns="http://www.w3.org/2000/svg" 
                        fill="none" viewBox="0 0 24 24" 
                        strokeWidth={1.5} stroke="currentColor" 
                        className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    }
                </div>
                </div>
                <div className="chat-bubble">{text}</div>
            </div>)}
    </div>:<div></div>
}