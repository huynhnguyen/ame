import { useState, useEffect, memo } from "react"
import { useLocalStorage } from 'usehooks-ts';
import { AnyType, Str } from "anytype";
const Message = AnyType({   text: Str(), 
                            by: Str(),
                            to: 'bot',
                            as: 'user',
                            channel: 'web',
                            topic: 'general' });

const Profile = AnyType({
    name: [null, Str({default:'user'})], 
    avatar: [null, Str({default:''})]
});

const ChatMessage = AnyType({   text: Str(), 
                                by: Str(),
                                to: 'bot',
                                as: 'user',
                                channel: 'web',
                                profile: Profile,
                                topic: 'general' });

export const useChatMessages = ({botId, sendChat, reply, chunks,
                                pageSize, getProfile, channel})=>{
    const [message, setMessage] = useState();
    const [lastMessage, setlastMessage] = useState();
    const [messagePage, setMessagePage] = useLocalStorage(botId+'_page', 0);
    const [messageList, setMessageList] = useLocalStorage(botId+'_messages_'+messagePage, []);
    const [chatMessage, setChatMessage] = useState();
    useEffect(()=>{
        const {value, error} = ChatMessage(chatMessage);
        if(!error){
            pageSize = pageSize ??= 2;
            if(chatMessage){
                const _messages = [...messageList, chatMessage];
                setMessageList(_messages);         
                if(_messages.length>pageSize){
                    localStorage.setItem(botId+'_message_'+(messagePage+1), 
                        JSON.stringify(messageList));
                    setMessagePage(messagePage+1);
                    setMessageList([chatMessage]);
                }
                setlastMessage(chatMessage);   
            }
        }
        
    }, [chatMessage])
    useEffect(()=>{
        if(reply){
            setChatMessage({...reply, as:'bot'})
        }
        if(chunks){
            setlastMessage(m=>({...m, text: chunks.join(' '), as:'bot', to: m.by, by: m.to}))
        }
    }, [reply, chunks])
    useEffect(()=>{
        if(message){
            console.log('send', message)
            sendChat(message);    
            (async () => {
                const profile = await getProfile(message);
                setChatMessage({...message, profile})
            })();
        }
    }, [message])
    const addMessage = (message)=>{        
        const {value, error} = Message({...message, channel, as: 'user'});
        if(!error){
            setMessage(value);
        }
        else{
            console.error({message, error})
        }
                
    }
    return [addMessage, {messageList, lastMessage, messagePage}, {setMessagePage}]
}