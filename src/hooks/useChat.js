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
    const [getMember, memberStatus, {setMemberPage}] = useChatMembers(
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
            {chunks, 
             reply, 
             status: botStatus}] = useChatSocket({botId, accessToken});
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
            {botChunkMessage, messageList, messagePage}, 
            {setMessagePage, setRoomChat}] = useChatMessages({botId, sendChat, reply, chunks, getProfile, channel });
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
            {   chatMessage: {botChunkMessage, messageList, messagePage},
                chatBot: {topics, channel, chatTopic, name:botName, avatar: botAvatar, 
                    status: botStatus, 
                    typing:['loading', 'streaming'].includes(botStatus)}, 
                loading: memberStatus.loading || botUserStatus.loading,
                error: memberStatus.error || botUserStatus.error,
                chatMember: {members: memberStatus.members, memberPage: memberStatus.memberPage}, 
                chatUser: botUserStatus.user}, 
            {   setMemberPage, 
                setMessagePage, 
                setChatTopic, 
                setRoomChat}]
}