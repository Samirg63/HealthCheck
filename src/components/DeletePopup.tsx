import React, { useContext, useEffect, useRef, type SetStateAction } from 'react'
import { useClickAway } from '../hooks/useClickAway'
import { IoMdClose } from 'react-icons/io'
import { FaCheck } from 'react-icons/fa6'
import { SitesServices } from '../services/SitesServices'
import { SitesContext } from '../contexts/sitesContext'

type Props = {
    x:number,
    y:number,
    id:string,
    handlePopupVisibility:React.Dispatch<SetStateAction<null>>
}

const DeletePopup = ({x,y,id,handlePopupVisibility}: Props) => {

    const {deleteSite} = SitesServices()
    const {getHealth} = useContext(SitesContext)

    const popupContainer = useRef<HTMLDivElement>(null)
    useClickAway(popupContainer as React.RefObject<HTMLDivElement>,()=>{
        handlePopupVisibility(null)
    })


    window.addEventListener('resize',()=>{
        handlePopupVisibility(null)
    })

    async function handleDelete(){
        try {
            await deleteSite(id)
            handlePopupVisibility(null)
            await getHealth();
        } catch (error) {
            alert('Something goes wrong')
        }
    }
    
  return (
    <div ref={popupContainer}
    style={{top:y+45,left:x -400}}
    className={`fixed bg-zinc-100 w-120 border border-zinc-700 rounded-lg z-99 py-2 px-4 text-center font-semibold`}>
        {/* arrow */}
        <div className='bg-zinc-100 right-11.5 border-t border-l border-zinc-700 p-2 rotate-45 absolute -top-2.25'></div>

        <p>Tem certeza que deseja apagar esse site?</p>
        <div className="flex gap-4 items-center justify-center mt-4">
                    <button onClick={()=>{handlePopupVisibility(null)}} className="cursor-pointer py-1 px-6 rounded-md bg-error hover:bg-red-500/80 duration-200">
                        <IoMdClose size={22} style={{color:'#f4f4f4'}}/>
                    </button>
                    <button onClick={handleDelete} className="cursor-pointer py-1 px-6 rounded-md bg-success hover:bg-green-500/70 duration-200 text-white">
                        <FaCheck size={22} style={{color:'#f4f4f4'}}/>
                    </button>
                </div>
    </div>
  )
}

export default DeletePopup