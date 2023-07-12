import { useState } from "react"
import { RxHamburgerMenu } from 'react-icons/rx'
import { FaUserCircle } from 'react-icons/fa'
import '../../styles/header.sass'
import { Link } from 'react-router-dom'

const header = () => {

  const [Menu, setMenu] = useState (false)

  const AbreMenu = () => {
    setMenu(!Menu)
  }

  return (
    <div>
      <header>
          <div id='User'><Link to='/Budget-app/AlterarDados'><FaUserCircle id='UserIcon'/></Link></div>
          <div id='Title'><Link to='/Budget-app/Dashboard'><span id="BudgetHeader">BUDGET</span> </Link></div>
          <div id='Menu'><RxHamburgerMenu onClick={AbreMenu}/></div>
      </header>
      <div id='Quebra'></div>
      <div id='RiscaHeader'></div>
      {Menu ? <div id='ItemsMenu'>
            <ul>
              <li><Link to='/Budget-app/transacoes' className='LinkMenu'>Transações</Link></li>
              <li><Link to='/Budget-app/novareceita' className='LinkMenu'>Nova Receita</Link></li>
              <li><Link to='/Budget-app/novadespesa' className='LinkMenu'>Nova Despesa</Link></li>
              <li><Link to='/Budget-app/novatransferencia' className='LinkMenu'>Nova Transferência</Link></li>
              <li><Link to='/Budget-app/despesas' className='LinkMenu'>Despesas</Link></li>
              <li><Link to='/receitas' className='LinkMenu'>Receitas</Link></li>
              <li><Link to='/Budget-app/transferencias' className='LinkMenu'>Transferências</Link></li>
            </ul>
          </div> : ""}
    </div>

  )
}

export default header