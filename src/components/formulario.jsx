import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addSale, deleteSales, readSale } from '../services/api';
import { formatDate, formatTime } from '../helpers';
import Swal from 'sweetalert2'


const servicios = [
    {id:uuidv4(), img: 'adulto', sale:'Corte Adulto', price: 100},
    {id:uuidv4(), img: 'niho', sale:'Corte Niño', price: 80},
    {id:uuidv4(), img: 'barba', sale:'Barba', price: 70},
    {id:uuidv4(), img: 'bigote', sale:'Bigote', price: 50},
    {id:uuidv4(), img: 'adultoCD', sale:'Corte Adulto C/D', price: 140},
    {id:uuidv4(), img: 'nihoCD', sale:'Corte Niño C/D', price: 120},
    {id:uuidv4(), img: 'cejas', sale:'Arreglo de Cejas', price: 50},
    {id:uuidv4(), img: 'adultoConBarba', sale:'Adulto con barba', price: 150},
    {id:uuidv4(), img: 'corteBarbaDisenho', sale:'Corte Barba C/D', price: 140},
    {id:uuidv4(), img: 'ritualBarba', sale:'Ritual Barba', price: 120},
    {id:uuidv4(), img: 'servicioVip', sale:'Servicio Vip', price: 300},
];
const productos = [
    {id:uuidv4(), img: 'nishman', sale: 'Nishman', price: 150},
    {id:uuidv4(), img: 'nishman', sale: 'Nishman', price: 150},
    {id:uuidv4(), img: 'nishman', sale: 'Nishman', price: 150},
]

function Formulario() {
    const [cells, setCells] = useState(true);
    const [venta, setVenta] = useState('');
    const [changeDisplay, setChangeDisplay] = useState(false);
    const [nombre, setNombre] = useState('');

    const [alert, setAlert] = useState('');

    const handleCells = (boolean) => {
        setCells(boolean);
    }

    const guardarVenta = (nombre)=> {
        setVenta(nombre);
    }

    const sigPag = (e) => {
        e.preventDefault();
        if (venta === '') {
            crearAlerta('*Elige un campo');
            return;
        } 

        setChangeDisplay(true);
    }

    const guardarNombre = (e)=> {
        console.log(e.target.value);
        setNombre(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (nombre === '') {
            crearAlerta('*El campo nombre es obligatorio');
            return;
        }

        const isService = servicios.some( servicio => servicio.sale === venta);
        let data;

        if (isService) {
            const servicioObj = servicios.filter( service => service.sale === venta)[0];
            data = {...servicioObj};
        } else {
            const productoObj = productos.filter( producto => producto.sale === venta)[0];
            data = {...productoObj}
        }

        data = {
            ...data, 
            fecha: formatDate(Date.now()), 
            hora: formatTime(Date.now()), 
            nombre
        }

        const resultado = await Swal.fire({
            title: "¿Está seguro?",
            text: "¡Se enviaran los datos registrados!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#55e6a5",
            cancelButtonColor: "#dc2626",
            confirmButtonText: "¡Si, enviar!",
            cancelButtonText: "¡No, cancelar!"
          });
          if (resultado.isConfirmed) {
            // Enviar datos a la api
            await addSale(data); 
            
            location.reload();
        }


    }

    const crearAlerta = (mensaje) => {
        setAlert(mensaje);
        setTimeout(() => {
            setAlert('')
        }, 2000);
    }
    
    const handleChangeDisplay = () => {
        location.reload();
    }


    return(
        <div className="contenedor-formulario contenedor">
            <form className="formulario" onSubmit={handleSubmit}>

                {!changeDisplay &&
                    <div className="formulario__cells">

                        <div className="formulario__buttons">
                            <button className='formulario__button' type='button' onClick={() => handleCells(true)}>Servicios</button>
                            <button className='formulario__button' type='button' onClick={() => handleCells(false)}>Productos</button>
                        </div>


                        {cells ? 
                        
                            <div className="formulario__grid">
                                {servicios.map( (servicio, i) => 
                                    <div className="formulario__cell" key={servicio.id} >
                                        <input className="formulario__radio" type="radio" name="servicios" value={servicio.servicio} id={servicio.id} onChange={()=> guardarVenta(servicio.sale)}/>
                                        <label className='formulario__radio-label' htmlFor={servicio.id}>
                                            <img className='formulario__radio-img' src={`/${servicio.img}.png`} alt={`servicio${i+1}`} />
                                            <p className='formulario__radio-text'>{servicio.sale}</p>
                                            <p className='formulario__radio-price'>${servicio.price}</p>
                                        </label>
                                    </div>
                                )}
                            </div>
                            :
                            <div className="formulario__grid">
                                {productos.map( (product, i) => 
                                    <div className="formulario__cell" key={product.id}>
                                        <input className="formulario__radio" type="radio" name="productos" value={product.sale} id={product.id} onChange={()=> guardarVenta(product.sale)} />
                                        <label className='formulario__radio-label' htmlFor={product.id}>
                                            <img className='formulario__radio-img' src={`/${product.img}.webp`} alt={`producto${i+1}`} />
                                            <p className='formulario__radio-text'>{product.sale}</p>
                                            <p className='formulario__radio-price'>${product.price}</p>
                                        </label>
                                    </div>
                                )}
                            </div>
                        }

                    </div>
                }


                {(changeDisplay) && 
                    <div className='formulario__nombre'>
                        <label className='formulario__heading' htmlFor="nombre">Digita tu nombre</label>
                        <select name="nombre" id="nombre" className='formulario__select' onChange={guardarNombre}>
                            <option value="" disabled selected>-- Elige tu nombre --</option>
                            <option value="barbero1">Barbero1</option>
                            <option value="barbero2">Barbero2</option>
                        </select>
                    </div>
                }
                {alert && <p className='formulario__alerta'>{alert}</p>}


                <div className="formulario__botones">
                    
                    {!changeDisplay ?
                        <button className='formulario__btn formulario__btn--next' onClick={sigPag}>Siguiente</button>
                        :
                        <>
                            <button type='button' className='formulario__btn' onClick={()=> handleChangeDisplay()}>Atras</button>
                            <input type="submit" className='formulario__btn formulario__btn--submit'/>
                        </>
                    }
                </div>

            </form>
        </div>
    )
}

export default Formulario
