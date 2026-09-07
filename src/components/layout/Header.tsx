//Libs
import { useContext, useState } from "react";

//Icons
import { MdLogout } from "react-icons/md";

//Types
import type { ILoginContext } from "../../types/loginContext";

//Contexts
import { loginContext } from "../../contexts/loginContext";

//Services
import { AuthService } from "../../services/AuthService";

const Header = () => {

    const [tempLogoutVisibility] = useState<boolean>(true)
    const {isLogged} = useContext<ILoginContext>(loginContext)
    const {logout} = AuthService()
    
    

    
    



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