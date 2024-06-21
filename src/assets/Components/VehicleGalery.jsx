import React, { useEffect, useState } from 'react';
import { fetchVehicles } from '../Utilidades/Fetch';
import VehicleCard from './VehicleCard.jsx';

/**
 * Componente que renderiza la galería de Vehicles.
 * 
 * No recibe props directamente ya que no las necesita al principio
 */
function VehicleGalery() {
    const [Vehicles, setVehicles] = useState([]); // Estado para almacenar la lista de Vehicles
    const [error, setError] = useState(null); // Estado para manejar errores en la carga de datos

    useEffect(() => {
        // Función asíncrona para cargar los Vehicles
        const fetchData = async () => {
            try {
                const result = await fetchVehicles(); // Llama a la función fetchVehicles para obtener la lista de Vehicles
                if (result.error) {
                    setError(result.error.message); // Establece el estado de error si hay un problema en la respuesta
                } else {
                    setVehicles(result); // Actualiza el estado de Vehicles con los datos obtenidos correctamente
                }
            } catch (error) {
                console.error('Error al traer la data:', error); // Captura errores de red o excepciones y los muestra en la consola
                setError('Ocurrió un error al cargar datos, por favor intente nuevamente.'); // Establece un mensaje de error en caso de excepción
            }
        };

        fetchData(); // Llama a la función fetchData al montar el componente
    }, []); // El useEffect se ejecuta solo una vez al montar el componente, al pasar un array vacío como dependencia

    // Si hay un error, muestra un mensaje de error
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container-fluid">
            <h1><strong>Vehicles</strong></h1>
            <div className="horizontal-scroll mt-5">
                {Vehicles.length > 0 ? ( // Verifica si hay Vehicles en la lista
                    Vehicles.map(vehicle => ( // Mapea cada vehicle para renderizar el componente Cardvehicle
                        <div className="card-wrapper" key={vehicle.uid}>
                            <VehicleCard uid={vehicle.uid} /> {/* Pasa la uid del vehicle como prop al componente Cardvehicle */}
                        </div>
                    ))
                ) : (
                    <div>Loading...</div> // Muestra un mensaje de carga si no hay Vehicles aún
                )}
            </div>
        </div>
    );
}

export default VehicleGalery;
