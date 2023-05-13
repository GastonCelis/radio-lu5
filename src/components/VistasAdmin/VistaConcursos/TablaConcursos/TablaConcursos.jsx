import React from 'react';
import './tablaConcursos.css'
//import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const TablaConcursos = (props) => {
    const { columna1, columna2, columna3, columna4, arrayInfo, infoColumna4None } = props

    return (
        <section>

            <table className='container-table-vistas-admin'>
                <thead>
                    <tr className='header-table-vistas'>
                        <th>{columna1}</th>
                        <th>{columna2}</th>
                        <th className={infoColumna4None === false && 'hidden-boder-right'}>{columna3}</th>
                        {infoColumna4None && <th>{columna4}</th>}
                        <th></th>
                    </tr>
                </thead>

                <thead className='header-table-vistas-hidden'>
                    <tr>
                        <th>{columna1}</th>
                        <th>{columna2}</th>
                        <th>{columna3}</th>
                        {infoColumna4None && <th>{columna4}</th>}
                        <th></th>
                    </tr>
                </thead>

                <thead className='header-table-vistas-hidden'>
                    <tr>
                        <th>{columna1}</th>
                        <th>{columna2}</th>
                        <th>{columna3}</th>
                        {infoColumna4None && <th>{columna4}</th>}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {
                        arrayInfo.map((info, index) =>
                            <tr className='body-table-vistas' key={index}>
                                <td>{info.infoColumna1}</td>
                                <td>{info.infoColumna2}</td>
                                <td>{info.infoColumna3}</td>
                                {infoColumna4None && <td>{info.infoColumna4}</td>}
                                {/* <td>Ver detalle <ExpandMoreIcon sx={{ fontSize: '12px' }} /></td> */}
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </section>
    );
};

export default TablaConcursos;