import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';

const embeddedDOMNode = document.getElementById('external-app-data');

if (!embeddedDOMNode) {
  throw new Error(
    "We're sorry, you need to have a node with ID `external-app-data`",
  );
}

const embeddedUrl = embeddedDOMNode.dataset.embeddedUrl as string;
const embeddedSuccessEvent = embeddedDOMNode.dataset.successEvent as string;
const embeddedCancelEvent = embeddedDOMNode.dataset.cancelEvent as string;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <App
        embeddedUrl={embeddedUrl}
        embeddedSuccessEvent={embeddedSuccessEvent}
        embeddedCancelEvent={embeddedCancelEvent}
      />
    </Router>
  </React.StrictMode>,
);
