import React from "react";
import {useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
function ControlPresupuestofg ({
    gastos,
    setGastos,
    setPresupuesto,
    presupuesto,
    setEsValidoPresupuesto
} ) {

    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto)=> gasto.cantidad+total,0)
        const totalDisponible = presupuesto - totalGastado
        const nuevoPorcentaje = (((presupuesto-totalDisponible)/presupuesto)*100).toFixed(2)
        
        setDisponible(totalDisponible)
        setGastado(totalGastado)
        setTimeout(()=>{
            setPorcentaje(nuevoPorcentaje)
        },1000)
    }, [gastos])

    const fotmatearCantidad = (cantidad) => {
        return cantidad.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
        })
    }

    const handleResetea = () => {
        const resultado =confirm("¿Deseas Reiniciar Presupuesto y gastos?")
        if(resultado) {
            setGastos([])
            setPresupuesto(0)
            setEsValidoPresupuesto(false)
        }
    }

    return (
        <div className="contenedor-presupuesto">
            <div>
                <CircularProgressbar
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? "red" : "#3B82F6",
                    textSize: '12px',
                    textColor: porcentaje > 100 ? "red" : "#3B82F6"
                })}
                    className="imgcirculo"
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                />
            </div>
            <div className="contenido-presupuesto">
                <button className="resetapp" type="button"
                onClick={handleResetea}>
                    Resetear App
                </button>
            <p>
                <span>Presupuesto: ${fotmatearCantidad(presupuesto)}</span>
            </p>
            <p>
                <span className={`${disponible < 0 ? "negativo":""}`}>Disponible: ${fotmatearCantidad(disponible)}</span>
            </p>
            <p>
                <span>Gastado: ${fotmatearCantidad(gastado)}</span>
            </p>
            </div>

        </div>

    )

}
export default ControlPresupuestofg;