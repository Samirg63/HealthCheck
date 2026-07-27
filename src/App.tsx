

//Components
import { useContext, useState } from "react";
import Container from "./components/layout/Container/Container";
import Header from "./components/layout/Header";
import NewSiteForm from "./components/Forms/NewSiteForm";
import Table from "./components/Table";
import AuthForm from "./components/Forms/AuthForm";
import {loginContext} from "./contexts/loginContext";
import { SitesContext } from "./contexts/sitesContext";



function App() {
  
  const [formVisibility,setFormVisibility] = useState<boolean>(false)
  const {isLogged} = useContext(loginContext)
  const {data} = useContext(SitesContext)
  

  return (
      
      <section className="mx-12 font-[roboto] h-full">
        <Header />
        <Container>
          {
            (!isLogged )?
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
