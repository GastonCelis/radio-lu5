import React from 'react';
import './vistaEstadisticas.css'
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const concursosRealizados = [
    { name: 'Concurso A', Cantidad: 700 },
    { name: 'Concurso B', Cantidad: 500 },
    { name: 'Concurso C', Cantidad: 300 },
    { name: 'Concurso C', Cantidad: 100 }
]

const participacionPrograma = [
    { name: 'Programa A', Cantidad: 1000 },
    { name: 'Programa B', Cantidad: 700 },
    { name: 'Programa C', Cantidad: 400 },
    { name: 'Programa C', Cantidad: 300 }
]

const participantesConcursos = [
    { name: 'Concurso A', Cantidad: 1200 },
    { name: 'Concurso B', Cantidad: 900 },
    { name: 'Concurso C', Cantidad: 500 },
    { name: 'Concurso C', Cantidad: 200 }
]

const VistaEstadisticas = () => {
    const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
        return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{value}</text>;
    };

    return (
        <section>
            <h2 className='titulo-vista-estadisticas-admin'>Estadísticas</h2>

            <section className='container-graficos-estadisticas'>
                <div className='box-grafico-estadisticas'>
                    <h2 className='titulo-grafico-estadisticas'>Cantidad de concursos realizados</h2>

                    <BarChart width={350} height={250} data={concursosRealizados}>
                        <XAxis dataKey="name" style={{fontSize: '12px'}}/>
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="Cantidad" barSize={30} fill="#8884d8"
                            label={renderCustomBarLabel} />
                    </BarChart>
                </div>

                <div className='box-grafico-estadisticas'>
                    <h2 className='titulo-grafico-estadisticas'>Programa con más participación</h2>

                    <BarChart width={350} height={250} data={participacionPrograma}>
                        <XAxis dataKey="name" style={{fontSize: '12px'}}/>
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="Cantidad" barSize={30} fill="#8884d8"
                            label={renderCustomBarLabel} />
                    </BarChart>
                </div>

                <div className='box-grafico-estadisticas'>
                    <h2 className='titulo-grafico-estadisticas'>Cantidad de participantes en concursos</h2>

                    <BarChart width={350} height={250} data={participantesConcursos}>
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