import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import App from './App';
import * as serviceWorker from './serviceWorker';

Sentry.init({
  dsn: "https://1b65bd2d81d34ee78856796d1c12c251@o472302.ingest.sentry.io/5505728",
  integrations: [
    new Integrations.BrowserTracing(),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
