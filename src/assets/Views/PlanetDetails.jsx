import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPlanet } from '../Utilidades/Fetch';

const PlanetDetails = () => {
    const { id } = useParams(); // Obtener el id del URL
    const [Planet, setPlanet] = useState(null); // Estado para almacenar los datos del Planet
    const [error, setError] = useState(null); // Estado para manejar errores

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchPlanet(id); // Llamada a la función fetchPlanet con el id
                if (result.error) {
                    setError(result.error.message); // Manejo de errores en la respuesta
                } else {
                    // Establecer los datos del Planet en el estado
                    setPlanet({
                        name: result.properties.name,
                        gravity: result.properties.gravity,
                       climate: result.properties.Planet_class,
                        terrain: result.properties.terrain,
                        orbital_period: result.properties.orbital_period,
                        surface_water: result.properties.surface_water,
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

    if (!Planet) {
        return <div>Loading...</div>; // Mostrar mensaje de carga mientras se obtienen los datos
    }

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-6'>
                    <img className="imagen-detalle img-fluid" src="https://fakeimg.pl/800x600" alt="Planet" />
                </div>
                <div className='col-md-6'>
                    <h1 className="mb-4">{Planet.name}</h1> {/* nombre del Planet */}
                    <p>{Planet.description}</p> {/* descripción del Planet */}
                </div>
            </div>
            {/* Otras propiedades */}
            <div className='row mt-4'>
                <div className='col-md-2'>
                    <strong>Name:</strong>
                    <div>{Planet.name}</div> 
                </div>
                <div className='col-md-2'>
                    <strong>Rotation period:</strong>
                    <div>{Planet.rotation_period}</div> 
                </div>
                <div className='col-md-2'>
                    <strong>Terrain:</strong>
                    <div>{Planet.terrain}</div> 
                </div>
                <div className='col-md-2'>
                    <strong>Orbital period:</strong>
                    <div>{Planet.orbital_period}</div> 
                </div>
                <div className='col-md-2'>
                    <strong>surface_water:</strong>
                    <div>{Planet.surface_water}</div> 
                </div>
            </div>
        </div>
    );
};

export default PlanetDetails;



