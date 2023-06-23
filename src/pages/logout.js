import React, { useContext, useEffect } from "react";
import { logout } from "@userfront/core";
import { navigate } from "@reach/router"
import { useAuth } from "hooks/useAuth";

function App() {
    const { user } = useAuth();
    useEffect(()=>{
        if(!user){
            navigate('/');
        }
        else{
            logout();
        }
    }, [user])
    return <div>logout</div>;
}

export default ()=><App></App>;