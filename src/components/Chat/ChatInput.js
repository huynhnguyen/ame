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
        }
    }
    const onInput = (e) => {
        if (e.key === "Enter") { 
            onSend();
        }
    };
    return (<div className="form-control w-full">
        <textarea 
            ref={inputRef}
            disabled={botTyping}
            autoFocus={!botTyping}
            onKeyUp={onInput}
            onChange={onChange}
            value={value}
            className="textarea textarea-bordered h-24 w-full" placeholder="chat something"></textarea>
        <label className="label">
            <span className="label-text-alt">{value.length}/{LIMIT} tokens</span>
            <button disabled={botTyping || value.length === 0} onClick={onSend} className="btn">Send</button>
        </label>
    </div>);
}