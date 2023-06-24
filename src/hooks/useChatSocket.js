import { useState, useEffect } from "react"
import { useWebsocket } from "./useWebsocket";
import { useAuth } from "./useAuth";
export const useChatSocket = ({botId})=>{
    const [getAccessToken, {loading: authLoading, accessToken}] = useAuth();
    const [authParams, setAuthParams] = useState();
    useEffect(()=>{
        if(!authLoading && accessToken){
            setAuthParams({'bearer': accessToken, 'bot_id': botId})
        }
    }, [authLoading]);
    const [send, {data, loading, error, chunks, streaming}] = useWebsocket({
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
                reply: data}];
}