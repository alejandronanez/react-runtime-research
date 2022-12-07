import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const embeddedDOMNode = document.getElementById(
  'external-app-data',
) as HTMLElement;

const embeddedUrl = embeddedDOMNode.dataset.embeddedUrl as string;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App embeddedUrl={embeddedUrl} />
  </React.StrictMode>,
);
