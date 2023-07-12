import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from "../header/header"
import '../../styles/geral.sass'
import '../../styles/dashboard.sass'

const dashboard = () => {

  const [Trans, setTrans] = useState([])
  const [UltTrans, setUltTrans] = useState([])
  const [ProxTrans, setProxTrans] = useState([])
  const currentDate = new Date()

  useEffect(() => {

    const GetTransacao = async() => {
      const Req = await fetch('http://localhost:3000/Budget')
      const Data = await Req.json()
  
      const sortedData = Data.sort((a, b) => new Date(b.data) - new Date(a.data));
      setTrans(sortedData)
  
    
  
      }

    const GetUltTransacao = async() => {
    const Req = await fetch('http://localhost:3000/Budget')
    const Data = await Req.json()

    const currentDate = new Date()
    const sortedData = Data.sort((a, b) => new Date(b.data) - new Date(a.data));
    const filteredData = sortedData.filter(transacao => new Date(transacao.data) <= currentDate).slice(0, 5);
    setUltTrans(filteredData)
    
      console.log(filteredData)
    }
    
    const GetProxTransacao = async() => {
      const Req = await fetch('http://localhost:3000/Budget')
      const Data = await Req.json()
  
      const currentDate = new Date()
      const sortedData = Data.sort((a, b) => new Date(a.data) - new Date(b.data));
      const filteredData = sortedData.filter(transacao => currentDate <= new Date(transacao.data)).slice(0, 5);
      setProxTrans(filteredData)
      
  
      }
    GetProxTransacao()
    GetUltTransacao()
    GetTransacao()
  },[])

  const CalcularSaldoAtual = () => {
    let saldo = 0;
    for (const transacao of Trans) {
      if (transacao.operacao === '+') {
        saldo += parseFloat(transacao.valor);
      } else if (transacao.operacao === '-') {
        saldo -= parseFloat(transacao.valor);
      }
    }
    return saldo;
  };

  return (
    <div>
      <Header/>
      <main>
        <h1 id="SaldoDashboard">Saldo Actual:<br/><span>{CalcularSaldoAtual()}€</span></h1>
        <div id="ContainerDashboard">
          <div className="DashboardCard">
            <h3>Últimas Transações:</h3>
            {UltTrans.map((transacao, index) => {
              return (
                    <ul key={index}>
                      <li>
                        <span className='DataTransacao'>{transacao.data}</span>
                        <span className='DescricaoTransacao'>{transacao.descricao}</span>
                        <span className='ValorTransacao'><span>{transacao.operacao}</span>{transacao.valor}€</span>
                      </li>
                    </ul>
              )
            })}
            
            <Link to="/Budget-app/UltimasTransacoes"><button className='BtnVerMais'>Ver Mais</button></Link>
          </div>
          <div id='DashboardLinks'>
            <Link to="/Budget-app/NovaReceita" className='Link'>Adicionar Nova Receita</Link>
            <Link to="/Budget-app/NovaDespesa" className='Link'>Adicionar Nova Despesa</Link>
            <Link to="/Budget-app/NovaTransferencia" className='Link'>Adicionar Nova Transferência</Link>
          </div>
          <div className="DashboardCard">
            <h3>Próximas Transações:</h3>
            {ProxTrans.map((transacao, index) => {
              return (
                    <ul key={index}>
                      <li>
                        <span className='DataTransacao'>{transacao.data}</span>
                        <span className='DescricaoTransacao'>{transacao.descricao}</span>
                        <span className='ValorTransacao'><span>{transacao.operacao}</span>{transacao.valor}€</span>
                      </li>
                    </ul>
              )
            })}
            <Link to="/Budget-app/ProximasTransacoes"><button className='BtnVerMais'>Ver Mais</button></Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default dashboard