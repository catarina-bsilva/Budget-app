import { useState, useEffect, useContext } from 'react'
import Header from "../../header/header"
import '../../../styles/geral.sass'
import '../../../styles/transacoes.sass'
import { icons } from '../../icons'
import { IconContext } from 'react-icons'
import { userContext, budgetContext, transferenciaContext, useTransferenciaContext } from '../../../components/context'
import Categ from '../../../../bd.json'

const transferencias = () => {
  const {budgetState, setBudgetState} = useContext (budgetContext)  
  const { transferenciaState, setTransferenciaState } = useTransferenciaContext()
  const [Trans, setTrans] = useState([])
  const [Transferencia, setTransferencia] = useState([])
  const [conta, setConta] = useState([])
  const [TotalPorConta, setTotalPorConta] = useState({})

  useEffect(() => {

    const GetTransacao = async() => {
      const Data = budgetState

    const sortedData = Data.sort((a, b) => new Date(b.data) - new Date(a.data));
    setTrans(sortedData)

    console.log(Data)

    }
    GetTransacao()
  },[])

  useEffect(() => {

    const GetTransferencia = async() => {
      const Data = transferenciaState

    const sortedData = Data.sort((a, b) => new Date(b.data) - new Date(a.data));
    setTransferencia(sortedData)

    console.log(Data)

    }
    GetTransferencia()
  },[])

  useEffect(() => {

    const GetTransacao = async() => {
      const Data = budgetState

    const sortedData = Data.sort((a, b) => new Date(b.data) - new Date(a.data));
    setTrans(sortedData)

    console.log(Data)

    }
    GetTransacao()
  },[])

  

  useEffect(()=>{
    
    const GetConta = async() => {
      const Data = Categ.Categorias
      setConta(Data[0].Contas)
    }

    GetConta()
    
  },[])

  useEffect(() => {
    const CalcularTotalPorConta = () => {
      const TotalTransacao = {}
      const TotalTransferencia = {}

      Trans.forEach((transacao) => {
        const ContaTransacao = transacao.conta;
        const ValorTransacao = parseFloat(transacao.valor);
  
        if (transacao.operacao === '+') {
          if (ContaTransacao in TotalTransacao) {
            TotalTransacao[ContaTransacao] += ValorTransacao;
          } else {
            TotalTransacao[ContaTransacao] = ValorTransacao;
          }
        } else if (transacao.operacao === '-') {
          if (ContaTransacao in TotalTransacao) {
            TotalTransacao[ContaTransacao] -= ValorTransacao;
          } else {
            TotalTransacao[ContaTransacao] = -ValorTransacao;
          }
        }
      })

      Transferencia.forEach(transacao => {
          
          const ContaOrigem = transacao.contaOrigem
          const ContaDestino = transacao.contaDestino
          const ValorTransacao = parseFloat(transacao.valor)

          if (ContaOrigem in TotalTransferencia) {
            TotalTransferencia[ContaOrigem] -= parseFloat(ValorTransacao);
          } else {
            TotalTransferencia[ContaOrigem] = -parseFloat(ValorTransacao);
          }
  
          if (ContaDestino in TotalTransferencia) {
            TotalTransferencia[ContaDestino] += parseFloat(ValorTransacao);
          } else {
            TotalTransferencia[ContaDestino] = parseFloat(ValorTransacao);
          } 
          

      })

      for (const conta in TotalTransferencia) {
        if (conta in TotalTransacao) {
          TotalTransacao[conta] += TotalTransferencia[conta];
        } else {
          TotalTransacao[conta] = TotalTransferencia[conta];
        }
      }
  
      const Total = { ...TotalTransacao };
      setTotalPorConta(Total);


    }

    CalcularTotalPorConta()
  }, [Trans, Transferencia])


  return (
    <div>
        <Header/>
        <main>
            <h1 id='TituloTransacoes'>Transferências:</h1>
            <div className="ContainerTransacoes">
            {Transferencia.map((transacao, index) => (
                <ul key={index}> 
                <li><span className='DataTransacao'>{transacao.data}</span> <span className='ContaOrigem'> {transacao.contaOrigem}</span> <span> -----&gt; </span><span className='ContaDestino'> {transacao.contaDestino}</span> <span className='ValorTransacao'>{transacao.valor}€</span></li>
                </ul>
              ))}
              
            </div>
            <h2>Total por Contas:</h2>
            <div className='ContainerCategoriaTransacao'>
          <IconContext.Provider value={{ className: "IconCategoria" }}>
            {conta.map((category, index) => {
              const IconComponent = icons[category.icon];
              const total = TotalPorConta[category.nome] || 0;

              return (
                <ul key={index}>
                  <li>
                    <span className='CategoriaIconNome'>
                      <span>{IconComponent && <IconComponent />}</span>
                      <br />
                      {category.nome}
                    </span>
                    <span className='TotalCategoria'>{total}€</span>
                  </li>
                </ul>
              );
            })}
          </IconContext.Provider>
          </div>
        </main>
    </div>
  )
}

export default transferencias