import React from "react";
import { LocaleSlot } from "components/HookSlot.js/LocaleSlot";

export const HookSlotList = ({hookSlots, loading, callHook})=>{
    return <div className=" m-2">
        {hookSlots?.sort((a, b)=>a.start<b.start)
            .map((hookSlot, idx)=>
                hookSlot.name==='locale'?<LocaleSlot {...hookSlot} key={idx}></LocaleSlot>
                :<>{hookSlot.name}</>
        )}
    </div>
} 