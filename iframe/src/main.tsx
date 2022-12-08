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
const embeddedSuccessRoute = embeddedDOMNode.dataset.successRoute as string;
const embeddedCancelRoute = embeddedDOMNode.dataset.cancelRoute as string;
const embeddedResetRoute = embeddedDOMNode.dataset.resetRoute as string;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <App
        embeddedUrl={embeddedUrl}
        embeddedSuccessRoute={embeddedSuccessRoute}
        embeddedCancelRoute={embeddedCancelRoute}
        embeddedResetRoute={embeddedResetRoute}
      />
    </Router>
  </React.StrictMode>,
);
