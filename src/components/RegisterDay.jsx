import React, { useEffect, useState } from 'react'
import { consumirAsistencias } from '../services/api';
import { calculateTimeDifference, calculateTimeDifferenceFood } from '../helpers';

function RegisterDay() {

    const [ data, setData ] = useState([]);

    useEffect(() => {
        consultarApi()
        async function consultarApi() {

            const { response1, response2, response3, response4} = await consumirAsistencias();

            // Agrupando los 2 arreglos, deposite la 'Salida' del response2(array de salida) y lo inserte en el array de la response1
            const groupedResponse = response1.map( registro => {
                const array = response2.filter( registro2 => 
                    registro.Nombre === registro2.Nombre && registro.Fecha === registro2.Fecha
                );

                // Entrada comida
                const entradaComida = response3.find(
                    (registro3) => registro.Nombre === registro3.Nombre && registro.Fecha === registro3.Fecha
                );

                // Salida comida
                const salidaComida = response4.find(
                    (registro4) => registro.Nombre === registro4.Nombre && registro.Fecha === registro4.Fecha
                );

                // Calculas diferencia solo si tienes ambos
                const tiempoDeComida = entradaComida && salidaComida ? calculateTimeDifferenceFood(entradaComida.Entrada, salidaComida.Salida): null;

                return {
                    ...registro,
                    Salida: array[0]?.Salida,
                    tiempoDeComida,
                }

            });

            
            const groupedRecords = groupedResponse.reduce((acc, record) => {
                const { Fecha, Nombre, Entrada, Salida, tiempoDeComida } = record;
                const existingGroup = acc.find(group => group.Fecha === Fecha);
            
                if (existingGroup) {
                    existingGroup.data.push({ Nombre, Entrada, Salida, tiempoDeComida });
                } else {
                    acc.push({
                        Fecha,
                        data: [{ Nombre, Entrada, Salida, tiempoDeComida }]
                    });
                }
            
                return acc;
            }, []);

            setData(groupedRecords);
        }

    }, [])
    


    return (
        <div className='registerDay'>

            { data.map( (register, i) => 
                <div className='' key={i}>
                    <div className='registerDay__fecha'>
                        <p className='registerDay__fecha-texto'>Dia {register.Fecha}</p>
                    </div> 

                    <div className="registerDay__header">
                        <p className="registerDay__heading">Nombre</p>
                        <p className="registerDay__heading">Entrada</p>
                        <p className="registerDay__heading">Salida</p>
                        <p className="registerDay__heading">Total</p>
                        <p className="registerDay__heading">Tiempo de Comida</p>
                    </div> 

                    {register.data.map( (user, i) =>
                        <div className='registerDay__info' key={i}>
                            <p className="registerDay__campo">{user.Nombre}</p>
                            <p className="registerDay__campo">{user.Entrada}</p>
                            <p className="registerDay__campo">{user.Salida ? user.Salida : '-'}</p>
                            <p className="registerDay__campo">{user.Salida ? calculateTimeDifference(user.Entrada, user.Salida) : '-'}</p>
                            <p className="registerDay__campo">{user.tiempoDeComida}</p>
                        </div>  
                    )}
                </div>    
            )

            }  
        </div>
    )
}

export default RegisterDay