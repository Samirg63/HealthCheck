//Types
import type React from "react"
import { useContext, useEffect, useState, type SetStateAction } from "react"

//Components
import APIDots from "./Dots/APIDots"
import GreenDot from "./Dots/GreenDot"
import RedDot from "./Dots/RedDot"
import YellowDot from "./Dots/YellowDot"

import { ClipLoader } from "react-spinners"
import { SitesContext } from "../contexts/sitesContext"
import { MdEdit } from "react-icons/md"
import { FaTrash } from "react-icons/fa6"
import NewSiteForm from "./Forms/NewSiteForm"
import DeletePopup from "./DeletePopup"


type Props = {
    handleFormVisibility:React.Dispatch<SetStateAction<boolean>>,
    
}

const Table = ({handleFormVisibility,}:Props) => {

    const {loading,data} = useContext(SitesContext)
    const [isEditing,setIsEditing] = useState<number | null>(null)
    const [popup,setPopup] = useState<{x:number,y:number,id:string} | null>()


    function getDot(bool:boolean|undefined,title:string):React.ReactNode{
        switch (Boolean(bool)) {
            case true:
                return <GreenDot/>
                
            case false:
                return <RedDot/>
                
            case undefined:
                return <YellowDot title={title}/>
                
        }
    }

    function handleEdit(index?:number ){
        if(typeof index == 'number'){
            handleFormVisibility(false)
            setIsEditing(index)
        }else{
            setIsEditing(null)
        }
    }

    function handleDelete(e:React.MouseEvent<HTMLButtonElement>,id:string){
        const target = e.currentTarget.getBoundingClientRect()
        setPopup({
            x:target.x,
            y:target.y,
            id:id
        })
    }
    

  return (
    <> 
        <div className="flex items-start">
            {
                (popup) &&
                <DeletePopup x={popup.x} y={popup.y} id={popup.id} handlePopupVisibility={setPopup as React.Dispatch<SetStateAction<null>>} key={"deletePopup"}/>
            }

            <table className="w-10/12">
                <thead className="text-lg ">
                    <tr className="text-left">
                        <th className="py-3.25 min-w-25" >Site</th>
                        <th >Front-end</th>
                        <th >Back-end</th>
                        <th >Database</th>
                        <th className="pl-5">APIs</th>
                        
                        
        
                    </tr>
                </thead>
                <tbody>
                    {
                        (loading || !data)?
                        <tr key={"loading"} className="absolute top-1/2 left-1/2 -translate-1/2">
                            <td>
                                <ClipLoader />
                            </td>                       
                        </tr>
                        
                        :
                            

                                Object.keys(data).map((key:string,index:number) =>{
                                    
                                    if(isEditing === index){
                                        return (
                                            <tr key={"Form"} className="relative ">
                                                <td className="pb-10">
                                                    <NewSiteForm handleEdit={handleEdit} type="edit" sitesLength={index} value={{name:key,url:data[key].url,id:data[key].id!}}/>
                                                </td>
                                                
                                            </tr>
                                    )
                                    }else{
                                        return (
                                            <tr className="text-left relative" key={index}>
                                                <td >{key}</td>
                                                <td>{getDot(data[key].frontend.success,"FrontEnd")}</td>
                                                {
                                                    (data[key].backend)?
                                                    <td>{getDot(data[key].backend!.success,"Backend")}</td>
                                                    :
                                                    <td><YellowDot title="backend"/></td>
                                                }
                                                {
                                                    (data[key].database)?
                                                    <td>{getDot(data[key].database!.success,"Database")}</td>      
                                                    :
                                                    <td><YellowDot title="database"/></td>
                                                    
                                                }
                                                {
                                                    (data[key].apis)?                     
                                                    <td>{data[key].apis ? <APIDots APIs={(data[key]).apis}/> : <YellowDot title="APIs"/>}</td>
                                                    :
                                                    <td><YellowDot title="APIs"/></td>
                                                    
                                                }

                                                <td className="absolute right-[-15%] top-3 space-x-4">
                                                    <button onClick={()=>{handleEdit(index)}} className="bg-yellow-400/60 hover:bg-yellow-400/80 duration-200 py-1.5 px-4 rounded-lg text-zinc-100 cursor-pointer">
                                                        <MdEdit />
                                                    </button>
                                                    <button onClick={(e)=>{handleDelete(e,data[key].id!)}} className="bg-red-400/60 hover:bg-red-400/80 duration-200 py-1.5 px-4 rounded-lg text-zinc-100 cursor-pointer">
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                                
                                            </tr>
                                        )
                                    }
                                })
                        
                    }
                    </tbody>


            </table>
            <button onClick={()=>{
                if(isEditing){
                    handleEdit()
                }
                handleFormVisibility(true)
                }} className="bg-Morange text-white py-1 px-4 rounded-xl mt-3 mr-4 w-50 cursor-pointer hover:bg-hover-Morange duration-100">
                Adicionar novo
            </button>
        </div>   
    </>
  )
}

export default Table