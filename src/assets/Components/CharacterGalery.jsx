import React, { useEffect, useState } from 'react';
import { fetchPersonajes } from '../Utilidades/Fetch';
import CharacterCard from './CharacterCard.jsx';

/**
 * Componente que renderiza la galería de personajes.
 * 
 * No recibe props directamente ya que no las necesita al principio
 */
function CharacterGalery() {
    const [personajes, setPersonajes] = useState([]); // Estado para almacenar la lista de personajes
    const [error, setError] = useState(null); // Estado para manejar errores en la carga de datos

    useEffect(() => {
        // Función asíncrona para cargar los personajes
        const fetchData = async () => {
            try {
                const result = await fetchPersonajes(); // Llama a la función fetchPersonajes para obtener la lista de personajes
                if (result.error) {
                    setError(result.error.message); // Establece el estado de error si hay un problema en la respuesta
                } else {
                    setPersonajes(result); // Actualiza el estado de personajes con los datos obtenidos correctamente
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
            <h1><strong>Characters</strong></h1>
            <div className="horizontal-scroll mt-5">
                {personajes.length > 0 ? ( // Verifica si hay personajes en la lista
                    personajes.map(personaje => ( // Mapea cada personaje para renderizar el componente CardPersonaje
                        <div className="card-wrapper" key={personaje.uid}>
                            <CharacterCard uid={personaje.uid} /> {/* Pasa la uid del personaje como prop al componente CardPersonaje */}
                        </div>
                    ))
                ) : (
                    <div>Loading...</div> // Muestra un mensaje de carga si no hay personajes aún
                )}
            </div>
        </div>
    );
}

export default CharacterGalery;
