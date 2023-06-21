export const unregister = async (registration)=>{
    return await registration.unregister(); //bool
}
export const register = async (path="/ummo_sw.js",options={}) => {
    if ("serviceWorker" in navigator) {
        try {
            let registration = await navigator.serviceWorker.register(path, {scope: "/"});
            const getStatus = () =>  registration.active?'active'
                                        :registration.waiting?'waiting'
                                        :registration.installing?'installing':'installing';  
            
            const send = (data)=>{
                if(registration.active){
                    registration.active.postMessage(data);
                }
                else{
                    console.error('service worker not ready');
                }
            }
            const onReceive = (cb)=>{
                navigator.serviceWorker.addEventListener("message", cb);
            }
            
        return {send, onReceive, getStatus};
        
        } catch (error) {
        console.error(`Registration failed with ${error}`);
        }
  }
};
