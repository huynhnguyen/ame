import { useState, useEffect } from "react"
import { useWebsocket } from "./useWebsocket";
export const useChatSocket = ({botId, accessToken})=>{
    const [authParams, setAuthParams] = useState();
    useEffect(()=>{
        console.log({botId, accessToken})
        if(accessToken && botId){
            setAuthParams({'bearer': accessToken, 'bot_id': botId})
        }
    }, [accessToken, botId]);
    const [send, {data, loading, error, chunks, streaming, connected}] = useWebsocket({
        uri: 'chats/ws',
        authParams
    });
    const sendMessage = (message)=>{
        send(message);
    }
    return [sendMessage, {
                typing: streaming, 
                chunks:chunks, 
                error:error, 
                loading: loading,
                status: connected?streaming?'streamming':'connected':'disconnected',
                reply: data}];
}