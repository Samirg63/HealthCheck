import { useContext, useState } from "react";

//Icons
import { MdLogout } from "react-icons/md";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { loginContext } from "../../contexts/loginContext";
import type { ILoginContext } from "../../types/loginContext";

const Header = () => {

    const [tempLogoutVisibility] = useState<boolean>(true)
    const {isLogged,setIsLogged} = useContext<ILoginContext>(loginContext)
    const {deleteData} = useLocalStorage(); 
    
    function logout(){
      deleteData('token')
      setIsLogged(false);
    }

  return (
    <header className="py-4 px-2 flex justify-between">
        <a href="/">
          <h1 className="text-Morange text-3xl font-light">Health-Check</h1>
        </a>
        {
          (tempLogoutVisibility) &&
          <button onClick={logout} className="cursor-pointer" hidden={!isLogged}>
            <MdLogout size={24} color="#141414" />
          </button>
        }
      </header>
  )
}

export default Header