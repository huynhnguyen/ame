import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { useApi } from "./useApi";
import { AnyType, Str, List } from "anytype";
const ChatBot = AnyType({
                      bot_id: Str(), 
                      bot_avatar: [Str(), null],
                      bot_name: [Str(), null],
                      bot_type: Str(),
                      topics: List({item:{
                        'topic': 'general', 
                        'description': 'general'
                      }}),
                      channel: 'web',
                      status: 'active'});
export const useChatBot = ({botId, getAuthHeader})=>{
    const [topics, setTopics] = useState();
    const [chatTopic, setChatTopic] = useState();
    const [channel, setChannel] = useState('web');
    const [botAvatar, setAvatar] = useState();
    const [botName, setBotName] = useState('bot');
    const [requestTopic, requestStatus] = useApi({method:'get', 
                                                  uri:'bots/profile', 
                                                  dataTransform: ChatBot,
                                                  getAuthHeader})
    useEffect(()=>{
        if(!requestStatus.loading && !requestStatus.error && requestStatus.data){
            const {topics, bot_name, bot_avatar} = requestStatus.data;
            setBotName(bot_name);
            setAvatar(bot_avatar);
            setTopics(topics);
            setChatTopic(topics.length?topics[0].topic:'general')
        }
    }, [requestStatus.loading, requestStatus.error])
    useEffect(()=>{
        if(channel){
            requestTopic({params:{channel}, headers: {'Bot': botId}})
        }
    }, [channel]);
    return [setChannel, {channel, 
                         chatTopic, 
                         botAvatar, 
                         botName, 
                         topics}, {setChatTopic}]
}