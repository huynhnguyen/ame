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
    return chatBot?<div className="flex flex-row justify-between items-center border-gray-600">
        <div className=" inline-block">
            <div className="indicator mx-1">
                <span className={[
                    "indicator-item badge badge-xs",
                    chatBot.status=='connected' && "badge-primary",
                    chatBot.status=='streamming' && " badge-info",
                    chatBot.status=='disconnected' && " badge-error"].join(' ')}></span> 
                <label className="px-1 text-black uppercase">{chatBot.name}</label>
            </div>
            <span className=" text-xs text-gray-300">{chatBot.status}</span>
        </div>
        <div className="dropdown dropdown-end mr-2 ">
            <div className=" inline-flex items-center">
                <p className=" text-gray-500">chủ đề</p>
                <label tabIndex={tabIdx} className="btn btn-sm m-1 rounded-none">
                    {chatBot.chatTopic}
                </label>
            </div>
            <ul tabIndex={tabIdx} className="dropdown-content menu p-2 shadow bg-base-100 w-40 rounded-none z-10">
                {chatBot.topics?.map(({topic, description}, idx)=>
                    <li key={idx} 
                        onClick={(e)=>setChatTopic(topic)}>
                        <div className="flex flex-col items-baseline">
                            <h4 className=" text-xl capitalize">{topic}</h4>
                            <p className="text-sm text-gray-600 capitalize">{description}</p>
                        </div>
                    </li>
                )}    
            </ul>
        </div>
    </div>:<div></div>
}