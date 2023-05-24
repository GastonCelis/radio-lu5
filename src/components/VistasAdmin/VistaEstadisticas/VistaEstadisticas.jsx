/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './vistaEstadisticas.css'
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useSelector, useDispatch } from 'react-redux';
import { getParticipantesEnConcursosAsync } from '../../../app/silices/concurso/concursoThunk';

const VistaEstadisticas = (props) => {
    const { login } = props
    const { concursos, cantidadParticipantes } = useSelector(state => state.concursoSlice)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getParticipantesEnConcursosAsync({ token: login.token }))
    }, [])

    const statsConcursos = concursos.map(concurso => {
        const filter = concursos.filter(data => data.title === concurso.title)
        return {name: concurso.title, Cantidad: filter.length}
    })

    const statsPrograma = concursos.map(concurso => {
        const filter = concursos.filter(data => data.program === concurso.program)
        return {name: concurso.program, Cantidad: filter.length}
    })

    const statsParticipantes = cantidadParticipantes.map(participante => {
        return {name: participante.contestName, Cantidad: participante.participants}
    })

    const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
        return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{value}</text>;
    };

    return (
        <section>
            <h2 className='titulo-vista-estadisticas-admin'>Estadísticas</h2>

            <section className='container-graficos-estadisticas'>
                <div className='box-grafico-estadisticas'>
                    <h2 className='titulo-grafico-estadisticas'>Cantidad de concursos realizados</h2>

                    <BarChart width={350} height={250} data={statsConcursos}>
                        <XAxis dataKey="name" style={{fontSize: '12px'}}/>
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="Cantidad" barSize={30} fill="#8884d8"
                            label={renderCustomBarLabel} />
                    </BarChart>
                </div>

                <div className='box-grafico-estadisticas'>
                    <h2 className='titulo-grafico-estadisticas'>Programa con más participación</h2>

                    <BarChart width={350} height={250} data={statsPrograma}>
                        <XAxis dataKey="name" style={{fontSize: '12px'}}/>
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="Cantidad" barSize={30} fill="#8884d8"
                            label={renderCustomBarLabel} />
                    </BarChart>
                </div>

                <div className='box-grafico-estadisticas'>
                    <h2 className='titulo-grafico-estadisticas'>Cantidad de participantes en concursos</h2>

                    <BarChart width={350} height={250} data={statsParticipantes}>
                        <XAxis dataKey="name" style={{fontSize: '12px'}}/>
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="Cantidad" barSize={30} fill="#8884d8"
                            label={renderCustomBarLabel} />
                    </BarChart>
                </div>
            </section>
        </section>
    );
};

export default VistaEstadisticas;