import React, {useState, useEffect} from "react"
import { useHook } from "hooks/useHook";
const IndexPage = () => {
  const [v, setV] = useState(0);
  const { callHook, hookSlot, hooks, loading, error } = useHook({})
  useEffect(()=>{
    console.log(hooks);
  }, [hooks]);
  return (
    <div className="card">
      <button onClick={()=>setV(v+1)}>{v}</button>
    </div>
  )
}

export default IndexPage;
