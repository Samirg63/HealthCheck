import { useContext, useState, type MouseEvent } from "react";
import { useForm } from "../../hooks/useForm"
import { AuthService } from "../../services/AuthService";

import Input from "../Input"
import { loginContext } from "../../contexts/loginContext";
import { ClipLoader } from "react-spinners";
import type { INotificationContext } from "../../types/ContextTypes/INotificationContext";
import { NotificationContext } from "../../contexts/notificationContext";


const AuthForm = () => {

  const {formData,changeHandler} = useForm();
  const [loading,setLoading] = useState<boolean>(false);
  const {login} = AuthService();
  
  const {setIsLogged} = useContext(loginContext)
  const {newNotification} = useContext<INotificationContext>(NotificationContext)

  async function submitHandler(e?:MouseEvent<HTMLButtonElement>){

    if(e) e.preventDefault();

    try {
      setLoading(true)
      await login(formData as {email:string,password:string})
      setIsLogged(true)
      newNotification("Conectado com sucesso!",true, "Bem-vindo(a) de volta!")
    } catch (error) {
      console.error(error)
    }finally{
      setLoading(false);
    }
  }

  function handleKeyBoard(e:React.KeyboardEvent<HTMLFormElement>){


    if(e.key == 'Tab'){

      
      const inputs = Array.from(document.querySelectorAll('input:not([disabled])'));
      const curIndex = inputs.indexOf(document.activeElement as HTMLInputElement)
      if(curIndex == -1) return;
      
      e.preventDefault();
      
      const nextIndex:number = e.shiftKey ? (curIndex - 1 + inputs.length) % inputs.length : (curIndex + 1 ) % inputs.length;
      
      (inputs[nextIndex] as HTMLInputElement).focus();
    }else if(e.key == 'Enter'){
      e.preventDefault()

      submitHandler()
    }
      
  }

  return (
    <div className="bg-lightGray min-w-125 w-4/12  p-4 boxShadow rounded-lg absolute top-1/2 left-1/2 -translate-1/2">
      <h2 className="text-3xl font-light text-zinc-700 text-center">Conecte-se</h2>
      <form onKeyDown={handleKeyBoard}>
        <Input name="email" label="E-mail" placeholder="Digite seu E-mail..." handleChange={changeHandler}></Input>
        <Input name="password" label="Senha" type="password" placeholder="Digite sua senha..." handleChange={changeHandler}></Input>
        <button disabled={loading} tabIndex={-1} onClick={submitHandler} 
        className={`
          ${loading ? "cursor-wait": "cursor-pointer"}
          bg-Morange flex items-center justify-center h-8 w-40 mx-auto  py-1 px-12 mt-10 rounded-lg 
         hover:bg-hover-Morange disabled:bg-Morange/60 duration-200`}>
          {
            (loading)?
              <ClipLoader color="white" size={19}/>
            :
            <span className="text-white ">Conectar</span>
          }
          
        </button>
      </form>
    </div>
  )
}

export default AuthForm