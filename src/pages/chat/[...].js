import React, {useState, useEffect} from "react";
import { useBotUser } from "../../hooks/useBotUser";
import { Chat } from "components/Chat/Chat";
import { Router } from "@reach/router"
import { PrivateRoute } from "components/PrivateRoute/PrivateRoute";
const Ask = ()=><div>Ask</div>
const ChatPage = () => {
  return (
    <Router basepath="/chat">
      <PrivateRoute path='/:botId' component={Chat}/>
      <Ask path='/'/>
    </Router>
  )
}

export default ChatPage;
