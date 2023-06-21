import { useState, useEffect } from "react"
import { AnyType, Str } from "anytype";
import { useAuth } from "./useAuth";
import { useApi } from "./useApi";
import { useUmmoWorker } from "./useUmmoWorker";
export const useHook = ({})=>{
    const BaseURL = 'http://localhost:4000';
    const [getAccessToken, {user}] = useAuth();
    const {worker, data} = useUmmoWorker({});
    const getAuthHeader = async ()=>{
        const accessToken = await getAccessToken();
        if(accessToken){
            return accessToken;
        }
        else{
            return {token: 'A-a478264f466c4a2b9f1d4327116d2760'}
        }
    }
    const [hookCaller, callHook] = useState();
    const [hooks, setHooks] = useState();
    const [hookSlot, setHookSlot] = useState();
    const [loading, setHookLoading] = useState(true);
    const [requestList, listStatus] = useApi({
                                        method:'get',
                                        uri:'hooks/list',
                                        getAuthHeader: getAuthHeader, 
                                        baseUrl: BaseURL})
    const [requestHook, hookStatus] = useApi({
                                            method:'post',
                                            uri:'hooks',
                                            getAuthHeader: getAuthHeader, 
                                            baseUrl: BaseURL})
    useEffect(()=>{
        console.log(listStatus)
        if(listStatus.data && !listStatus.loading && !listStatus.error){
            setHooks(listStatus.data);
        }
    }, [listStatus]);
    useEffect(()=>{
        if(!listStatus.loading){
            requestList({});
        }
    }, []);
    return {hooks, hookSlot, callHook, loading}
}