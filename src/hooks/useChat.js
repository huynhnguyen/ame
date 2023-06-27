import { useEffect } from "react";
import { useBotUser } from "./useBotUser";
import { useChatMessages } from "./useChatMessages";
import { useChatMembers } from "./useChatMembers";
import { useChatBot } from "./useChatBot";
import { useChatSocket } from "./useChatSocket";
export const useChat = ({botId})=>{
    const { setBotId, 
            getBearerHeader, 
            accessToken, ...botUserStatus} = useBotUser({botId});
    const [setMemberPage, 
            memberStatus, {getMember}] = useChatMembers(
                {botId, getAuthHeader: async ()=> await getBearerHeader()});
    const [setChannel, 
            {   topics, 
                channel, 
                chatTopic, 
                botAvatar, 
                botName}, 
            {setChatTopic}] = useChatBot({botId, 
                getAuthHeader: async ()=> await getBearerHeader()});
    const [sendChat, 
                {typing, chunks, error, reply, status}] = useChatSocket({botId, accessToken});
    const getProfile = async({by, as})=>{
        console.log({as, by})
        if(as==='bot'){
            return {avatar: botAvatar, name: botName}
        }
        if(as==='user'){
            const {user_avatar, user_name} = botUserStatus.user;
            return {avatar: user_avatar, name: user_name}
        }
        if(as){
            const {user_avatar, user_name} = await getMember({user_id: by})
            return {avatar: user_avatar, name: user_name}
        }
        return {avatar: null, name: null};
    }
    const [addMessage, 
            {lastMessage, messageList, messagePage}, 
            {setMessagePage}] = useChatMessages({botId, sendChat, reply, chunks, getProfile, channel });
    useEffect(()=>{
        if(botId){
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
                chatMessage: {lastMessage, messageList, messagePage},
                chatBot: {topics, channel, chatTopic, botName, botAvatar, status}, 
                loading: memberStatus.loading || botUserStatus.loading,
                error: memberStatus.error || botUserStatus.error,
                chatMembers: memberStatus.members, 
                user: botUserStatus.user}, 
            {setMemberPage, setMessagePage, setChatTopic}]
}