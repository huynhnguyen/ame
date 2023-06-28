import React, {useState, useEffect} from "react";
const MemberProfile = ({avatar, name, phone, email, role, status, opened, onClick})=><div className="p-2 flex flex-row space-x-1 cursor-pointer" onClick={onClick}>
    <div 
        className={["chat-image avatar tooltip tooltip-right", ''].join(' ')} 
        data-tip={email}>
        <div className={[opened?"w-14":"w-8", "rounded-full"].join(' ')}>
            {avatar?<a href={'/'}><img src={avatar} className=""/></a>
            :<svg xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24" 
                strokeWidth={1.5} stroke="currentColor" 
                className="w-13 h-13 ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            }
        </div>
    </div>
    <div className={["w-full text-gray-600", opened?'':'hidden'].join(' ')}>
        <div className=" flex justify-between text-sm items-center">
            <p className=" text-black">{name??='Not advailable'}</p>
            <span className=" text-xs text-primary">{role}</span>
        </div>
        <div className="flex justify-between items-center space-x-1">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-3 h-3">
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <p className="text-xs">{email}</p>
        </div>
        <div className="flex justify-between items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-3 h-3">
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            <p className="text-xs">{phone??='Not available'}</p>
        </div>
    </div>
    </div>

export const ChatMember = ({chatMember, setRoomChat})=>{
    const [opened, setOpen] = useState(true);
    return <div className={[opened?"min-w-10":"","border-r border-gray-700 h-full"].join(' ')}>
        <div className="p-2 flex flex-row hover:bg-slate-300 cursor-pointer space-x-2" onClick={e=>setOpen(o=>!o)}>
            <svg xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-6 h-6">
                <path strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
            {opened && <p>members</p>}
        </div>
        <div className=" space-y-2">
            {chatMember?.members?.map(
                ({user_avatar, user_name, user_email,  user_phone, bot_role, role_status}, idx)=>
                    <MemberProfile 
                        opened={opened}
                        key={idx}
                        name={user_name}
                        role={bot_role}
                        onClick={setRoomChat}
                        status={role_status}
                        avatar={user_avatar} 
                        email={user_email} 
                        phone={user_phone}/>)}
        </div>
    </div>
}