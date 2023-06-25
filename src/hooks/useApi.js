import React, {useState, useEffect} from "react";
import axios from "axios";

export const useApi = ({method, 
                        baseUrl,
                        getAuthHeader,
                        uri, dataTransform})=>{
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [api, setApi] = useState();
    useEffect(()=>{
        (async ()=>{
            if(api){
                const {body, params, headers} = api;
                const authHeader = (getAuthHeader)?await getAuthHeader():{};
                setError();
                setData();
                setLoading(true);
                baseUrl = baseUrl??=process.env.GATSBY_API_URL;
                try{
                    axios({
                        method: method??='post',
                        url: baseUrl  + '/' + uri,
                        params: params,
                        headers: {
                            'content-type': 'application/json',
                            ...authHeader,
                            ...headers
                        },
                        data: body
                    }).then(response=>{
                        const data = response.data;                    
                        if(dataTransform){
                            setData(dataTransform(data));
                        }
                        else{
                            setData(data);
                        }
                        setLoading(false);
                    }).catch(err=>{
                        setError(err.response?err.response.status:err.code);
                        setLoading(false);
                    })
                }
                catch(err){
                    console.log('err')
                    setError('SERVERDOWN');
                    setLoading(false);
                }
            }
        })()
        
    }, [api]);
    return [setApi, {data, loading, error}];
}