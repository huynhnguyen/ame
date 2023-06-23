const ctx = self;
importScripts("https://unpkg.com/xhr-shim@0.1.3/src/index.js");
ctx.XMLHttpRequest = ctx.XMLHttpRequestShim;
// importScripts("https://unpkg.com/pyodide@0.23.3/pyodide.js");

const Ummo = {pyodide: null};
// loadPyodide({}).then((_pyodide) => {
//     Ummo.pyodide = _pyodide;
//     // let namespace = pyodide.globals.get("dict")();
  
//     // pyodide.runPython(
//     //   `
//     //   import json
  
//     //   counter = 0
//     //   def modify_data(data):
//     //       global counter
//     //       counter += 1
//     //       dict = data.to_py()
//     //       dict['count'] = counter
//     //       return dict
//     //   `,
//     //   { globals: namespace },
//     // );
  
//     // // assign the modify_data function from the Python context to a Javascript variable
//     // modifyData = namespace.get("modify_data");
//     // namespace.destroy();
// });  
Ummo.run = (code, function_name, kwargs)=>{
    if(!pyodide){
        console.log('pyodide not ready');
    }
    let namespace = pyodide.globals.get("dict")();
    pyodide.runPython(code,{ globals: namespace },
    );
    // assign the modify_data function from the Python context to a Javascript variable
    let modifyData = namespace.get(function_name);
    namespace.destroy();
    let proxy = modifyData(kwargs);
    let pyproxies = [];
    // Because toJs gives us a Map, we transform it to a plain Javascript object before changing it to JSON
    let result = Object.fromEntries(proxy.toJs({pyproxies}));
    return result;
}

const swfetch = async ({method, url, body, headers}) => {     
    try{
        console.log({ method, url, body, headers })
        
        req.open(method, url);
        
        console.log(resp)
        const data = await resp.data();
        return data;
    }
    catch(err){
        console.log(err);
        return null;
    }
};
const get_hook_list = ({baseURL, authHeaders}, cb)=>{
    return new Promise((resolve, reject)=>{
        const xhr = new ctx.XMLHttpRequest();
        xhr.open('GET', baseURL+'/hooks/list');
        Object.entries(authHeaders).map(([n,v])=>{
            // console.log([n,v])
            xhr.setRequestHeader(n, v);
        })
        xhr.addEventListener('load',()=>{
            resolve(JSON.parse(xhr.response))
        })
        xhr.addEventListener('abort', ()=>{
            reject('abort')
        })
        xhr.send();
    })
    
    // Ummo.hooks = data;
}

const call_hook = async ({baseURL, authHeaders, name, data})=>{
    const body = {name, data};
    const response = await swfetch({method:'POST', url: baseURL+'/hooks', headers: authHeaders, body});
    return response;
}
const EventType = { HookList:'HookList', 
                    CallHook:'CallHook', 
                    WorkerStatus: 'WorkerStatus'};

addEventListener("fetch", (event) => {
    event.waitUntil(
      (async () => {
        // Eg, if it's cross-origin.
        if (!event.clientId) return;
        const client = await ctx.clients.get(event.clientId);
        if (!client) return;
        
        client.postMessage({
          ready: true,
          type: EventType.WorkerStatus,
        });
        
      })()
    );
  });



ctx.addEventListener('message', (event) => {
    const {type, content} = event.data;
    console.log({type, content})
    event.waitUntil(
        (async () => {            
            if(type===EventType.HookList){
                const resp = await get_hook_list({
                    baseURL: content.baseURL, 
                    authHeaders: content.authHeaders}
                );
                ctx.clients.matchAll().then(clients => {
                    clients.forEach(client =>{
                        // console.log(client) 
                        client.postMessage({type, hooks: resp})
                    }); 
                })
            }
            if(type===EventType.CallHook){
        
            }        
        })()
    );
    
    
    // if(modifyData){
    //     let proxy = modifyData({'count':2});
    //     let pyproxies = [];

    //     // Because toJs gives us a Map, we transform it to a plain Javascript object before changing it to JSON
    //     let result = Object.fromEntries(proxy.toJs({pyproxies}));
    //     console.log({result});
    // }
});
ctx.addEventListener("install", function () {
    ctx.skipWaiting();
});
  
// With this, we won't need to reload the page before the service worker can intercept fetch requests
// https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim#examples
ctx.addEventListener("activate", function (event) {
    event.waitUntil(ctx.clients.claim());
});