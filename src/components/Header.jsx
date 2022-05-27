import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuestofg from './ControlPresupuestofg'
const Header = ({
  gastos, 
  setGastos,
  presupuesto , 
  setPresupuesto,
  esValidoPresupuesto,
  setEsValidoPresupuesto}) => {
  return (
    <div>
    <header>
      <h1>Planificador de Gastos</h1>
      {esValidoPresupuesto ? (
       <ControlPresupuestofg
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        setEsValidoPresupuesto={setEsValidoPresupuesto}
        />
      ) : (
      <NuevoPresupuesto
        setEsValidoPresupuesto={setEsValidoPresupuesto}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}  /> 
        )}
      
    </header>
    </div>
  )
}

export default Header
