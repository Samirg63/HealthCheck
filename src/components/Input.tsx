import { useState, type ChangeEvent, type MouseEvent } from "react";
import { FaRegEye,FaRegEyeSlash } from "react-icons/fa";


type Props = {
    placeholder:string,
    label:string,
    handleChange:(e:ChangeEvent<HTMLInputElement>)=>void,
    type?:string,
    name:string
}

const Input = ({placeholder,label,type,name,handleChange}: Props) => {

    
    const [inputType,setInputType] = useState<string>(type ? type : 'text')

    function handleShowPassword(e:MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        

        if(inputType == 'text'){
            setInputType('password')
        }else{
            setInputType('text')
        }
    }

  return (
    <div className="flex flex-col mb-4">
        <label className="font-bold mb-1.5">{label}:</label>
        <div className="relative">
            <input autoComplete={(type == 'password') ? "off" : "on"} data-testid={`input-${name}`} onChange={handleChange} name={name} className="bg-white py-2 px-4 rounded-xl border border-zinc-300 w-full" type={inputType} placeholder={placeholder} />
            {
                (type == 'password') &&
                <button tabIndex={-1} onClick={handleShowPassword} className="cursor-pointer  absolute top-3 right-3">
                    {
                        (inputType == "text") ?
                        <FaRegEyeSlash size={18} color="rgb(50,50,50)"/>
                        :
                        <FaRegEye size={18} color="rgb(50,50,50)"/>
                    }
                </button>
            }
        </div>
    </div>
  )
}

export default Input