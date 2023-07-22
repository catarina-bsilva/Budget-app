import { React, useState, useEffect } from 'react'
import { IconContext } from 'react-icons'
import { HiOutlinePencil } from 'react-icons/hi'
import { icons } from '../../icons'
import { useNavigate } from 'react-router-dom'

import Header from "../../header/header"
import '../../../styles/geral.sass'
import '../../../styles/novaTransacao.sass'

const novaReceita = () => {

  const [categoria, setCategoria] = useState([])
  const [conta, setConta] = useState([])
  const [ultimoId, setUltimoId] = useState(0)
  const Navigate = useNavigate()

  useEffect(()=>{
    const GetCategoria = async() => {
      const Req = await fetch('http://localhost:3000/Categorias')
      const Data = await Req.json()
      setCategoria(Data[0].Receitas)
    }
    const GetConta = async() => {
      const Req = await fetch('http://localhost:3000/Categorias')
      const Data = await Req.json()
      setConta(Data[0].Contas)

    }

    GetConta()
    GetCategoria()
    
    
    
  },[])
  useEffect(() => {
    console.log(categoria)
  }, [categoria])
  
  useEffect(() => {
    console.log(conta)
  }, [conta])



  useEffect(() => {
    const lastId = localStorage.getItem("ultimoId")
    if (lastId) {
      setUltimoId(parseInt(lastId))
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem("ultimoId", ultimoId.toString())
  }, [ultimoId]);
  
  function gerarProximoId() {
    setUltimoId((prevId) => prevId + 1)
  }

  const CriarReceita = (event) => {
    event.preventDefault()
    const ProximoId = gerarProximoId()
    const Descricao = document.getElementById('NomeTransacao').value
    const Valor = document.getElementById('ValorTransacao').value
    const Data = document.getElementById('DataTransacao').value
    const Recorrente = document.getElementById('Recorrente').checked
    const CategoriaSelecionada = document.querySelector('input[name="CategoriaReceita"]:checked');
    const Categoria = CategoriaSelecionada ? CategoriaSelecionada.id : ''
    const ContaSelecionada = document.querySelector('input[name="CategoriaConta"]:checked');
    const Conta = ContaSelecionada ? ContaSelecionada.id : ''

    const Receita = {
      id: ProximoId,
      descricao : Descricao,
      valor : Valor,
      data : Data,
      recorrente : Recorrente,
      categoria : Categoria,
      conta : Conta,
      operacao : "+"
    }
    console.log(Receita)
    EnviarReceita(Receita)
    Navigate("/Budget-app/Dashboard")
  }

  const EnviarReceita = async (Receita) => {

    const Req = await fetch('http://localhost:3000/Budget', {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(Receita)
    })
    if(Req.ok) {
      const Data = await Req.json()
      console.log('Receita Enviada')
    }
    else {
      console.log("ERRO NO ENVIO DA Receita")
    }
}

  return (
    <div>
      <Header/>
      <main id='ContainerNovaTransacao'>
        <h1 id='TituloPagina'>Nova Receita</h1>
        <form className='FormNovaTransacao'>
          <label htmlFor="NomeTransacao">Descrição:</label>
          <input type="text" name="NomeTransacao" id="NomeTransacao" /><br />
          <label htmlFor="ValorTransacao">Valor:</label>
          <input type="number" name="ValorTransacao" id="ValorTransacao" /><br />
          <label htmlFor="DataTransacao">Data:</label>
          <input type="date" name="DataTransacao" id="DataTransacao" /><br />
          <label htmlFor="Recorrente">Recorrente:</label>
          <input type="checkbox" name="Recorrente" id="Recorrente" /><br />
          <h3 className='Labelh3'>Categoria:</h3>
          <IconContext.Provider value={{ className: "IconCategoria" }}>
            {categoria.map((category, index) => {
              const IconComponent = icons[category.icon]; // Obtenha o componente de ícone correto do mapa
                return (
                  <div key={index}>
                    <input
                      type="radio" name="CategoriaReceita" className="CategoriaReceita" id={category.nome} />
                    <label htmlFor={category.nome}>
                      {IconComponent && <IconComponent />} {/* Renderize o ícone somente se existir */}
                      <span className="NomeCategoria">
                        {category.nome} <span className="Caneta"><HiOutlinePencil className="Caneta" /></span>
                      </span>
                    </label>
                  </div>
                );
            })}
          </IconContext.Provider>





          
          <h3 className='Labelh3' >Conta:</h3>
          <IconContext.Provider value={{ className: "IconCategoria" }}>
          {conta.map((conta, index) => {
            const IconComponent = icons[conta.icon]; // Obtenha o componente de ícone correto do mapa
              return (
                <div key={index}>
                  <input type="radio" name="CategoriaConta" className='CategoriaConta' id={conta.nome} />
                  <label htmlFor={conta.nome}>
                  {IconComponent && <IconComponent />} {/* Renderize o ícone somente se existir */}
                  <span className='NomeCategoria'>
                    {conta.nome} <span className="Caneta"><HiOutlinePencil className="Caneta" /></span>
                  </span>
                  </label>
                </div>
              );
          })}
        </IconContext.Provider>
          <input type="submit" value="Adicionar Receita" onClick={CriarReceita}/>
        </form>
      </main>
    </div>
  )
}

export default novaReceita