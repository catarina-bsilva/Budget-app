import { React, useState, useEffect } from 'react'

import { GiWallet, GiBanknote, GiTakeMyMoney } from 'react-icons/gi'
import { AiFillCreditCard } from 'react-icons/ai'
import { HiGift, HiOutlinePencil } from 'react-icons/hi'
import { IconContext } from 'react-icons'
import { icons } from '../../icons'

import Header from "../../header/header"
import '../../../styles/geral.sass'
import '../../../styles/novaTransacao.sass'


const novaTransferencia = () => {

  const [conta, setConta] = useState([])
  const [ultimoId, setUltimoId] = useState(0)

  useEffect(()=>{
    
    const GetConta = async() => {
      const Req = await fetch('http://localhost:3000/Categorias')
      const Data = await Req.json()
      setConta(Data[0].Contas)
    }

    GetConta()
    
  },[])

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

  const CriarTransferencia = (event) => {
    event.preventDefault()
    const ProximoId = gerarProximoId()
    const Valor = document.getElementById('ValorTransacao').value
    const Data = document.getElementById('DataTransacao').value
    const Recorrente = document.getElementById('Recorrente').checked
    const ContaOrigem = document.querySelector('input[name="CategoriaContaOrigem"]:checked').id
    const ContaDestino = document.querySelector('input[name="CategoriaContaDestino"]:checked').id
    

    const Transferencia = {
      id: ProximoId,
      valor : Valor,
      data : Data,
      recorrente : Recorrente,
      contaOrigem : ContaOrigem,
      contaDestino : ContaDestino
    }
    console.log(Transferencia)
    EnviarTransferencia(Transferencia)
    window.location.href = "/Budget-app/dashboard"
    
  }

  const EnviarTransferencia = async (Transferencia) => {

    const Req = await fetch('http://localhost:3000/Tranferencias', {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(Transferencia)
    })
    if(Req.ok) {
      const Data = await Req.json()
      console.log('Transferencia Enviada')
    }
    else {
      console.log("ERRO NO ENVIO DA Transferencia")
    }
}


  return (
    <div>
      <Header/>
      <main id='ContainerNovaTransacao'>
        <h1 id='TituloPagina'>Nova Transferência</h1>
        <form className='FormNovaTransacao'>
          <label htmlFor="ValorTransacao">Valor:</label>
          <input type="number" name="ValorTransacao" id="ValorTransacao" /><br />
          <label htmlFor="DataTransacao">Data:</label>
          <input type="date" name="DataTransacao" id="DataTransacao" /><br />
          <label htmlFor="Recorrente">Recorrente:</label>
          <input type="checkbox" name="Recorrente" id="Recorrente" /><br />
          <h3 className='Labelh3'>Conta Origem:</h3>
          <IconContext.Provider value={{ className: "IconCategoria" }}>
          {conta.map((conta, index) => {
            const IconComponent = icons[conta.icon]; // Obtenha o componente de ícone correto do mapa
              return (
                <div key={index}>
                  <input type="radio" name="CategoriaContaOrigem" className='CategoriaConta' id={conta.nome} />
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
          <h3 className='Labelh3' >Conta Destino:</h3>
          <IconContext.Provider value={{ className: "IconCategoria" }}>
          {conta.map((conta, index) => {
            const IconComponent = icons[conta.icon]; // Obtenha o componente de ícone correto do mapa
              return (
                <div key={index}>
                  <input type="radio" name="CategoriaContaDestino" className='CategoriaConta' id={conta.nome} />
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
          <input type="submit" value="Adicionar Transferência" onClick={CriarTransferencia}/>
        </form>
      </main>
    </div>
  )
}

export default novaTransferencia