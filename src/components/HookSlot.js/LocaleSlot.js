import React from "react";
import { toDate } from "./utils";
export const LocaleSlot = ({friendly_name, name, start, eslapse, data, slots})=>{
    return <div>
        <div className=" text-lg uppercase text-black py-2">{friendly_name??=name}</div>
        {slots.map((slot, idx)=><div key={idx}>{JSON.stringify(slot)}</div>)}
        <div className=" py-2 text-sm flex flex-row justify-end items-center space-x-1">
            <div>
                {toDate(start)}
            </div>
            <div>
                {parseInt(eslapse*1000)} ms
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 cursor-pointer">
                <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
            </svg>
        </div>
    </div>
}