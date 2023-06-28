import { useEffect, useState } from "react"
import Userfront from "@userfront/react";

import { useSearchParams } from "./useSearchParams";

export const useAuth = ()=>{
    const [authed, setAuthed] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [accessToken, setAccessToken] = useState();
    // const [params, setParams] = useSearchParams();
    
    useEffect(()=>{
        Userfront.init(process.env.GATSBY_USERFRONT_AUTH, ()=>{
            console.log('init')
        })
    }, [])
    const getAccessToken = async () =>{
        if(authed){
            return await Userfront.accessToken();
        }
        else{
            return null;
        }
    }
    const getBearerHeader = async ()=>{
        if(authed){
            const accessToken = await Userfront.accessToken();
            setAccessToken(accessToken);
            return {"Authorization": "Bearer "+ accessToken};
        }
        else{
            return null;
        }
    }
    useEffect(()=>{
        const authed = Userfront.user?.email;
        setAuthed(authed);
        if(authed){
            // if(params['uuid'] && params['type']==='login'){//reset query param after login
            //     setParams({'uuid': null, 'token': null, 'type': null});
            // }
            setAccessToken(Userfront.tokens.accessToken);
            setError(null);
            setLoading(false);
        }
        else{
            setAccessToken(null);
            setError();
            setLoading(false);
        }
    }, [Userfront.user]);
    const logout = ()=>{
        Userfront.logout();
    }
    return {loading, error, accessToken, authed, getAccessToken, getBearerHeader, logout};
}