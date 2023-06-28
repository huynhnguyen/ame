import { useEffect, useState } from "react";
import { useApi } from "./useApi";
import { AnyType, Str, Int, List, Any } from "anytype";
const ChatMember = AnyType({user_email: Str(), 
    user_id: Str(), 
    user_avatar: [Str(), null],
    user_name: [Str(), null],
    user_phone: [Str(), null],
    user_address: [Str(), null],
    bot_role: Str(),
    role_status: Str(),
    status: Str()});
const MemberRequest = AnyType({page: Int(), page_size: Int()})
const ChatMembers = AnyType({members: List({item: ChatMember}), page: Int()});
export const useChatMembers = ({botId, getAuthHeader})=>{
    const [chatMembers, setChatMembers] = useState([]);
    const [memberPage, setMemberPage] = useState();
    const [requestMember, memberStatus] = useApi({
                                            method:'get', 
                                            uri:'chats/members', 
                                            getAuthHeader});
    const [memberId, setMemberId] = useState();
    useEffect(()=>{
        console.log(memberStatus)
        if(!memberStatus.loading && !memberStatus.error && memberStatus.data){
            const {value, error} = ChatMembers(memberStatus.data);
            console.log({value, error});
            if(!error){
                setChatMembers(value.members);
            }
        }
    }, [memberStatus.loading, memberStatus.error]);
    useEffect(()=>{
        if(botId){
            if(!memberId){
                requestMember({headers:{'Bot': botId}, params: {page: memberPage}});
            }
            else{
                requestMember({headers:{'Bot': botId}, params: {page: memberPage, user_id: memberId}});
            }
        }
    }, [botId, memberId])
    const getMember = async ({user_id})=>{
        let member = null
        if(chatMembers){
            chatMembers?.forEach((_member) => {
                if(user_id===_member.user_id){
                    member = member;
                }
            });
        }
        if(!member){
            return {};
        }
        else{
            return member;
        }
    }
    return [getMember, 
            {members: chatMembers,
             memberPage: memberPage, 
             loading: memberStatus.loading, 
             error: memberStatus.error}, {setMemberPage}]
}