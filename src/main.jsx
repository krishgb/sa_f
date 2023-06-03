import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from '@/ui/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <ChakraProvider theme={theme} toastOptions={{ defaultOptions: { position: 'top' } }}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Router>
        <App />
      </Router>
    </ChakraProvider>
  </>
);
