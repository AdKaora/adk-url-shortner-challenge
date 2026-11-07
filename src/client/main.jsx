import React from 'react';
import { createRoot } from 'react-dom/client'; 
// uso il tema pronto senza css aggiuntivo
import 'primereact/resources/themes/lara-light-green/theme.css';
import 'primereact/resources/primereact.min.css';
import App from  './App.jsx';

// monto la pagina  div root
createRoot(document.getElementById('root')).render(<App/>);
