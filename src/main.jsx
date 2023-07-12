import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import NovaDespesa from './components/paginas/despesas/novaDespesa.jsx'
import NovaReceita from './components/paginas/receitas/novaReceita.jsx'
import Dashboard from './components/paginas/dashboard.jsx'
import NovaTransferencia from './components/paginas/transferencias/novaTransferencia.jsx'
import Transacoes from './components/paginas/transações/transacoes.jsx'
import UltimasTransacoes from './components/paginas/transações/ultimasTransacoes.jsx'
import ProximasTransacoes from './components/paginas/transações/proximasTransacoes.jsx'
import AlterarDados from './components/paginas/AlterarDados.jsx'
import Despesas from './components/paginas/despesas/despesas.jsx'
import Receitas from './components/paginas/receitas/receitas.jsx'
import Transferencias from './components/paginas/transferencias/transferencias.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/Budget-app/' element= {<App/>}/>
        <Route path='/Budget-app/Dashboard' element= {<Dashboard/>}/>
        <Route path='/Budget-app/NovaReceita' element= {<NovaReceita/>}/>
        <Route path='/Budget-app/NovaDespesa' element= {<NovaDespesa/>}/>
        <Route path='/Budget-app/NovaTransferencia' element= {<NovaTransferencia/>}/>
        <Route path='/Budget-app/Transacoes' element= {<Transacoes/>}/>
        <Route path='/Budget-app/Transferencias' element= {<Transferencias/>}/>
        <Route path='/Budget-app/Despesas' element= {<Despesas/>}/>
        <Route path='/Budget-app/Receitas' element= {<Receitas/>}/>
        <Route path='/Budget-app/AlterarDados' element= {<AlterarDados/>}/>
        <Route path='/Budget-app/UltimasTransacoes' element= {<UltimasTransacoes/>}/>
        <Route path='/Budget-app/ProximasTransacoes' element= {<ProximasTransacoes/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
