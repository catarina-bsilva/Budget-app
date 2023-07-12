import { useState } from 'react'

const signIn = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = async (event) => {
    event.preventDefault();

    // Verificar a existência do usuário e a correspondência da senha no banco de dados
    const userExists = await verificarUsuarioExistente(username);
    const passwordMatches = await verificarCorrespondenciaSenha(username, password);

    if (userExists && passwordMatches) {
      // Login bem-sucedido, redirecionar para a página do painel
      window.location.href = "/Budget-app/dashboard";
    } else {
      alert('Nome de usuário ou senha inválida');
    }

    // Limpar os campos do formulário
    setUsername('');
    setPassword('');
  };

  const verificarUsuarioExistente = async (username) => {
    const response = await fetch(`http://localhost:3000/Usuarios?id=${username}`);
    if (response.ok) {
      const data = await response.json();
      return data && data.length > 0;
    }
    return false;
  };

  const verificarCorrespondenciaSenha = async (username, password) => {
    const response = await fetch(`http://localhost:3000/Usuarios?id=${username}`);
    if (response.ok) {
      const data = await response.json();
      if (data && data.length > 0) {
        const user = data[0];
        return user.password === password;
      }
    }
    return false;
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