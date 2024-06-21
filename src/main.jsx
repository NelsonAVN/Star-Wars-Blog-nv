import React from 'react';
import { createRoot } from 'react-dom/client';
import { Enrutador } from './assets/Routes/Routes.jsx'; //importar el enrutador
import { ContexProvider } from './context/Context.jsx';

createRoot(document.getElementById('root')).render(
  <ContexProvider>
 
    <Enrutador> {/* envoltura del enrutador */}
   

   
    </Enrutador>
 
  </ContexProvider>
  
  
);

