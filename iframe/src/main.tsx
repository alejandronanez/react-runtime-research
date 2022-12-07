import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const embeddedDOMNode = document.getElementById('external-app-data');

if (!embeddedDOMNode) {
  throw new Error(
    "We're sorry, you need to have a node with ID `external-app-data`",
  );
}

const embeddedUrl = embeddedDOMNode.dataset.embeddedUrl as string;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App embeddedUrl={embeddedUrl} />
  </React.StrictMode>,
);
