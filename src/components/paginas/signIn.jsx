import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../context'

const signIn = () => {
  
  const {userState, setUserState} = useContext(userContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const Navigate = useNavigate()

  const handleSignIn = async (event) => {
    event.preventDefault();

    // Verificar a existência do usuário e a correspondência da senha no banco de dados
    const userExists = await verificarUsuarioExistente(username);
    const passwordMatches = await verificarCorrespondenciaSenha(username, password);

    if (userExists && passwordMatches) {
      // Login bem-sucedido, redirecionar para a página do painel
      Navigate("/Budget-app/Dashboard")
    } else {
      alert('Nome de usuário ou senha inválida');
    }

    // Limpar os campos do formulário
    setUsername('');
    setPassword('');
  };

  const verificarUsuarioExistente = async (username) => {
    const usuarioExistente = userState.some(user => user.id === username)
    if (usuarioExistente){
      return true
    } else {
      return false
    }
  };

  const verificarCorrespondenciaSenha = async (username, password) => {
    const usuario = userState.find(user => user.id === username);
    if (usuario && usuario.password === password) {
      return true;
    } else {
    // Se o usuário não existir ou a senha não corresponder, retorna false
    return false;
    }
  } 

  return (
    <form id='FormSignIn' onSubmit={handleSignIn}>
      <label htmlFor="Nome" className='NomeUsuario'>Nome de usuário:</label>
      <input type="text" name="Nome" id="Nome" value={username} onChange={(event) => setUsername(event.target.value)}/><br />
      <label htmlFor="Password">Password:</label>
      <input type="password" name="Password" id="Password" value={password} onChange={(event) => setPassword(event.target.value)}/><br />
      <input type="submit" value="Confirmar" id='BtnEntrar'/>
    </form>
  )
}

export default signIn