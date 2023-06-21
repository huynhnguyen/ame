import React, {useState, useEffect} from "react";
import { HookModal } from "./HookModal";
export const HookBoard = ({hooks, callHook, loading, error})=>{
    const [schema, setSchema] = useState();
    const [defaultData, setDefaultData] = useState();
    return <div className="w-full h-full bg-black">
        <div className=" flex flex-row justify-start items-center">
        {
            hooks?.map(({name, data_schema, default_data, description}, idx)=>{
                return <div 
                    key={idx}
                    onClick={()=>{
                        setDefaultData(default_data);
                        setSchema(data_schema);
                        window.hookmodal.showModal();
                    }}
                    className="tooltip tooltip-bottom" 
                    data-tip={description}>
                    <div className="badge badge-primary">{name}</div>
                </div>
            })
        }
        <HookModal 
            id={'hookmodal'}
            callHook={callHook} 
            schema={schema} 
            defaultData={defaultData}/>
        </div>
    </div>
}