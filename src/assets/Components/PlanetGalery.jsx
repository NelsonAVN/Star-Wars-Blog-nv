import React, { useEffect, useState } from 'react';
import { fetchPlanets } from '../Utilidades/Fetch';
import PlanetCard from './PlanetCard.jsx';

/**
 * Componente que renderiza la galería de Planets.
 * 
 * No recibe props directamente ya que no las necesita al principio
 */
function PlanetGalery() {
    const [Planets, setPlanets] = useState([]); // Estado para almacenar la lista de Planets
    const [error, setError] = useState(null); // Estado para manejar errores en la carga de datos

    useEffect(() => {
        // Función asíncrona para cargar los Planets
        const fetchData = async () => {
            try {
                const result = await fetchPlanets(); // Llama a la función fetchPlanets para obtener la lista de Planets
                if (result.error) {
                    setError(result.error.message); // Establece el estado de error si hay un problema en la respuesta
                } else {
                    setPlanets(result); // Actualiza el estado de Planets con los datos obtenidos correctamente
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
            <h1><strong>Planets</strong></h1>
            <div className="horizontal-scroll mt-5">
                {Planets.length > 0 ? ( // Verifica si hay Planets en la lista
                    Planets.map(planet => ( // Mapea cada planet para renderizar el componente Cardplanet
                        <div className="card-wrapper" key={planet.uid}>
                            <PlanetCard uid={planet.uid} /> {/* Pasa la uid del planet como prop al componente Cardplanet */}
                        </div>
                    ))
                ) : (
                    <div>Loading...</div> // Muestra un mensaje de carga si no hay Planets aún
                )}
            </div>
        </div>
    );
}

export default PlanetGalery;
