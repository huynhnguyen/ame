import React, {useState, useEffect} from "react"
import { useBotUser } from "hooks/useBotUser";
import { Header } from "components/Header/Header";
const IndexPage = () => {
  const {user, loading, error} = useBotUser({});
  return (
    <div>
      <Header user={user} loading={loading} error={error}/>
    </div>
  )
}

export default IndexPage;
