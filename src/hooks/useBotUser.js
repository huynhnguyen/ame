import { useEffect, useState } from "react";
import { useAuth } from "./useAuth"
import { AnyType, Str } from "anytype";
import { useApi } from "./useApi";
const BotUser = AnyType({user_email: Str(), 
                      user_id: Str(), 
                      user_avatar: [Str(), null],
                      user_name: [Str(), null],
                      user_phone: [Str(), null],
                      user_address: [Str(), null],
                      friendly_name: [Str({default: ''}), null],
                      status: Str()});
export const useBotUser = ()=>{
    const [user, setUser] = useState();
    const [botId, setBotId] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [getAccessToken, 
            {loading: authLoading, 
             accessToken, 
             error: authError}] = useAuth();
    const [requestUser, requestStatus] = useApi({method:'get', 
                                                uri: 'users/me', 
                                                getAuthHeader: ()=>{}});
    useEffect(()=>{
        if(!requestStatus.loading && !requestStatus.error && requestStatus.data){
            const {value, error} = BotUser(requestStatus.data);
            if(!error){
                setUser(value);
                setLoading(false);
            }
            else{
                setError(error);
                setLoading(false);
            }
        }
    }, [requestStatus.loading, requestStatus.error]);
    useEffect(()=>{
        console.log({accessToken, authLoading, authError});
        if(!authLoading && !authError){
            if(accessToken){
                const headers = {'Authorization': "Bearer "+ accessToken}
                if(botId){
                    headers['bot_id'] = botId;
                }
                requestUser({headers:headers});
            }
            else{
                setError();
                setUser(null);
                setLoading(false);
            }
        }
    }, [accessToken, authLoading, authError])
    
    return [setBotId, {user, loading, error, botId}];
}