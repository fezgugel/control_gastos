import React from 'react'
import { useState, useEffect } from 'react';
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({
  presupuesto , 
  setPresupuesto,
  setEsValidoPresupuesto
}) => {
    const [mensaje, setMensaje] = useState('');
  
    
      function handlePresupuesto(e) {
             e.preventDefault();
        if(!presupuesto  || presupuesto < 0){
          setMensaje("No  es un presupuesto s")
          return
        }
       setMensaje('Valido')
       setEsValidoPresupuesto(true)
      }

      const insertanumero = (e) => {
        
        setPresupuesto(Number(e.target.value))
      }
  return (
    <div>
      

      <form onSubmit={handlePresupuesto}      className='formulario'>
        <div className='campo'>
            <label>Definir Presupuesto</label>
            <input className='nuevo-presupuesto'
            type="number" 
            placeholder='Añade tu presupuesto'
            value={presupuesto}
            onChange={insertanumero}
            
            />

        </div>
        <input 
         type="submit" value="Añadir tu presupuesto"
        />
        {mensaje && <Mensaje >{mensaje}</Mensaje>}

      </form>
    </div>
  )
}

export default NuevoPresupuesto
