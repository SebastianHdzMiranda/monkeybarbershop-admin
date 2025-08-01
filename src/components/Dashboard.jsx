import React, { useEffect, useState } from 'react'
import { formatDate } from '../helpers'
import { readSale } from '../services/api';
import Registros from './Registros';

function Dashboard() {

    const [showData, setShowData] =  useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {

        consultarApi();
        async function consultarApi() {
            const data = await readSale();
    
            // Almacenar datos del dia
            const dataNow = data.filter( registro => registro.Fecha === formatDate(Date.now()));
            
            setData(dataNow);
            setShowData(dataNow);
        }

    }, []);

    return (
        <div className='dashboard'>
                       
            {data.length > 0 ?
                <Registros 
                    showData={showData}
                    setShowData={setShowData}
                    data={data}
                    setData={setData}
                />
                :
                <div className='alert'>
                    <p className='alert__texto'>No hay registros por mostrar</p>
                </div>
            }
        </div>
    )
}

export default Dashboard