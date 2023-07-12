import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from "../../header/header"
import '../../../styles/geral.sass'
import '../../../styles/transacoes.sass'

const transacoes = () => {

  const [Trans, setTrans] = useState([])

  useEffect(() => {

    const GetTransacao = async() => {
    const Req = await fetch('http://localhost:3000/Budget')
    const Data = await Req.json()

    const sortedData = Data.sort((a, b) => new Date(b.data) - new Date(a.data));
    setTrans(sortedData)

    console.log(Data)

    }
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
            <h1 id='TituloTransacoes'>Transações:</h1>
            <div className="ContainerTransacoes">
              {Trans.map((transacao, index) => (
                <ul key={index}> 
                <li><span className='DataTransacao'>{transacao.data}</span> <span className='DescricaoTransacao'>{transacao.descricao}</span> <span className='ValorTransacao'><span>{transacao.operacao}</span>{transacao.valor}€</span></li>
                </ul>
              ))}
              <p>Saldo actual: <span>{CalcularSaldoAtual()}€</span></p>
            </div>
        </main>
    </div>
  )
}

export default transacoes