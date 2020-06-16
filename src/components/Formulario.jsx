import React,{useState} from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Error from './Error';

const Formulario = ({guardarGasto,guadarCrearGasto}) => {

    const [nombre, guardarNombre] = useState('');
    const [cantidad , guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);
    

    //Usuario agrega gasto
    const agregarGasto = e => {
        e.preventDefault();

        // validar
        if(cantidad < 1 || isNaN( cantidad) || nombre.trim() === '') {
            guardarError(true);
            return;
        }
        guardarError(false);


        // construir el gasto
        const gasto = {
            nombre, 
            cantidad, 
            id: shortid.generate()
        }

        // pasar el gasto al componente principal
        guardarGasto(gasto);
        guadarCrearGasto(true);
    

        // resetear el form
        guardarNombre('');
        guardarCantidad(0);


    };

    return ( 

        <form
            onSubmit={agregarGasto}
        >
            <h2>Agrega tus gastos aquí</h2>

            { error ? <Error mensaje="Ambos campos son obligatorios o Presupuesto Incorrecto" /> : null }

            <div className="campo">
                <label htmlFor="gasto">Nombre Gasto</label>
                <input 
                    id="gasto"
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. Transporte"
                    value={nombre}
                    onChange={e => guardarNombre(e.target.value)}
                    
                />
            </div>

            <div className="campo">
                <label htmlFor="cantidad">Cantidad Gasto</label>
                <input 
                    id="cantidad"
                    type="number"
                    className="u-full-width"
                    placeholder="Ej. 300"
                    value={cantidad}
                    onChange={e => guardarCantidad(parseInt(e.target.value,10))}
                    
                />
            </div>

            <input
            type="submit"
            className="button-primary u-full-width"
            value="Agregar Gasto"
            />
            
        </form>


     );
}
 
Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
}

export default Formulario;