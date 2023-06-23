import { useState, useEffect } from "react"
import { useLocalStorage } from 'usehooks-ts';
import { AnyType, Str } from "anytype";
const Message = AnyType({   text: Str(), 
                            by: Str({'default':'user', enum:['bot','user']}),
                            to: [Str(), null],
                            channel: [Str(), null],
                            topic: [Str(), null] });
export const useChatMessages = ({botId})=>{
    const [message, setMessage] = useState();
    const [userMessage, setUserMessage] = useState();
    const [page, setMessagePage] = useLocalStorage(botId+'_page', 0);
    const [messageList, setMessageList] = useLocalStorage(botId+'_messages_'+page, []);
    useEffect(()=>{
        if(message){
            if(message.by==='user'){
                setUserMessage(message);
            }            
            if(messageList.length<10){
                const _messages = [...messageList, message];
                setMessageList(_messages);
            }
            else{
                localStorage.setItem(botId+'_message_'+(page+1), JSON.stringify(messageList));
                setMessagePage(page+1);
                setMessage([message]);
            }
        }
    }, [message])
    const addMessage = (message)=>{
        const {value, error} = Message(message);
        if(!error){
            setUserMessage(value);
        }
                
    }
    return [addMessage, {messageList, userMessage, page}, {setMessagePage}]
}