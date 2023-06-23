import { useState, useEffect } from "react";
import { useBotUser } from "./useBotUser";
import { useChatMessages } from "./useChatMessages";
import { useChatMembers } from "./useChatMembers";
import { useChatBot } from "./useChatBot";
export const useChat = ({botId})=>{
    const [setBotId, botUserStatus] = useBotUser({});
    const [setMemberPage, memberStatus] = useChatMembers({botId});
    const [setChannel, {topics, channel, chatTopic}] = useChatBot({botId});
    const [addMessage, {userMessage, messageList, page}, {setMessagePage}] = useChatMessages({botId});
    useEffect(()=>{
        if(botId && botId !== botUserStatus.botId){
            setBotId(botId);
        }
    }, [botId])
    return [addMessage, 
            {   chatMessage: {userMessage, messageList, page},
                bot: {topics, channel}, 
                loading: memberStatus.loading || botUserStatus.loading,
                error: memberStatus.error || botUserStatus.error,
                members: memberStatus.members, 
                user: botUserStatus.user}, 
            {setMemberPage, setMessagePage}]
}