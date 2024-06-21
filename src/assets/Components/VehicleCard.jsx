import React, { useEffect, useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom'; // Asegúrate de importar useNavigate
import { fetchVehicle  } from '../Utilidades/Fetch';
import FavoriteContext from '../../context/Context';

/**
 * Componente que muestra la tarjeta de un Vehicle.
 * 
 * Props:
 * - uid: Identificador único del Vehicle .
 */
function VehicleCard({ uid }) {
    const [Vehicle, setVehicle] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook de navegación
    const { favoriteaction } = useContext(FavoriteContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchVehicle (uid);
                if (result.error) {
                    setError(result.error.message);
                } else {
                    setVehicle({
                        name: result.properties.name,
                        model: result.properties.model,
                        crew: result.properties.crew,
                    });
                }
            } catch (error) {
                console.error('Error al traer la data:', error);
                setError('Ocurrió un error al cargar datos, por favor intente nuevamente.');
            }
        };

        fetchData();
    }, [uid]);

    const handleLearnMore = () => {
        navigate(`/vehicles/${uid}`); // Utiliza navigate para redirigir
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!Vehicle  ) {
        return <div>Loading...</div>;
    }

    return (
        <div className="card">
            <img src="https://fakeimg.pl/400x200" className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{Vehicle.name}</h5>
                <p className="card-text">
                    Model: {Vehicle.model}<br />
                    Crew: {Vehicle.crew}
                </p>
                <div className='d-flex justify-content-between'>
                    <button className="btn btn-white border-primary text-primary" onClick={handleLearnMore}>Learn More!</button>
                    <button className="btn btn-white border-warning text-warning" onClick={() => favoriteaction({ type: 'Add', payload: {name: Vehicle.name, uid} })}>
                        <i className="fa-regular fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VehicleCard;
