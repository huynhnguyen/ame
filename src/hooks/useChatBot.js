import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { useApi } from "./useApi";
export const useChatBot = ({botId})=>{
    const [topic, setTopics] = useState();
    const [chatTopic, setChatTopic] = useState();
    const [channel, setChannel] = useState('web');
    const [getAccessToken] = useAuth();
    const [requestTopic, requestStatus] = useApi({
        method:'post',
        uri:'bots/topics', 
        getAuthHeader: async ()=>{return await getAccessToken()}})
    useEffect(()=>{
        if(!requestStatus.loading && !requestStatus.error && requestStatus.data){
            setTopics(requestStatus.data)
        }
    }, [requestStatus.loading, requestStatus.error])
    useEffect(()=>{
        if(channel){
            requestTopic({body:{channel}, headers: {channel}})
        }
    }, [channel]);
    return [setChannel, {channel, chatTopic, topic}, {setChatTopic}]
}