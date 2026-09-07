import Cookies from 'js-cookie'

export function useCookie(){
  
    const setCookie = (key:string,data:Object,exp:number = 7):void=>{
        Cookies.set(key,JSON.stringify(data),{expires:exp})
    }
    
    const getCookie = (key:string):Object|false=>{
        const data = Cookies.get(key);
        
        return (data)? JSON.parse(data) : false
    }
    
    const deleteCookie = (key:string)=>{
        Cookies.remove(key)
    }
    
    return {setCookie,getCookie,deleteCookie}
}