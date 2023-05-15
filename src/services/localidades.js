import localidades from '../utils/localidades.json'

export const getLocalidades = (provincia)=>{
    const filterLocalidades = localidades.filter(localidad => localidad.provincia_nombre.toUpperCase() === provincia.toUpperCase())
    const allLocalidades= filterLocalidades.map(localidad => localidad.nombre)
    allLocalidades.sort()
    return allLocalidades
}