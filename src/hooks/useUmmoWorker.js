import {useEffect, useState} from "react";
import {register} from "./worker";
export const useUmmoWorker = ({})=>{
    const [worker, setWorker] = useState();
    const [message, setMessage] = useState();
    useEffect(()=>{
        (async ()=>{
            const ummo = await register();  
            ummo.onReceive(e=>{
                setMessage(e.data)
            });
            setWorker(ummo);
        })();
    }, []);
    return {worker, message}
}