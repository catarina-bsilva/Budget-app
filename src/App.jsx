import { useState } from "react"
import Header from "./components/header/header"
import './styles/geral.sass'
import './styles/paginaInicial.sass'
import SignIn from "./components/paginas/signIn"
import SignUp from "./components/paginas/signUp"

function App() {

  const [PageSignUp, setPageSignUp] = useState (true)

  const AlterarConteudo = () => {
    setPageSignUp(!PageSignUp)
  }

  return (
    <div>
      <Header/>
      <main>
        <div id="TituloRegisto">
        <h1 id="TituloRegistar">
            {PageSignUp ? 'Registar' : 'Entrar'}
          </h1> 
        </div>
        <div id="ContainerSignIn">
        {PageSignUp ? <SignUp/> : <SignIn/>}
        <p id="LinkAlteraConteudo">
          {PageSignUp ? "Já está registado? Clique" : "Ainda não está registado? Clique"}{' '}
          <span onClick={AlterarConteudo}>aqui!</span>
        </p>
  
        </div>
      </main>
    </div>
  )
}

export default App
