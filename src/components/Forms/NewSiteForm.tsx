//Types
import {  useContext, useEffect, type SetStateAction } from "react"
import type React from "react"

//Icons
import { FaCheck } from "react-icons/fa6"
import { IoMdClose } from "react-icons/io"
import { useForm } from "../../hooks/useForm"
import { SitesContext } from "../../contexts/sitesContext"
import { SitesServices } from "../../services/SitesServices"


type Props = {
    handleFormVisibility?:React.Dispatch<SetStateAction<boolean>>,
    handleEdit?:(index?:number)=>void,
    sitesLength:number,
    type?:'edit' | "create",
    value?:{
        name:string,
        url:string,
        id:string
    }
}

const NewSiteForm = ({handleFormVisibility,sitesLength,handleEdit,type = "create",value}:Props) => {
    const {formData,changeHandler,setFormData} = useForm()
    const {createSite,getHealth} = useContext(SitesContext);
    const {update} = SitesServices()
    

    async function handleSubmit(e:React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        if(type == "create" && handleFormVisibility){
            handleFormVisibility(false);
            await createSite(formData as {name:string,url:string})      
        }else if(type == "edit" && handleEdit){
            try {
                await update(formData)
                handleEdit()
                await getHealth()
            } catch (error) {
                throw error
            }
        }
    }

    useEffect(()=>{
        if(value){
            setFormData(value)
        }
    },[])
    
    
  return (
    <form className={`mt-2.5 mx-3 flex justify-between
    ${(type == 'edit')&& "absolute w-[116.5%] left-0 top-0"}
    `}>
        <div className="flex gap-4 w-9/12">
            <input
            onChange={changeHandler}
            className={`border 
                ${(sitesLength%2 == 0) 
                    ? "bg-white "
                    : "border-lightGray bg-zinc-200"
                } border-zinc-500 py-1.5 px-2 rounded-lg w-1/2 focus:outline-zinc-800 `} type="text" name="name" placeholder="Insira o nome do site..."
                value={formData.name}

                />
            
            <input
            onChange={changeHandler}
            className={`border 
                ${(sitesLength%2 == 0) 
                    ? "bg-white "
                    : "border-lightGray bg-zinc-200"
                } border-zinc-500 py-1.5 px-2 rounded-lg w-1/2 focus:outline-zinc-800 `} type="text" name="url" placeholder="Insira o URL do site..."
            value={formData.url}    
                />
        </div>
        <div className="flex gap-4 items-center mr-10">
            <button onClick={()=>{
                if(type === "create"){
                    handleFormVisibility!(false)
                }
                else if(type === "edit"){
                    handleEdit!()
                }
                }} className="cursor-pointer py-1 px-2 rounded-md bg-error">
                <IoMdClose size={22} style={{color:'#f4f4f4'}}/>
            </button>
            <button
            onClick={handleSubmit}
            className="cursor-pointer py-1 px-2 rounded-md bg-success text-white">
                <FaCheck size={22} style={{color:'#f4f4f4'}}/>
            </button>
        </div>
    </form>
  )
}

export default NewSiteForm