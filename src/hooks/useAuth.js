import { useEffect, useState } from "react"
import Userfront from "@userfront/react";
import { AnyType, Str } from "anytype";
import { useSearchParams } from "./useSearchParams";
const User = AnyType({email: Str(), user_id: Str()});
export const useAuth = ()=>{
    const [user, setUser] = useState();
    const [accessToken, setAccessToken] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [params, setParams] = useSearchParams();
    useEffect(()=>{
        Userfront.init("7n8j878n", (res)=>{
            setLoading(false);
        })
    }, []);
    useEffect(()=>{
        if(Userfront.user.email){
            if(params['uuid'] && params['type']=='login'){
                setParams({'uuid': null, 'token': null, 'type': null});
            }
            const uuser = Userfront.user;
            const {value, error} = User({
                "email": uuser.email,
                "user_id": uuser.userId
            })
            setUser(value);
        }
        else{
            console.log('user logout')
        }   
    }, [Userfront.user, JSON.stringify(params)]);
    const getAccessToken = async ()=>{
        if(!user){
            return null;
        }
        else{
            await Userfront.tokens.refresh()
            return Userfront.tokens.accessToken;
        }
    }
    
    return [getAccessToken, {user, loading, error}];
}