import { useState, useEffect, memo } from "react"
import { useLocalStorage } from 'usehooks-ts';
import { AnyType, Str } from "anytype";
const Message = AnyType({   text: Str(), 
                            by: Str(),
                            to: 'bot',
                            as: 'user',
                            channel: 'web',
                            topic: 'general' });
const ChatMessage = AnyType({   text: Str(), 
                                by: Str(),
                                to: 'bot',
                                as: 'user',
                                channel: 'web',
                                profile: {name: [null, Str({default:'user'})], 
                                          avatar: [null, Str({default:''})]},
                                topic: 'general' });

export const useChatMessages = ({botId, sendChat, reply, pageSize, getProfile})=>{
    const [message, setMessage] = useState();
    const [userMessage, setUserMessage] = useState();
    const [messagePage, setMessagePage] = useLocalStorage(botId+'_page', 0);
    const [messageList, setMessageList] = useLocalStorage(botId+'_messages_'+messagePage, []);
    useEffect(()=>{
        if(!message){
            return;
        }
        (async () => {
            const profile = await getProfile(message);
            console.log({profile});
            const {value, error} = ChatMessage({...message, profile });
            if(error){
                console.error({message, error});
                return;
            }
            const chatMessage = value;
            pageSize = pageSize ??= 2;
            if(chatMessage){
                if(chatMessage.as==='user'){
                    console.log(chatMessage)
                    setUserMessage(chatMessage);
                }   
                const _messages = [...messageList, chatMessage];
                setMessageList(_messages);         
                if(_messages.length>pageSize){
                    localStorage.setItem(botId+'_message_'+(messagePage+1), 
                        JSON.stringify(messageList));
                    setMessagePage(messagePage+1);
                    setMessage([chatMessage]);
                }
            }
        })();
    }, [message, reply])
    const addMessage = (message)=>{
        const {value, error} = Message(message);
        if(!error){
            setMessage(value);
            // sendChat(value)
        }
        else{
            console.error({message, error})
        }
                
    }
    return [addMessage, {messageList, userMessage, messagePage}, {setMessagePage}]
}