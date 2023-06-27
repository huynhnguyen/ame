import React, {useState, useEffect, useContext} from "react";

export const Header = ({user, loading})=>{
    return (
    <div className="navbar bg-base-300">
        <div className="flex-1 px-2 lg:flex-none">
            <span>UMMO</span>
        </div> 
        <div className={
            ["flex justify-end flex-1 px-2", 
            loading?"":""].join(' ')}>
            {(!user)?(
                <div className="flex items-center">
                    <a href={'/login'} className="btn rounded-none">Log in</a> 
                </div>
            ):(<div className="flex items-stretch">
                <div className="dropdown dropdown-end">
                    <label tabIndex="0" className="btn btn-ghost rounded-none">{user.user_name}</label>
                    <ul tabIndex="0" 
                        className={[
                            " text-gray-500 p-0",
                            "menu dropdown-content shadow bg-base-100"].join(' ')}>
                        <li 
                            className="p-1">
                            <div className="flex flex-row justify-between items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                                    stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                                </svg>
                                <span>{user.user_email}</span>
                            </div>
                        </li> 
                        <li className="p-1">
                            <div className="flex flex-row justify-between items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                                    strokeWidth={1.5} 
                                    stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                                </svg>
                                <span>
                                    <span>{user.bot_role}</span>
                                    <span className=" text-xs text-purple-400 badge">
                                        {user.role_status}
                                    </span>
                                </span>
                            </div>
                            <div className="flex flex-col justify-end items-end">
                                {Object.entries(user.usage).map(([k, v], idx)=>
                                    <div className=" space-x-3 font-thin" key={idx}>
                                        <span>{k}</span><span className="  text-purple-900">{v}</span>
                                    </div>    
                                )}
                            </div>
                        </li> 
                        <li>
                            <a 
                                href="/logout" 
                                className="btn btn-ghost btn-sm rounded-none">
                                    log out
                            </a>
                        </li> 
                    </ul>
                </div>
            </div>)}
        </div>
    </div>)
}