import { useState, useEffect } from 'react'
import Header from './components/Header'
import IconoNuevoGasto from "./img/nuevo-gasto.svg"
import Modal from './components/Modal';
import { generarId } from './helpers';
import ListadoGastos from './components/ListadoGastos';
import Filtros from './components/Filtros';

function App() {
 const [presupuesto, setPresupuesto] = useState(
   localStorage.getItem("presupuesto") ?? 0
 );
 const [esValidoPresupuesto, setEsValidoPresupuesto] = useState(false);
 const [gastos, setGastos] = useState(
   localStorage.getItem("gastos") ? JSON.parse(localStorage.getItem("gastos")) : []
 )
const [gastoEditar, setGastoEditar] = useState({})
const [modal, setModal] = useState(false);
const[animarModal,setAnimarModal] = useState(false)
const[filtro,setFiltro]= useState("")
const[gastosFiltrados,setGastosFiltrados]= useState([])

useEffect(()=> {
if(Object.keys(gastoEditar).length > 0){
  setModal(true);
   setTimeout(() => {
    setAnimarModal(true)
   }, 500)
}
},[gastoEditar])

useEffect(()=> {
  Number(localStorage.setItem("presupuesto",presupuesto ?? 0))
}, [presupuesto])

useEffect(()=> {
  localStorage.setItem("gastos",JSON.stringify(gastos) ?? 0)
}, [gastos])

useEffect(()=>{
  if(filtro){
    const gastoFiltrados = gastos.filter(gasto => gasto.categoria ===
      filtro)
      setGastosFiltrados(gastoFiltrados)
  }
}, [filtro])

useEffect(()=> {
  const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0;
  if(presupuestoLS > 0){
    setEsValidoPresupuesto(true)
  }
}, [])

const guardarGasto = (gasto) => {
  if(gasto.id) {
      const gastosActualizados = gastos.map(gastoState => 
        gastoState.id=== gasto.id ? gasto : gastoState)
        setGastos(gastosActualizados);
        setGastoEditar({})
  }
  else
  {
    gasto.id = generarId();
    gasto.fecha = Date.now();
    setGastos([...gastos, gasto])
  }
  
 
 setAnimarModal(false)
 setTimeout(() => {
     setModal(false)
 },500)
}

 const handleNuevoGasto = () => {
   setModal(true);
    setGastoEditar({})
   setTimeout(() => {
    setAnimarModal(true)
   }, 500)
 }
 const eliminarGasto = id => {
   const gastosActualizados = gastos.filter(gasto => gasto.id !== id);
   SetGastos(gastosActualizados);
   }
  return (
    <div className={modal ? "fijar" : ""}>
  
    <Header
    gastos={gastos}
    setGastos={setGastos}
    presupuesto={presupuesto}
    setPresupuesto={setPresupuesto}
    esValidoPresupuesto={esValidoPresupuesto}
    setEsValidoPresupuesto={setEsValidoPresupuesto}
    />
    
    {esValidoPresupuesto && (
      <>
      <main>
        <Filtros
        filtro={filtro}
        setFiltro={setFiltro}
        />
        <ListadoGastos 
        gastos={gastos}
        setGastoEditar={setGastoEditar}
        eliminarGasto={eliminarGasto}
        filtro={filtro}
        gastosFiltrados={gastosFiltrados}
        />
      </main>
      <div >
      <img className='imgmas' src={IconoNuevoGasto}
      alt="IconoNuevoGasto"
      onClick={handleNuevoGasto} />
    </div>
    </>
    )}

    {modal && <Modal 
    setModal={setModal}
    animarModal={animarModal}
    setAnimarModal={setAnimarModal}
    guardarGasto={guardarGasto}
    gastoEditar={gastoEditar}
    setGastoEditar={setGastoEditar}
    />}
    
    </div>
  )
}

export default App
