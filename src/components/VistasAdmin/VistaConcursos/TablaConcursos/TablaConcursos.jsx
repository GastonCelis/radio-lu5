import React from 'react';
import './tablaConcursos.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const TablaConcursos = (props) => {
    const { columna1, columna2, columna3, columna4, arrayInfo } = props

    return (
        <section>

            <table className='container-table-vistas-admin'>
                <thead>
                    <tr className='header-table-vistas'>
                        <th>{columna1}</th>
                        <th>{columna2}</th>
                        <th>{columna3}</th>
                        <th>{columna4}</th>
                        <th></th>
                    </tr>
                </thead>

                <thead className='header-table-vistas-hidden'>
                    <tr>
                        <th>{columna1}</th>
                        <th>{columna2}</th>
                        <th>{columna3}</th>
                        <th>{columna4}</th>
                        <th></th>
                    </tr>
                </thead>

                <thead className='header-table-vistas-hidden'>
                    <tr>
                        <th>{columna1}</th>
                        <th>{columna2}</th>
                        <th>{columna3}</th>
                        <th>{columna4}</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {
                        arrayInfo.map(info =>
                            <tr className='body-table-vistas'>
                                <td>{info.infoColumna1}</td>
                                <td>{info.infoColumna2}</td>
                                <td>{info.infoColumna3}</td>
                                <td>{info.infoColumna4}</td>
                                <td>Ver detalle <ExpandMoreIcon sx={{ fontSize: '12px' }} /></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </section>
    );
};

export default TablaConcursos;