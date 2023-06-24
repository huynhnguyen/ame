import React, { useState, useEffect } from "react";
export const ChatHeader = ({chatBot, setChatTopic})=>{
    const [tabIdx, setTabIdx] = useState();
    useEffect(()=>{
        chatBot.topics?.map(({topic}, idx)=>{
            if(topic === chatBot.chatTopic){
                setTabIdx(idx);
            }
        })
    }, [chatBot.chatTopic])
    return chatBot?<div className="flex flex-row justify-between items-center bg-gray-400 border-gray-600">
        <div className="dropdown">
            <label tabIndex={tabIdx} className="btn btn-sm m-1">{chatBot.chatTopic}</label>
            <ul tabIndex={tabIdx} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                {chatBot.topics?.map(({topic, description}, idx)=>
                    <li key={idx} 
                        onClick={(e)=>setChatTopic(topic)} 
                        className="tooltip tooltip-right" 
                        data-tip={description}>
                        <a>{topic}</a>
                    </li>
                )}    
            </ul>
        </div>
        <label className="m-2 text-white uppercase">{chatBot.channel}</label>
    </div>:<div></div>
}