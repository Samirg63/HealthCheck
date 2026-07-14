import { useContext, type MouseEvent } from "react";
import { useForm } from "../../hooks/useForm"
import { AuthService } from "../../services/AuthService";

import Input from "../Input"
import { loginContext } from "../../contexts/loginContext";


const AuthForm = () => {

  const {formData,changeHandler} = useForm();
  const {login} = AuthService();
  
  const {setIsLogged} = useContext(loginContext)

  async function submitHandler(e?:MouseEvent<HTMLButtonElement>){

    if(e) e.preventDefault();

    try {
      await login(formData as {email:string,password:string})
      setIsLogged(true)
    } catch (error) {
      console.error(error)
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
        <button tabIndex={-1} onClick={submitHandler} className="bg-Morange text-white text-center mx-auto block py-1 px-12 mt-10 rounded-lg cursor-pointer hover:bg-hover-Morange duration-200">
          Conectar
        </button>
      </form>
    </div>
  )
}

export default AuthForm