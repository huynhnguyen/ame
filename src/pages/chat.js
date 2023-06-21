import React, {useState, useEffect} from "react"
import { useHook } from "hooks/useHook";
import { HookBoard } from "components/HookBoard/HookBoard";
const IndexPage = () => {
  const [v, setV] = useState(0);
  const { callHook, hookSlot, hooks, loading, error } = useHook({})
  useEffect(()=>{
    console.log(hooks);
  }, [hooks]);
  return (
    <HookBoard hooks={hooks} callHook={callHook}/>
  )
}

export default IndexPage;
