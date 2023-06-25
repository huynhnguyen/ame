import React from "react";
import { useHook } from "hooks/useHook";
import { HookBoard } from "components/HookBoard/HookBoard";
export const ChatHook = ({})=>{
    const { callHook, hookSlots, hooks, loading, error } = useHook({})
    useEffect(()=>{
        console.log(hooks);
    }, [hooks]);
    return <HookBoard 
                hooks={hooks} 
                callHook={callHook} 
                hookSlots={hookSlots} 
                loading={loading} 
                error={error}/>
}