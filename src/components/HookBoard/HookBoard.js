import React, {useState, useEffect} from "react";
import { HookModal } from "./HookModal";
import { HookSlotList } from "./HookSlostList";
export const HookBoard = ({hooks, callHook, loading, error, hookSlots})=>{
    const [hook, setHook] = useState({});
    return <div className="w-full h-full bg-gray-400">
        <div className=" flex flex-row justify-start items-center space-x-2 p-1 border-b border-primary">
        {
            hooks?.map(({name, data_schema, default_data, description}, idx)=>{
                return <div 
                    key={idx}
                    onClick={()=>{
                        if(!loading){
                            setHook({defaultData: default_data, 
                                schema: data_schema, 
                                name: name, 
                                description: description});
                            window.hookmodal.showModal();
                        }
                    }}
                    className="tooltip tooltip-bottom" 
                    data-tip={description}>
                    <div className="badge badge-primary m-1 cursor-pointer">{name}</div>
                </div>
            })
        }
        <HookModal 
            id={'hookmodal'}
            callHook={callHook} 
            hook={hook}/>
        </div>
        <HookSlotList hookSlots={hookSlots} callHook={callHook}/>
    </div>
}