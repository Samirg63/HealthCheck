import { useState, type ChangeEvent } from "react";



export function useForm(){
    const [formData,setFormData] = useState({} as {[index:string]:string})
    
    const changeHandler = (e:ChangeEvent<HTMLInputElement>)=>{

        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    return {formData,changeHandler,setFormData}
}