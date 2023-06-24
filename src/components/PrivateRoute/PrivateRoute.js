
import React, { useEffect } from "react";
import { navigate } from "gatsby";
import { useBotUser } from "hooks/useBotUser";
import { Loader } from "components/Loader/Loader";
import { useParams } from "@reach/router";
export const PrivateRoute = ({ component: Component, location, ...rest }) => {    
    const params = useParams();
    const [setBot, {user, loading, botId}] = useBotUser({});
    useEffect(()=>{
        if(params.botId){
            setBot(botId);
        }
        else{
            throw Error('oop!')
        }
    }, [])
    useEffect(()=>{
        if(loading){
            return;
        }
        if(!loading && !user && location.pathname !== `/login`){
            navigate("/login")
        }    
    }, [loading, user])
    return loading?<Loader/>:<Component {...rest} botId={params.botId}/>
}