import { useEffect } from "react";
import { useBotUser } from "./useBotUser";
import { useChatMessages } from "./useChatMessages";
import { useChatMembers } from "./useChatMembers";
import { useChatBot } from "./useChatBot";
import { useChatSocket } from "./useChatSocket";
export const useChat = ({botId})=>{
    const [setBotId, botUserStatus] = useBotUser({});
    const [setMemberPage, memberStatus, {getMember}] = useChatMembers({botId});
    const [sendChat, 
            {typing, chunks, error, reply}] = useChatSocket({botId});
    const [setChannel, 
            {topics, 
                channel, 
                chatTopic, 
                bot_avatar, 
                fiendly_name, bot_notice}, 
            {setChatTopic}] = useChatBot({botId});
    const getProfile = async({by, as})=>{
        console.log({as, by})
        if(as==='bot'){
            return {avatar: bot_avatar, name: fiendly_name}
        }
        if(as==='user'){
            console.log(botUserStatus)
            const {user_avatar, friendly_name} = botUserStatus.user;
            return {avatar: user_avatar, name: fiendly_name}
        }
        if(by){
            const {user_avatar, user_name} = await getMember({user_id: by})
            return {avatar: null, name: null}
        }
        return {avatar: null, name: null}
        
    }
    const [addMessage, 
            {userMessage, messageList, messagePage}, 
            {setMessagePage}] = useChatMessages({botId, sendChat, reply, getProfile });
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