import { useState, useEffect } from "react"
import { useWebsocket } from "./useWebsocket";
export const useChatSocket = ({botId, accessToken})=>{
    const [authParams, setAuthParams] = useState();
    useEffect(()=>{
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
                status: connected?loading?'loading':streaming?'streaming':'connected':'disconnected',
                reply: data}];
}