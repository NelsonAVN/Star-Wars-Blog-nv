import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchVehicle } from '../Utilidades/Fetch';

const VehicleDetails = () => {
    const { id } = useParams(); // Obtener el id del URL
    const [Vehicle, setVehicle] = useState(null); // Estado para almacenar los datos del Vehicle
    const [error, setError] = useState(null); // Estado para manejar errores

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchVehicle(id); // Llamada a la función fetchVehicle con el id
                if (result.error) {
                    setError(result.error.message); // Manejo de errores en la respuesta
                } else {
                    // Establecer los datos del Vehicle en el estado
                    setVehicle({
                        name: result.properties.name,
                        model: result.properties.model,
                        vehicle_class: result.properties.vehicle_class,
                        length: result.properties.length,
                        crew: result.properties.crew,
                        passengers: result.properties.passengers,
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

    if (!Vehicle) {
        return <div>Loading...</div>; // Mostrar mensaje de carga mientras se obtienen los datos
    }

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-6'>
                    <img className="imagen-detalle img-fluid" src="https://fakeimg.pl/800x600" alt="Vehicle" />
                </div>
                <div className='col-md-6'>
                    <h1 className="mb-4">{Vehicle.name}</h1> {/* nombre del Vehicle */}
                    <p>{Vehicle.description}</p> {/* descripción del Vehicle */}
                </div>
            </div>
            {/* Otras propiedades */}
            <div className='row mt-4'>
                <div className='col-md-2'>
                    <strong>Name:</strong>
                    <div>{Vehicle.name}</div> 
                </div>
                <div className='col-md-2'>
                    <strong>Vehicle_class:</strong>
                    <div>{Vehicle.vehicle_class}</div> 
                </div>
                <div className='col-md-2'>
                    <strong>Length:</strong>
                    <div>{Vehicle.length}</div> 
                </div>
                <div className='col-md-2'>
                    <strong>Crew:</strong>
                    <div>{Vehicle.crew}</div> 
                </div>
                <div className='col-md-2'>
                    <strong>Passengers:</strong>
                    <div>{Vehicle.passengers}</div> 
                </div>
            </div>
        </div>
    );
};

export default VehicleDetails;



