export function useLocalStorage(){

    const setData =  (key:string,data:Object)=>{
         localStorage.setItem(key,JSON.stringify({...data,exp:1000*60*60*24,createdAt:Date.now()}))
    }

    const getData = (key:string)=>{
        const data = JSON.parse(localStorage.getItem(key)!)
        
        if((Date.now() - data?.createdAt) > data?.exp){
            deleteData(key);
            return false
        }

        return (data)? data : false;
    }

    const deleteData = (key:string)=>{
        localStorage.removeItem(key);
    }

    return {setData,getData,deleteData}
}