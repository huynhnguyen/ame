import { useEffect } from "react";
import { useBotUser } from "./useBotUser";
import { useChatMessages } from "./useChatMessages";
import { useChatMembers } from "./useChatMembers";
import { useChatBot } from "./useChatBot";
import { useChatSocket } from "./useChatSocket";
export const useChat = ({botId})=>{
    const [setBotId, botUserStatus] = useBotUser({});
    const [setMemberPage, memberStatus] = useChatMembers({botId});
    const [sendChat, 
            {typing, chunks, error, reply}] = useChatSocket({botId});
    const [setChannel, 
            {topics, channel, chatTopic}, 
            {setChatTopic}] = useChatBot({botId});
    const [addMessage, 
            {userMessage, messageList, messagePage}, 
            {setMessagePage}] = useChatMessages({botId, sendChat, reply});
    useEffect(()=>{
        if(botId && botId !== botUserStatus.botId){
            setBotId(botId);
            setChannel('web');
        }
    }, [botId]);
    const sendMessage = (message)=>{
        if(botUserStatus.user){
            const userId = botUserStatus.user.user_id;
            addMessage({...message, by: userId});
        }
    }
    return [sendMessage, 
            {   chatting:{typing, chunks, error}, 
                chatMessage: {userMessage, messageList, messagePage},
                chatBot: {topics, channel, chatTopic}, 
                loading: memberStatus.loading || botUserStatus.loading,
                error: memberStatus.error || botUserStatus.error,
                chatMembers: memberStatus.members, 
                user: botUserStatus.user}, 
            {setMemberPage, setMessagePage, setChatTopic}]
}