import React from "react";
import { HookForm } from "./HookForm";
export const HookModal = ({id, hook, callHook})=>{
  const submit = (data)=>{
    callHook && callHook({data:data, name: hook.name});
    window[id].close();
  }
  return <dialog className="modal" id={id}>
    {hook && <div className="bg-white p-4 border rounded-md border-gray-500 ring-2 relative">
      <svg xmlns="http://www.w3.org/2000/svg" 
            fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
            onClick={e=>window[id].close()}
            className="w-8 h-8 absolute top-[-1rem] right-[-1rem] cursor-pointer hover:stroke-gray-600 fill-slate-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <HookForm {...hook} submit={submit} className="bg-white"/>
    </div>}
  </dialog>
}