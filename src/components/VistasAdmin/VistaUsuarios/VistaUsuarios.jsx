import React from 'react';
import './vistaUsuarios.css'
import { format } from 'date-fns';
import { useSelector } from 'react-redux';

const VistaUsuarios = () => {
    const { allUsuarios } = useSelector(state => state.usuarioSlice)

    return (
        <section>
            <h2 className='titulo-vista-usuarios-admin'>Usuarios</h2>

            <section>
                <table className='container-table-vistas-admin'>
                    <thead>
                        <tr className='header-table-vistas'>
                            <th>Nombre y Apellido</th>
                            <th>Email</th>
                            <th>Fecha de nacimiento</th>
                            <th>Ciudad</th>
                        </tr>
                    </thead>

                    <thead className='header-table-vistas-hidden'>
                        <tr>
                            <th>Nombre y Apellido</th>
                            <th>Email</th>
                            <th>Fecha de nacimiento</th>
                            <th>Ciudad</th>
                        </tr>
                    </thead>

                    <thead className='header-table-vistas-hidden'>
                        <tr>
                            <th>Nombre y Apellido</th>
                            <th>Email</th>
                            <th>Fecha de nacimiento</th>
                            <th>Ciudad</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            allUsuarios.map((info, index) =>
                                <tr className='body-table-vistas' key={index}>
                                    <td>{info.fullName}</td>
                                    <td>{info.email}</td>
                                    <td>{format(new Date(info.birthDay), 'dd-MM-yyyy')}</td>
                                    <td>{info.city}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </section>
        </section>
    );
};

export default VistaUsuarios;