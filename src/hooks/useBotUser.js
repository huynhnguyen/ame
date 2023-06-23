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
                      status: Str()});
export const useBotUser = ({})=>{
    const [user, setUser] = useState();
    const [botId, setBotId] = useState(null);
    const [getAccessToken, {loading, error, accessToken}] = useAuth();
    const [requestUser, requestStatus] = useApi({method:'get', 
                                                uri: 'users/me', 
                                                getAuthHeader: ()=>{}});
    useEffect(()=>{
        if(!requestStatus.loading && !requestStatus.error && requestStatus.data){
            const {value, error} = BotUser(requestStatus.data);
            if(!error){
                setUser(value);
            }
        }
    }, [requestStatus.loading, requestStatus.error]);
    useEffect(()=>{
        if(!loading && !error && accessToken){
            const headers = {'Authorization': "Bearer "+ accessToken}
            if(botId){
                headers['bot_id'] = botId;
            }
            requestUser({headers:headers})
        }
    }, [accessToken, loading, error])
    
    return [setBotId, {user, loading, error}];
}