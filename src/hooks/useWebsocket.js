import { useState, useEffect, useRef } from "react";
const ParamStr = (params)=>{
    let strBuilder = [];
    for (var key in params) {
        strBuilder.push(
            encodeURIComponent(key)+'='+encodeURIComponent(params[key]));
    }
    return '?'+strBuilder.join('&');
}
export const useWebsocket = ({authParams, baseUrl, uri})=>{
    const [isPaused, setPause] = useState(false);
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [chunks, setChunks] = useState();
    const [streaming, setStreaming] = useState();
    const [connected, setConnected] = useState(false);
    const ws = useRef(null);
    useEffect(() => {
        let wsCurrent;
        if(authParams){
            baseUrl = baseUrl??=process.env.GATSBY_API_URL.replace('http://','ws://').replace('https://','ws://');
            const paramStr = ParamStr(authParams);
            ws.current = new WebSocket(baseUrl+'/'+uri+paramStr);
            ws.current.onopen = () => {
                console.log("ws opened")
                setConnected(true);
                setLoading(false);
            };
            ws.current.onclose = () =>{
                console.log("ws closed")
                setConnected(false);
                setLoading(false);
            };
            ws.current.onmessage = e => {
                setLoading(false);
                if (isPaused) return;
                const message = JSON.parse(e.data);
                console.log(['onMessage', message.chunk_message])
                if(message.chunk_message){
                    setStreaming(true);
                    setChunks(chs=>chs===undefined
                        ?[message.chunk_message]:[...chs, message.chunk_message])
                }
                else{
                    setStreaming(false);
                    setData(message);
                }
            };
            wsCurrent = ws.current;
        }
        return () => {
            if(wsCurrent){
                wsCurrent.close();
            }            
        };
    }, [authParams]);
    const send = (message)=>{
        if(connected && !streaming && !loading){
            console.log('send', message)
            ws.current.send(JSON.stringify(message))
            setLoading(true);
        }
    }
    return [send, {data, error, chunks, loading, streaming, connected}];
}