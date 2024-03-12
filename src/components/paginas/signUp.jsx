  import { useState, useContext } from 'react'
  import { useNavigate } from 'react-router-dom'
  import { userContext } from '../context'

  const signUp = ({ onSignUpSuccess }) => {

    const [submitted, setSubmitted] = useState(false)
    const {userState, setUserState} = useContext(userContext)
    const Navigate = useNavigate()

    const verificarUsuarioExistente = (Nome) => {
      const usuarioExistente = userState.some(user => user.id === Nome);
      return usuarioExistente;
    };
  
    const EnviarUser = (usuario) => {
      setUserState(prevUserState => [...prevUserState, usuario]);
    };
    const CriarUser = async (event) => {
      event.preventDefault()
      const Form = document.getElementById('FormSignUp')
      const Nome = document.getElementById('NomeSignUp').value
      const Email = document.getElementById('EmailSignUp').value
      const Password = document.getElementById('PasswordSignUp').value
      const ConfPassword = document.getElementById('ConfirmPassword').value
      

      if (Nome.includes(' ')) {
        alert('Não são permitidos espaços no nome de usuário')
        return
      }
      if (Password!==ConfPassword) {
        alert('Password errada')
        document.getElementById('PasswordSignUp').value = ''
        document.getElementById('ConfirmPassword').value = ''
        return
      }
      
      const usuario = {
        id: Nome,
        email: Email,
        password: Password
      }

      const userExists = verificarUsuarioExistente(Nome);
      if (userExists) {
        alert('Nome de usuário já está sendo usado');
        return;
      }else{
        console.log(usuario)
        EnviarUser(usuario)
        setSubmitted(true)
        setTimeout(() => {
          Navigate("/Budget-app/Dashboard")
      }, 500)
      }
      Form.reset()
    }

    
    return (
      <form id='FormSignUp' onSubmit={CriarUser}>
        <label htmlFor="NomeSignUp" className='NomeUsuario'>Nome de usuário:</label>
        <input type="text" name="NomeSignUp" id="NomeSignUp" required /><br />
        <label htmlFor="EmailSignUp">Email:</label>
        <input type="email" name="EmailSignUp" id="EmailSignUp" required/><br />
        <label htmlFor="PasswordSignUp">Password:</label>
        <input type="password" name="PasswordSignUp" id="PasswordSignUp" required /><br />
        <label id='ConfirmPasswordLabel' htmlFor="ConfirmPassword">Repita Password:</label>
        <input type="password" name="ConfirmPasswordSignUp" id="ConfirmPassword" className="ConfirmPassword" required/><br />
        <input type="submit" value="Confirmar" className='BtnEntrar' />
      </form>
    )
  }

  export default signUp