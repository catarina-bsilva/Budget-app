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
import { userContext, budgetContext, transferenciaContext } from './components/context.js'
import { useState, useContext } from 'react'

function AppProviders({ children }) {
  const [userState, setUserState] = useState([
    {
      "id": "joaosantos",
      "email": "joao@gmail.com",
      "password": "olaola"
    },
    {
      "id": "nuno",
      "email": "nuno@gmail.com",
      "password": "nuno"
    },
    {
      "id": "qkjewgbihowfbvwef",
      "email": "s.catarina.b.silva@gmail.com",
      "password": "dddd"
    },
    {
      "id": "sdfhdjgjbgjgh",
      "email": "s.cina.b.silva@gmail.com",
      "password": "qqqq"
    },
    {
      "id": "MARIA",
      "email": "GASJDVNIDFV@GMAIL.COM",
      "password": "JAJAJA"
    },
    {
      "id": "maria",
      "email": "gaga@gmail.com",
      "password": "jua"
    },
    {
      "id": "ana",
      "email": "habv@hadbfd.com",
      "password": "hahaha"
    },
    {
      "id": "carla",
      "email": "ca@gmail.com",
      "password": "carla90"
    },
    {
      "id": "catarina",
      "email": "cvatarina@gmail.com",
      "password": "cata90"
    },
    {
      "id": "mia",
      "email": "mia@gmail.com",
      "password": "miamia"
    }
  ]);
  const [budgetState, setBudgetState] = useState([
    {
      "descricao": "SALDO INICIAL",
      "valor": "3500",
      "data": "2024-01-01",
      "recorrente": false,
      "categoria": "Bonus",
      "conta": "Banco1",
      "operacao": "+",
      "id": 1
    },
    {
      "descricao": "salario",
      "valor": "3000",
      "data": "2024-01-03",
      "recorrente": true,
      "categoria": "Salário",
      "conta": "Banco1",
      "operacao": "+",
      "id": 2
    },
    {
      "descricao": "renda",
      "valor": "1250",
      "data": "2024-01-01",
      "recorrente": true,
      "categoria": "Casa",
      "conta": "Banco1",
      "operacao": "-",
      "id": 3
    },
    {
      "descricao": "prenda",
      "valor": "100",
      "data": "2024-02-09",
      "recorrente": false,
      "categoria": "Prenda",
      "conta": "Carteira",
      "operacao": "+",
      "id": 4
    },
    {
      "descricao": "subsidio ferias",
      "valor": "3000",
      "data": "2024-02-20",
      "recorrente": false,
      "categoria": "Bonus",
      "conta": "Banco2",
      "operacao": "+",
      "id": 5
    },
    {
      "descricao": "voo",
      "valor": "350",
      "data": "2024-09-06",
      "recorrente": false,
      "categoria": "Viagens",
      "conta": "Banco2",
      "operacao": "-",
      "id": 6
    },
    {
      "descricao": "hotel",
      "valor": "190",
      "data": "2024-09-30",
      "recorrente": false,
      "categoria": "Viagens",
      "conta": "Banco2",
      "operacao": "-",
      "id": 7
    },
    {
      "descricao": "seguro saude",
      "valor": "300",
      "data": "2024-03-15",
      "recorrente": true,
      "categoria": "Saúde",
      "conta": "Banco1",
      "operacao": "-",
      "id": 8
    },
    {
      "descricao": "seguro carro",
      "valor": "600",
      "data": "2024-03-30",
      "recorrente": false,
      "categoria": "Carro",
      "conta": "Banco1",
      "operacao": "-",
      "id": 9
    },
    {
      "descricao": "jantar",
      "valor": "56",
      "data": "2024-02-19",
      "recorrente": false,
      "categoria": "Restaurante",
      "conta": "Banco1",
      "operacao": "-",
      "id": 10
    },
    {
      "descricao": "compras",
      "valor": "100",
      "data": "2024-02-12",
      "recorrente": false,
      "categoria": "Supermercado",
      "conta": "Banco1",
      "operacao": "-",
      "id": 11
    },
    {
      "descricao": "bonus",
      "valor": "4000",
      "data": "2024-03-30",
      "recorrente": false,
      "categoria": "Bonus",
      "conta": "Banco1",
      "operacao": "+",
      "id": 12
    },
    {
      "descricao": "prenda",
      "valor": "1000",
      "data": "2024-02-03",
      "recorrente": false,
      "categoria": "Prenda",
      "conta": "Carteira",
      "operacao": "+",
      "id": 13
    },
    {
      "descricao": "indeminizacao",
      "valor": "7000",
      "data": "2024-05-01",
      "recorrente": false,
      "categoria": "Bonus",
      "conta": "Banco1",
      "operacao": "+",
      "id": 14
    },
    {
      "descricao": "salario",
      "valor": "4564",
      "data": "2024-03-27",
      "recorrente": false,
      "categoria": "Salário",
      "conta": "Banco1",
      "operacao": "+",
      "id": 15
    },
    {
      "descricao": "renda",
      "valor": "1300",
      "data": "2024-02-26",
      "recorrente": true,
      "categoria": "Casa",
      "conta": "Banco1",
      "operacao": "-",
      "id": 16
    },
    {
      "descricao": "compras",
      "valor": "200",
      "data": "2024-02-20",
      "recorrente": false,
      "categoria": "Supermercado",
      "conta": "Banco1",
      "operacao": "-",
      "id": 17
    },
    {
      "descricao": "salario",
      "valor": "4000",
      "data": "2024-03-25",
      "recorrente": false,
      "categoria": "Salário",
      "conta": "Carteira",
      "operacao": "+",
      "id": 18
    },
    {
      "descricao": "compras",
      "valor": "500",
      "data": "2024-03-19",
      "recorrente": false,
      "categoria": "Supermercado",
      "conta": "Carteira",
      "operacao": "-",
      "id": 19
    },
    {
      "descricao": "prenda",
      "valor": "400",
      "data": "2024-03-18",
      "recorrente": false,
      "categoria": "Prenda",
      "conta": "Carteira",
      "operacao": "+",
      "id": 20
    },
    {
      "descricao": "gasolina",
      "valor": "70",
      "data": "2024-02-20",
      "recorrente": false,
      "categoria": "Carro",
      "conta": "Banco1",
      "operacao": "-",
      "id": 21
    },
    {
      "descricao": "ordenado",
      "valor": "10000",
      "data": "2024-02-25",
      "recorrente": false,
      "categoria": "Salário",
      "conta": "Banco1",
      "operacao": "+",
      "id": 22
    },
    {
      "descricao": "salario",
      "valor": "8765",
      "data": "2024-14-22",
      "recorrente": false,
      "categoria": "Salário",
      "conta": "Banco1",
      "operacao": "+",
      "id": 23
    }
  ]);
  const [transferenciaState, setTransferenciaState] = useState([
    {
      "valor": "2000",
      "data": "2024-02-03",
      "recorrente": false,
      "contaOrigem": "Banco1",
      "contaDestino": "Banco3",
      "id": 1
    },
    {
      "valor": "3000",
      "data": "2024-01-30",
      "recorrente": false,
      "contaOrigem": "Banco1",
      "contaDestino": "Conta Poupança",
      "id": 2
    },
    {
      "valor": "4000",
      "data": "2024-03-22",
      "recorrente": false,
      "contaOrigem": "Carteira",
      "contaDestino": "Banco1",
      "id": 3
    },
    {
      "valor": "500",
      "data": "2024-02-21",
      "recorrente": false,
      "contaOrigem": "Banco1",
      "contaDestino": "Banco2",
      "id": 4
    }
  ]);

  return (
    <userContext.Provider value={{userState, setUserState}}>
      <budgetContext.Provider value={{budgetState, setBudgetState}}>
        <transferenciaContext.Provider value={{transferenciaState, setTransferenciaState}}>
            {children}
        </transferenciaContext.Provider>
      </budgetContext.Provider>
    </userContext.Provider>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(
<AppProviders>
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
  </React.StrictMode>
</AppProviders>
)