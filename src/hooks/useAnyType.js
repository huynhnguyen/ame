import { AnyType } from "anytype";
import React, {useState, useEffect} from "react";
export const useAnyType = (types)=>{
    const [checker, setChecker] = useState();
    const [value, setData] = useState();
    const [data, setValue] = useState();
    const [error, setError] = useState();
    useEffect(()=>{
        setChecker(AnyType(types));
    }, []);
    useEffect(()=>{
        if(value && checker){
            const data = checker(value);
            setValue(data.value);
            setError(data.error);
        }
    }, [value])
    return [data, setData, error]
}