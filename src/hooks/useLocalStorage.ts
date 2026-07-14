export function useLocalStorage(){

    const setData =  (key:string,data:Object)=>{
         localStorage.setItem(key,JSON.stringify(data))
    }

    const getData = (key:string)=>{
        const data = JSON.parse(localStorage.getItem(key)!)

        return (data)? data : false;
    }

    const deleteData = (key:string)=>{
        localStorage.removeItem(key);
    }

    return {setData,getData,deleteData}
}