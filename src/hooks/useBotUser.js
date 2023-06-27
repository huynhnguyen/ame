import { useEffect, useState } from "react";
import { useAuth } from "./useAuth"
import { useApi } from "./useApi";
import { AnyType, Str } from "anytype";
const BotUser = AnyType({user_email: Str(), 
                      user_id: Str(), 
                      user_avatar: [Str(), null],
                      user_name: [Str(), null],
                      user_phone: [Str(), null],
                      user_address: [Str(), null],
                      bot_role: 'user',
                      role_status: 'active',
                      usage: {
                        'monthly-token': 0, 
                        'monthly-hookcall': 0, 
                        'storage': 0
                      },
                      friendly_name: [Str({default: ''}), null],
                      status: Str()});
export const useBotUser = ({botId: bid}={})=>{
    const [botId, setBotId] = useState(bid);
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const { loading: authLoading, 
            accessToken, 
            error: authError, 
            getAccessToken,
            getBearerHeader,
            logout } = useAuth();
    const [requestUser, requestStatus] = useApi({method:'get', 
                                                uri: 'users/me', 
                                                getAuthHeader: ()=>{}});
    useEffect(()=>{
        if(!requestStatus.loading && !requestStatus.error && requestStatus.data){
            const {value, error} = BotUser(requestStatus.data);
            if(!error){
                value.user_name = value.user_name ??= value.user_email.split('@')[0]
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
        if(!authLoading && !authError){
            if(accessToken){
                const headers = {'Authorization': "Bearer "+ accessToken};
                if(botId){
                    headers['Bot'] = botId;
                }
                requestUser({headers:headers});
            }
            else{
                setError();
                setUser(null);
                setLoading(false);
            }
        }
    }, [botId, accessToken, authLoading, authError])
    
    
    return {user, loading, error, botId, logout, setBotId, getAccessToken, accessToken, getBearerHeader};
}