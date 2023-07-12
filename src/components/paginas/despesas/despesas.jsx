import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from "../../header/header"
import '../../../styles/geral.sass'
import '../../../styles/transacoes.sass'
import { icons } from '../../icons'
import { IconContext } from 'react-icons'

const despesas = () => {

  const [Trans, setTrans] = useState([])
  const [categoria, setCategoria] = useState([])
  const [totalPorCategoria, setTotalPorCategoria] = useState({})

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

  useEffect(()=>{
    const GetCategoria = async() => {
      const Req = await fetch('http://localhost:3000/Categorias')
      const Data = await Req.json()
      setCategoria(Data[0].Despesas)
    }
    
    GetCategoria()
    
  },[])

  useEffect(() => {
    const calculateTotalByCategory = () => {
      const totals = {}

      Trans.forEach(transacao => {
        if (transacao.operacao === '-') {
          const categoriaAtual = transacao.categoria
          const valorTransacao = transacao.valor

          if (categoriaAtual in totals) {
            totals[categoriaAtual] += parseFloat(valorTransacao) 
          } else {
            totals[categoriaAtual] = parseFloat(valorTransacao) 
          }
        }
      })

      setTotalPorCategoria(totals)
    }

    calculateTotalByCategory()
  }, [Trans])


  return (
    <div>
        <Header/>
        <main>
            <h1 id='TituloTransacoes'>Despesas:</h1>
            <div className="ContainerTransacoes">
            {Trans.map((transacao, index) => {
              if(transacao.operacao === '-') {
                return (
                  <ul key={index}> 
                <li><span className='DataTransacao'>{transacao.data}</span> <span className='DescricaoTransacao'>{transacao.descricao}</span> <span className='ValorTransacao'><span>{transacao.operacao}</span>{transacao.valor}€</span></li>
                </ul>
                )
              } else {
                return null
              }

                
            })}
            </div>
            <h2>Total por Categorias:</h2>
            <div className='ContainerCategoriaTransacao'>
          <IconContext.Provider value={{ className: "IconCategoria" }}>
            {categoria.map((category, index) => {
              const IconComponent = icons[category.icon];
              const total = totalPorCategoria[category.nome] || 0;

              return (
                <ul key={index}>
                  <li>
                  <span className='CategoriaIconNome'>
                      <span>{IconComponent && <IconComponent />}</span>
                      <br />
                      <span className={`CategoriaIconNome ${category.nome.length > 10 ? 'NomeLongo' : ''}`}>{category.nome}</span>
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

export default despesas