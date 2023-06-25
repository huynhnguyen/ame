import React, { useEffect, useRef, useState } from "react";
const LIMIT = 150;
export const ChatInput = ({sendMessage, botTyping}) => {
    const [value, setValue] = useState("");
    const inputRef = useRef();
    const onChange = (e) => {
        setValue(e.target.value);
    }
    const onSend = ()=>{
        if(!botTyping && value.length > 0 && value.length < LIMIT){
            sendMessage({text: value});
            setValue("");
        }
    }
    const onInput = (e) => {
        if (e.key === "Enter") { 
            onSend();
        }
    };
    return (<div className="form-control w-full p-1">
        <textarea 
            ref={inputRef}
            disabled={botTyping}
            autoFocus={!botTyping}
            onKeyUp={onInput}
            onChange={onChange}
            value={value}
            className="textarea textarea-bordered h-20 w-full rounded-none" placeholder="chat something"></textarea>
        <label className="label">
            <span className="label-text-alt">{value.length}/{LIMIT} tokens</span>
            <button disabled={botTyping || value.length === 0} onClick={onSend} className="btn btn-outline btn-primary btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
            </button>
        </label>
    </div>);
}