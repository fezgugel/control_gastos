import React from "react";
import { useEffect, useState } from "react";

const Filtros = ({filtro,setFiltro}) => {
    const seteafiltro = (e) => {
        setFiltro(e.target.value)
    }
    return (
        <div className="filtros">
            <form>
                <div className="campo">
                    <select value={filtro}
                    onChange={seteafiltro}
                    >
                    <option value="">--Todas las categorias--</option>
                    <option value="Ahorro">Ahorro</option>
                    <option value="Comida">Comida</option>
                    <option value="Casa">Casa</option>
                    <option value="Gastos">Gastos varios</option>
                    <option value="Ocio">--Ocio--</option>
                    <option value="Salud">Salud</option>
                    <option value="Suscripciones">Suscripciones</option>
                    </select>
                </div>
            </form>
        </div>
    )
}
export default Filtros