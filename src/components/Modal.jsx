import React from 'react'
import Cerrarboton from "../img/cerrar.svg"
import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'

const Modal = ({
  setModal, 
  animarModal, 
  setAnimarModal,
  guardarGasto,
  gastoEditar,
  setGastoEditar
}) => {
    const[mensaje,setMensaje] = useState("");
    const[nombre, setNombre] = useState("");
    const[cantidad, setCantidad] = useState("");
    const[categoria, setCategoria] = useState("");
    const[id,setId] = useState("")
    const[fecha,setFecha]=useState("")

    useEffect(()=> {
      if(Object.keys(gastoEditar).length > 0){
        setNombre(gastoEditar.nombre)
        setCantidad(gastoEditar.cantidad)
        setCategoria(gastoEditar.categoria)
        setId(gastoEditar.id)
        setFecha(gastoEditar.fecha)
      }
    },[gastoEditar])
    const changeCategoria = (e) => {
        setCategoria(e.target.value)
    }

    const changeNombre = (e) =>{
        setNombre(e.target.value)
    }

    const changeCantidad = (e) =>{
        setCantidad(Number(e.target.value))
    }

    const ocultarModal = () => {
        
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(() => {
            setModal(false)
        },500)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if([nombre,cantidad, categoria].includes("")){
            setMensaje("Todos los campos son obligatorios")
            setTimeout(() => {
              setMensaje("")  
            }, 3000);
            return;
        }
        guardarGasto({nombre,cantidad,categoria,id,fecha})
    }
  return (
    <div className='modal'>
      <div>
          <img className='imgmas' src={Cerrarboton} 
          alt="cerrar modal"
          onClick={ocultarModal}
          />
      </div>
      <form 
      onSubmit={handleSubmit}
      className={`formulario ${animarModal ? "animar" : "cerrar"}`}>
          <legend>{gastoEditar.nombre ? "Editar Gasto": "Nuevo Gasto"}</legend>
          {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
          <div className='campo'>
            <label htmlFor='nombre'>Nombre Gasto</label>
            <input
            id="nombre"
            type="text"
            placeholder='Añade el nombre del gasto'
            value={nombre}
            onChange={changeNombre}
            />
          </div>

          <div className='campo'>
            <label htmlFor='cantidad'>Cantidad</label>
            <input
            id="cantidad"
            type="number"
            placeholder='Añade la cantidad del gasto'
            value={cantidad}
            onChange={changeCantidad}
            />
          </div>

          <div className='campo'>
            <label htmlFor='categoria'>Categoria</label>
            <select id="categoria"  
            value={categoria}
            onChange={changeCategoria} >
            <option value="">--Seleccione--</option>
            <option value="Ahorro">Ahorro</option>
            <option value="Comida">Comida</option>
            <option value="Casa">Casa</option>
            <option value="Gastos">Gastos varios</option>
            <option value="Ocio">--Ocio--</option>
            <option value="Salud">Salud</option>
            <option value="Suscripciones">Suscripciones</option>
            </select>
          </div>
          <input type="submit" value={gastoEditar.nombre ? `Editar`:`Añadir Gasto`} />
      </form>
    </div>
  )
}

export default Modal
