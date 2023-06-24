import { useState, useEffect } from "react"
import { AnyType, Float, Str, Any } from "anytype";
import { useAuth } from "./useAuth";
import { useApi } from "./useApi";
import { useUmmoWorker } from "./useUmmoWorker";
export const HookSlot = AnyType({name: Str(), 
                                start: Float(), 
                                eslapse: Float(),
                                slots: Array({items: Any(), default: []})})
export const HookCaller = AnyType({name: Str(), data: Any()});
export const useHook = ({})=>{
    const BaseURL = process.env.GATSBY_API_URL;
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
    const [hookSlots, setHookSlot] = useState();
    const [loading, setHookLoading] = useState(true);
    const [requestList, listStatus] = useApi({
                                        method:'get',
                                        uri:'hooks/list',
                                        getAuthHeader: getAuthHeader, 
                                        baseUrl: BaseURL})
    const [requestHook, requestStatus] = useApi({
                                            method:'post',
                                            uri:'hooks',
                                            getAuthHeader: getAuthHeader, 
                                            baseUrl: BaseURL});
    useEffect(()=>{
        if(listStatus.data && !listStatus.loading && !listStatus.error){
            setHooks(listStatus.data);
            setHookLoading(false);
        }
    }, [listStatus.loading, listStatus.error]);
    useEffect(()=>{
        if(!listStatus.loading){
            requestList({});
            setHookLoading(true);
        }
    }, []);
    useEffect(()=>{
        if(requestStatus.data && !requestStatus.loading && !requestStatus.error){
            const nh = requestStatus.data;
            setHookSlot(hs=>{
                let found = false;
                hs = hs??=[];
                hs = hs.map(h=>{
                    if(h.name===nh.name){
                        found = true;
                        return nh;
                    }
                    else{
                        return h;
                    }
                })
                if(!found){
                    return [...hs, nh]
                }
                else{
                    return hs
                }
            });
            setHookLoading(false);
        }
    }, [requestStatus.data, requestStatus.error])
    useEffect(()=>{
        if(!requestStatus.loading && !loading && hookCaller){
            requestHook({body:hookCaller});
            setHookLoading(true);
        }
    }, [JSON.stringify(hookCaller)])
    return {hooks, hookSlots, callHook, loading}
}