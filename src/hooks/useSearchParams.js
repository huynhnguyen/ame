import React, {useState, useEffect} from "react"
export const useSearchParams = ()=>{
    const [params, setParams] = useState({});
    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search);
        Object.entries(params).map(([k,v])=>{
            if(v==null){
                urlParams.delete(k);
            }
            else{
                urlParams.set(k, v);
            }
        })
        window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
    }, [params]);
    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search);
        const p = {};
        for (let [k,v] of urlParams) {
            p[k] = v;
        }
        setParams(p);
    }, []);
    return [params, setParams];
}