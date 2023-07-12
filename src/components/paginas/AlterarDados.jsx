import Header from "../header/header"
import { Link } from 'react-router-dom'
import { HiOutlinePencil } from 'react-icons/hi'

const AlterarDados = () => {
  return (
    
    <div>
        <Header/>
        <main>
            <h1 id='TituloPagina'>Alterar Dados</h1>
            <div id="ContainerSignIn">
                <form id='FormSignUp'>
                    <label htmlFor="AlterarNome">Nome de usuário:</label>
                    <input type="text" name="AlterarNome" id="AlterarNome" required/><HiOutlinePencil className="Caneta"/><br />
                    <label htmlFor="AlterarEmail">Email:</label>
                    <input type="email" name="AlterarEmail" id="AlterarEmail"required/><HiOutlinePencil className="Caneta"/><br />
                    <label htmlFor="AlterarPassword">Password:</label>
                    <input type="password" name="AlterarPassword" id="AlterarPassword" required/><HiOutlinePencil className="Caneta"/><br />
                    <label id='ConfirmPasswordLabel' htmlFor="ConfirmNovaPassword">Repita Password:</label>
                    <input type="password" name="ConfirmPassword" id="ConfirmNovaPassword" className="ConfirmPassword" required/><br />
                    <Link to='/Budget-app/dashboard' className='Link'><input type="submit" value="Confirmar" className='BtnEntrar'/></Link>
                </form>
            </div>
            <Link to='/Budget-app/' className='Link'><h2>Mudar de Usuário</h2></Link>
        </main>
    </div>
  )
}

export default AlterarDados