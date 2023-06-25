import { useEffect, useState } from "react";
import { useApi } from "./useApi";
import { AnyType, Str, Int, List, Any } from "anytype";
import { useAuth } from "./useAuth"
const ChatMember = AnyType({user_email: Str(), 
    user_id: Str(), 
    user_avatar: [Str(), null],
    user_name: [Str(), null],
    user_phone: [Str(), null],
    user_address: [Str(), null],
    status: Str()});
const MemberRequest = AnyType({page: Int(), page_size: Int()})
const ChatMembers = AnyType({members: List({item: ChatMember}), page: Int(), page_size: Int()});
export const useChatMembers = ({botId})=>{
    const [chatMembers, setChatMembers] = useState();
    const [getAccessToken] = useAuth();
    const [requestMember, memberStatus] = useApi({
                                            method:'post', 
                                            uri:'bot/members', 
                                            getAuthHeader: async ()=>{return await getAccessToken()}})
    useEffect(()=>{
        if(!memberStatus.loading && !!memberStatus.error && memberStatus.data){
            console.log(memberStatus.data);
            const {value, error} = ChatMembers(memberStatus.data);
            if(!error){
                setChatMembers(value);
            }
        }
    }, [memberStatus.loading, memberStatus.error]);
    const getBotMembers = (request)=>{
        const {value, error} = MemberRequest(request)
        if(!error){
            requestMember({params:value})
        }
    }
    const getMember = async ({user_id})=>{
        let member = null
        chatMembers.forEach((_member) => {
            if(user_id===_member.user_id){
                member = member;
            }
        });
        if(!member){
            return {};
        }
        else{
            return member;
        }
    }   
    return [getBotMembers, 
            {members: chatMembers, 
             loading: memberStatus.loading, 
             error: memberStatus.error},
            {getMember}]
}