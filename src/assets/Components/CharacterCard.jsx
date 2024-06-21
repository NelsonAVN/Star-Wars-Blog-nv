import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPersonaje } from '../Utilidades/Fetch';
import FavoriteContext from '../../context/Context';

/**
 * Componente que muestra la tarjeta de un personaje.
 * 
 * Props:
 * - uid: Identificador único del personaje.
 */
function CharacterCard({ uid }) {
    const [personaje, setPersonaje] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { favoriteaction } = useContext(FavoriteContext); // Asegúrate de que esto coincida con la forma en que se proporciona el contexto

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchPersonaje(uid);
                if (result.error) {
                    setError(result.error.message);
                } else {
                    setPersonaje({
                        name: result.properties.name,
                        gender: result.properties.gender,
                        eye_color: result.properties.eye_color,
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
        navigate(`/people/${uid}`);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!personaje) {
        return <div>Loading...</div>;
    }

    return (
        <div className="card">
            <img src="https://fakeimg.pl/400x200" className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{personaje.name}</h5>
                <p className="card-text">
                    Eye Color: {personaje.eye_color}<br />
                    Hair Color: {personaje.hair_color}<br />
                    Gender: {personaje.gender}
                </p>
                <div className='d-flex justify-content-between'>
                    <button className="btn btn-white border-primary text-primary" onClick={handleLearnMore}>Learn More!</button>
                    <button className="btn btn-white border-warning text-warning" onClick={() => favoriteaction({ type: 'Add', payload: {name: personaje.name, uid} })}>
                        <i className="fa-regular fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CharacterCard;