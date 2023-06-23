import { useState, useEffect, useRef } from "react"
export const useWebsocket = ({getAuthHeader, url})=>{
    const [isPaused, setPause] = useState(false);
    const [data, setData] = useState();
    const [chunks, setChunks] = useState();
    const ws = useRef(null);
    useEffect(() => {
        ws.current = new WebSocket("wss://"+url);
        ws.current.onopen = () => console.log("ws opened");
        ws.current.onclose = () => console.log("ws closed");
        const wsCurrent = ws.current;
        return () => {
            wsCurrent.close();
        };
    }, [url]);
    useEffect(() => {
        if (!ws.current) return;
        ws.current.onmessage = e => {
            if (isPaused) return;
            const message = JSON.parse(e.data);
            console.log("e", message);
        };
    }, [isPaused]);
    return {data, error, chunks};
}