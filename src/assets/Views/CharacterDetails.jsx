import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPersonaje } from '../Utilidades/Fetch';

const CharacterDetails = () => {
    const { id } = useParams(); // Obtener el id del URL
    const [personaje, setPersonaje] = useState(null); // Estado para almacenar los datos del personaje
    const [error, setError] = useState(null); // Estado para manejar errores

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchPersonaje(id); // Llamada a la función fetchPersonaje con el id
                if (result.error) {
                    setError(result.error.message); // Manejo de errores en la respuesta
                } else {
                    // Establecer los datos del personaje en el estado
                    setPersonaje({
                        name: result.properties.name,
                        birth_year: result.properties.birth_year,
                        gender: result.properties.gender,
                        height: result.properties.height,
                        skin_color: result.properties.skin_color,
                        eye_color: result.properties.eye_color,
                        description: result.description
                    });
                }
            } catch (error) {
                console.error('Error al traer la data:', error); // Manejo de errores en la llamada fetch
                setError('Ocurrió un error al cargar datos, por favor intente nuevamente.'); // Establecer mensaje de error en el estado
            }
        };

        fetchData(); // Llamar a la función fetchData al montar el componente o cambiar el id
    }, [id]); // Dependencia del efecto useEffect en el id

    if (error) {
        return <div>Error: {error}</div>; // Mostrar mensaje de error si hay error
    }

    if (!personaje) {
        return <div>Loading...</div>; // Mostrar mensaje de carga mientras se obtienen los datos
    }

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-6'>
                    <img className="imagen-detalle img-fluid" src="https://fakeimg.pl/800x600" alt="Personaje" />
                </div>
                <div className='col-md-6'>
                    <h1 className="mb-4">{personaje.name}</h1> {/* nombre del personaje */}
                    <p>{personaje.description}</p> {/* descripción del personaje */}
                </div>
            </div>
            {/* Otras propiedades */}
            <div className='row mt-4'>
                <div className='col-md-2'>
                    <strong>Name:</strong>
                    <div>{personaje.name}</div> 
                </div>
                <div className='col-md-2'>
                    <strong>Gender:</strong>
                    <div>{personaje.gender}</div> 
                </div>
                <div className='col-md-2'>
                    <strong>Height:</strong>
                    <div>{personaje.height}</div> 
                </div>
                <div className='col-md-2'>
                    <strong>Skin Color:</strong>
                    <div>{personaje.skin_color}</div> 
                </div>
                <div className='col-md-2'>
                    <strong>Eye Color:</strong>
                    <div>{personaje.eye_color}</div> 
                </div>
            </div>
        </div>
    );
};

export default CharacterDetails;



