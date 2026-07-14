

//Components
import { useContext, useEffect, useState } from "react";
import Container from "./components/layout/Container/Container";
import Header from "./components/layout/Header";
import NewSiteForm from "./components/Forms/NewSiteForm";
import Table from "./components/Table";
import AuthForm from "./components/Forms/AuthForm";
import {loginContext} from "./contexts/loginContext";
import { SitesContext } from "./contexts/sitesContext";
import { AuthService } from "./services/AuthService";


function App() {
  
  const [formVisibility,setFormVisibility] = useState<boolean>(false)
  const {isLogged} = useContext(loginContext)
  const {data,getHealth} = useContext(SitesContext)
  const {verifyToken} = AuthService();
  
  useEffect(()=>{
    async function fetchData(){
        await getHealth();    
    }

    if(isLogged){
      fetchData()
    }

  },[isLogged])
  

  return (
      
      <section className="mx-12 font-[roboto] h-full">
        <Header />
        <Container>
          {
            (!isLogged)?
            <AuthForm/>
            :
            <>
              <Table handleFormVisibility={setFormVisibility}  />

              {
                (formVisibility) &&
                <NewSiteForm handleFormVisibility={setFormVisibility} sitesLength={Object.keys(data).length}/>
              }
            </>
          }
        </Container>
      </section>
    
  )
}

export default App
