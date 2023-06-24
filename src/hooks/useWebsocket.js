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
            wsCurrent = ws.current;
        }
        return () => {
            if(wsCurrent){
                wsCurrent.close();
            }            
        };
    }, [authParams]);
    useEffect(() => {
        if (!ws.current) return;
        ws.current.onmessage = e => {
            if (isPaused) return;
            const message = JSON.parse(e.data);
            if(message.chunk){
                setStreaming(true);
                setChunks(chs=>chs===undefined
                    ?[message.chunk]:[...chs, message.chunk])
            }
            else{
                setData(message);
                setStreaming(false);
            }
        };
    }, [isPaused]);
    const send = (message)=>{
        if(ws.current){
            ws.current.send(JSON.stringify(message))
        }
    }
    return [send, {data, error, chunks, loading, streaming, connected}];
}