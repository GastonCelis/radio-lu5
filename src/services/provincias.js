import provincias from '../utils/provincias.json'

export const getProvincias =  ()=>{
    const allProvincias = provincias.map(provincia => provincia.nombre)
    allProvincias.sort()
    return allProvincias
}