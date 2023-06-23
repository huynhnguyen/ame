import React, {useState, useEffect, useContext} from "react";

export const Header = ({user})=>{
    return (
    <div className="navbar bg-base-300 h-[60px]">
        <div className="flex-1 px-2 lg:flex-none">
            <span>UMMO</span>
        </div> 
        <div className="flex justify-end flex-1 px-2">
            {(!user)?(
                <div className="flex items-center">
                    <a href={'/login'} className="btn btn-ghost rounded-btn">Log in</a> 
                </div>
            ):(<div className="flex items-stretch">
                <div className="dropdown dropdown-end">
                    <label tabIndex="0" className="btn btn-ghost rounded-btn">{user.user_email}</label>
                    <ul tabIndex="0" className="menu dropdown-content shadow bg-base-100 rounded-box w-52 mt-4">
                        {/* <li>
                            <a className="justify-between items-center">
                                <img src="/cash.svg" className="w-6"></img>
                                <span className="badge">{user.role}</span>
                            </a>
                        </li> 
                        <li><a className=" items-center justify-between text-sm">
                                <img src="/usage.svg" className="w-6"></img>
                                <span>{user.usage}/{user.limit}</span>
                            </a></li>  */}
                        
                        <li>{user.id==='demo'
                            ?
                                <a href="/signup" className="btn btn-success rounded-btn">create account</a>
                            :
                                <a href="/logout" className="btn btn-ghost rounded-btn">log out</a>}</li> 
                    </ul>
                </div>
            </div>)}
        </div>
    </div>)
}