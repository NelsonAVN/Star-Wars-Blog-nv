import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Asegúrate de importar useNavigate
import { fetchPlanet  } from '../Utilidades/Fetch';
import FavoriteContext from '../../context/Context';

/**
 * Componente que muestra la tarjeta de un Planet.
 * 
 * Props:
 * - uid: Identificador único del Planet .
 */
function PlanetCard({ uid }) {
    const [Planet, setPlanet] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook de navegación
    const { favoriteaction } = useContext(FavoriteContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchPlanet (uid);
                if (result.error) {
                    setError(result.error.message);
                } else {
                    setPlanet({
                        name: result.properties.name,
                        diameter: result.properties.diameter,
                        population: result.properties.population,
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
        navigate(`/Planets/${uid}`); // Utiliza navigate para redirigir
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!Planet  ) {
        return <div>Loading...</div>;
    }

    return (
        <div className="card">
            <img src="https://fakeimg.pl/400x200" className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{Planet.name}</h5>
                <p className="card-text">
                    diameter: {Planet.diameter}<br />
                    population: {Planet.population}
                </p>
                <div className='d-flex justify-content-between'>
                    <button className="btn btn-white border-primary text-primary" onClick={handleLearnMore}>Learn More!</button>
                    <button className="btn btn-white border-warning text-warning" onClick={() => favoriteaction({ type: 'Add', payload: {name: Planet.name, uid} })}>
                        <i className="fa-regular fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PlanetCard;
