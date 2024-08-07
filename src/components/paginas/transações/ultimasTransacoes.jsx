
import { useState, useEffect, useContext } from 'react'
import Header from "../../header/header"
import '../../../styles/geral.sass'
import '../../../styles/transacoes.sass'
import { budgetContext } from '../../context'

const ultimasTransacoes = () => {
  const {budgetState, setBudgetState} = useContext(budgetContext)  
  const [Trans, setTrans] = useState([])
  const currentDate = new Date()


  useEffect(() => {

    const GetTransacao = async() => {
      const Data = budgetState

    const sortedData = Data.sort((a, b) => new Date(b.data) - new Date(a.data));
    setTrans(sortedData)
    
    console.log(Data)

    }

    GetTransacao()
  },[])


  return (
    <div>
        <Header/>
        <main>
        <h1 id='TituloTransacoes'>Últimas Transações:</h1>
            <div className="ContainerTransacoes">
            {Trans.map((transacao, index) => {
              const transacaoDate = new Date(transacao.data);
                if (transacaoDate <= currentDate) {
                  return (
                    <ul key={index}>
                      <li><span className='DataTransacao'>{transacao.data}</span> <span className='DescricaoTransacao'>{transacao.descricao}</span> <span className='ValorTransacao'><span>{transacao.operacao}</span>{transacao.valor}</span></li>
                    </ul>
                  );
                }
              return null;
            })}
            </div>
        </main>
    </div>
  )
}

export default ultimasTransacoes