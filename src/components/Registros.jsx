import React, { useMemo } from 'react'
import { formatDate } from '../helpers';
import { users } from '../data/db';
import circleX from '/circleX.svg'
import { deleteSale, readSale } from '../services/api';
import Swal from 'sweetalert2'

// import { deleteSale } from '../services/api';

function Registros({ showData, setShowData, data, setData }) {

    const handleUsers = (user = 'all') => {

        if (user === 'all') {
            setShowData(data);
            return;
        }
        const dataUser = data.filter( registro => registro.Nombre === user);
        setShowData(dataUser);
    };

    const handleDelete = async (registro) => {

        const {Imagen, Venta, Hora, Pago, Nombre}  = registro

        const resultado = await Swal.fire({
            title: "¿Está seguro?",
            html: `
                <div class='modal'>
                    <p>Se eliminara el siguiente registro:</p>
                    <img src='/${Imagen}.png' alt='Imagen ${Imagen}'/> 
                    <p>${Venta} - ${Hora} ${Pago ? `- ${Pago}` : ''} - ${Nombre}</p>
                </div>
            `,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#55e6a5",
            cancelButtonColor: "#dc2626",
            confirmButtonText: "¡Si, enviar!",
            cancelButtonText: "¡No, cancelar!",
            preConfirm: async() => {

                try {
                    const result = await deleteSale(registro.Id);; 
                    if (Object.keys(result)[0] === 'error') {
                        throw new Error('No se enviaron los datos');
                    } else {
                        return result;
                    }                    
                } catch (error) {
                    Swal.showValidationMessage(`
                        Request failed: ${error}
                    `);
                }
            }          

        });
        if (resultado.isConfirmed) {            
            const alertSuccess = Swal.fire({
                title: "Eliminado!",
                text: "Se eliminó el registro correctamente.",
                icon: "success",
                confirmButtonText: 'Ok'
            });

            if ((await alertSuccess).isConfirmed || (await alertSuccess).dismiss) {
                const dataRead = await readSale();
                // Almacenar datos del dia
                const dataNow = dataRead.filter( registro => registro.Fecha === formatDate(Date.now()));
                setShowData(dataNow);
                setData(dataNow);
            }

        }

    }


    // Sumar los precios
    const sumaPrecios = useMemo(()=> showData.reduce( (total, registro) => total + (+registro.Precio) , 0), [showData]);
 
    return (
        <>
            <div className="dashboard__buttons">
                <button className='dashboard__button' type='button' onClick={() => handleUsers()}>Todos</button>
                {users.map( (user, i) => 
                    <button key={i} className='dashboard__button' onClick={() => handleUsers(user.name)}>{user.name}</button>
                )}
            </div>
            <div className="dashboard__grid">
                <div className="table">
                    <div className='table__head'>
                        <div className='table__headRow'>
                            <p className='table__th'>Nombre</p>
                            <p className='table__th'>Venta</p>
                            <p className='table__th'>Precio</p>
                            <p className='table__th'>Pago</p>
                            <p className='table__th'>Hora</p>
                            <p className='table__th'></p>
                        </div>
                    </div>
                    <div className='table__body table-responsive'>
                        {showData.map( (registro, i) => 
                            <div className='table__trBody' key={i}>
                                <p className="table__td">{registro.Nombre}</p>
                                <p className="table__td table__td--venta">
                                    <img className='table__img' src={`./${registro.Imagen}.png`} alt="ventaImg" />
                                    <span>{registro.Venta}</span>
                                </p>
                                <p className="table__td">${registro.Precio}</p>
                                <p className="table__td">{registro.Pago}</p>
                                <p className="table__td">{registro.Hora}</p>
                                <button className="table__td table__btn" onClick={() => handleDelete(registro)}><img className='table__delete' src={circleX} alt="" /></button>
                            </div>
                        )}
                    </div>

                </div>
                <p className='dashboard__total'>Total del Día {formatDate(Date.now())}: <span className='dashboard__total-price'>${sumaPrecios}</span></p>
            </div>
            
        </>
    )
}

export default Registros