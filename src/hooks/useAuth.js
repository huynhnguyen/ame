import { useEffect, useState } from "react"
import Userfront from "@userfront/react";

import { useSearchParams } from "./useSearchParams";

export const useAuth = ()=>{
    const [user, setUser] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [accessToken, setAccessToken] = useState();
    const [params, setParams] = useSearchParams();
    
    useEffect(()=>{
        Userfront.init(process.env.GATSBY_USERFRONT_AUTH, (res)=>{
            setLoading(false);
        })
    }, []);
    
    const getAccessToken = async ()=>{
        if(Userfront?.tokens?.accessToken){
            await Userfront.tokens.refresh();
            setAccessToken(Userfront.tokens.accessToken);
            return {"Authorization": "Bearer "+ Userfront.tokens.accessToken};
        }
        else{
            return null;
        }
    }
    useEffect(()=>{
        if(Userfront.user.email){
            if(params['uuid'] && params['type']=='login'){//reset query param after login
                setParams({'uuid': null, 'token': null, 'type': null});
            }
            setAccessToken(Userfront.tokens.accessToken);
            setLoading(false);
            setError();
        }
    }, [Userfront.user, JSON.stringify(params)]);
    return [getAccessToken, {loading, error, accessToken}];
}