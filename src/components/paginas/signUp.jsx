  import { useState } from 'react'

  const signUp = ({ onSignUpSuccess }) => {

    const [submitted, setSubmitted] = useState(false)


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

      const userExists = await verificarUsuarioExistente(Nome);
      if (userExists) {
        alert('Nome de usuário já está sendo usado');
        return;
      }

      await EnviarUser(usuario)
      setSubmitted(true)

      setTimeout(() => {
        window.location.href = "/Budget-app/Dashboard";
      }, 500)

      Form.reset()
    }

    const verificarUsuarioExistente = async (Nome) => {
      const Response = await fetch(`http://localhost:3000/Usuarios?id=${Nome}`);
      if (Response.ok) {
        const data = await Response.json();
        return data && data.length > 0;
      }
      return false;
    }


    const EnviarUser = async (usuario) => {
      const Response = await fetch('http://localhost:3000/Usuarios', {
        method : "POST",
        headers : {
          "Content-type" : "application/json"
        },
        body : JSON.stringify(usuario)
      })
      if (Response.ok) {
        const Data = await Response.json()
      }
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