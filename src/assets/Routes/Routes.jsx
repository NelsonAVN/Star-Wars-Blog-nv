import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../../App';
import CharacterDetails from '../Views/CharacterDetails';
import VehicleDetails from '../Views/VehicleDetails';
import PlanetDetails from '../Views/PlanetDetails';
 //Componente de configuración de rutas
export const Enrutador = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* acá van las rutas */}
                <Route element={<App />} path="/" />
                <Route element={<CharacterDetails />} path="/people/:id" />
                <Route elemetn={ <PlanetDetails/>} path="/planets/:id" />
                <Route element={<VehicleDetails/>} path="/vehicles/:id" />
            </Routes>
        </BrowserRouter>
    );
};
