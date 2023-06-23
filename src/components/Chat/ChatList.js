import React, {useState, useEffect} from "react";
export const ChatList = ({members})=>{
    return <div>
        {members?.map(({user_avatar, user_name, user_email, user_phone, user_notice}, idx)=>{
            <div className="avatar">
                
            </div>
        })}
    </div>
}