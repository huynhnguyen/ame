import React, {useState, useEffect} from "react"
export const useScroll = (rowRef)=>{
    const scroll = (e)=>{
        const el = e.target;
        const scrollX = rowRef.current.scrollLeft
        const bodyRect = rowRef.current.getBoundingClientRect();
        const elemRect = el.getBoundingClientRect();
        const absoluteElementTop = scrollX + elemRect.x - (bodyRect.width/2 + bodyRect.x);
        rowRef.current.scroll({top: 0, left: absoluteElementTop, behavior: "smooth"});
    }
    useEffect(()=>{
    }, [rowRef]);
    return scroll;
}