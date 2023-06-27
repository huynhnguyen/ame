import React, { useEffect } from "react";
import { navigate } from "@reach/router"
import { useBotUser } from "hooks/useBotUser";

function App() {
    const { user, loading, logout } = useBotUser();
    useEffect(()=>{
        if(loading){
            return;
        }
        if(!user){
            navigate('/');
        }
        else{
            logout();
        }
    }, [user, loading])
    return <div>logout</div>;
}

export default ()=><App></App>;