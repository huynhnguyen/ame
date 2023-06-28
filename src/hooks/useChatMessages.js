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
    const [botChunkMessage, setChunkMessage] = useState();
    const [messageList, setMessageList] = useState([]);
    const [chatMessage, setChatMessage] = useState();
    const [roomChat, setRoom] = useState(botId);
    const [pageIndex, setPageIndex] = useLocalStorage(roomChat+'_page', 0);
    useEffect(()=>{
        const {value, error} = ChatMessage(chatMessage);
        if(!error){
            pageSize = pageSize ??= 2;
            if(chatMessage){
                const _messages = [...messageList, chatMessage];
                setMessageList(_messages);       
                if(_messages.length>pageSize){
                    localStorage.setItem(botId + '_message_page_' + (pageIndex+1), 
                        JSON.stringify(_messages.slice(-pageSize)));
                    setPageIndex(pageIndex+1);
                }
            }
        }        
    }, [chatMessage]);
    const setRoomChat = ({user_id, room_id})=>{
        room_id = room_id??='direct_'+user_id;
        if(room_id!==roomChat){
            setRoom(room_id);
            setMessageList([]);
            set
        }
    }
    useEffect(()=>{
        if(chunks){
            (async () => {
                const profile = await getProfile({...chunks, as: 'bot'});
                setChunkMessage({chunks: chunks, profile, as:'bot'})
            })();
        }
    }, [chunks]);
    useEffect(()=>{
        if(reply){
            (async () => {
                setChunkMessage(null);
                const profile = await getProfile({...reply, as: 'bot'});
                setChatMessage({...reply, profile, as: 'bot'})
            })();
        }
    }, [reply])
    useEffect(()=>{
        if(message){
            sendChat(message);    
            (async () => {
                const profile = await getProfile(message);
                setChatMessage({...message, profile})
            })();
        }
    }, [message])
    const addMessage = (message)=>{        
        const {value, error} = Message({...message, room: roomChat, channel, as: 'user'});
        if(!error){
            setMessage(value);
        }
        else{
            console.error({message, error})
        }
                
    }
    const setMessagePage = (index)=>{
        setPageIndex(index);
    }
    return [addMessage, {messageList, botChunkMessage, pageIndex}, {setMessagePage}]
}