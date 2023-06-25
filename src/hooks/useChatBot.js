import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { useApi } from "./useApi";
export const useChatBot = ({botId})=>{
    const [topics, setTopics] = useState();
    const [chatTopic, setChatTopic] = useState();
    const [channel, setChannel] = useState('web');
    const [bot_avatar, setAvatar] = useState();
    const [friendly_name, setFriendlyName] = useState('bot');
    const [bot_link, setLink] = useState();
    const [bot_notice, setNotice] = useState();
    const [getAccessToken] = useAuth();
    const [requestTopic, requestStatus] = useApi({
        method:'get',
        uri:'bots/chat_topic', 
        getAuthHeader: async ()=>{return await getAccessToken()}})
    useEffect(()=>{
        if(!requestStatus.loading && !requestStatus.error && requestStatus.data){
            const {topics, channel} = requestStatus.data;
            setTopics(topics);
            setChatTopic(topics.length?topics[0].topic:'general')
        }
    }, [requestStatus.loading, requestStatus.error])
    useEffect(()=>{
        if(channel){
            requestTopic({params:{channel}, 
                          headers: {bot_id: botId}})
        }
    }, [channel]);
    return [setChannel, {channel, chatTopic, bot_avatar, friendly_name, bot_link, bot_notice, topics}, {setChatTopic}]
}