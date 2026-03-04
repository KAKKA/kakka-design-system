import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@kakka/tokens/css';
import '@kakka/react/css';
import './global.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
