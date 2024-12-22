import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { IconContext } from 'react-icons';

// Show Install Prompt manually
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the default install prompt from appearing
    e.preventDefault
    // Save the event to trigger it later
    deferredPrompt = e;

    // Optionally, show a custom install button
    const installButton = document.getElementById('install-button');
    if (installButton) {
        installButton.style.display = 'block';  // Show the install button
        installButton.addEventListener('click', () => {
            // Show the install prompt
            deferredPrompt.prompt();

            // Wait for the user's response
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                deferredPrompt = null;
            });
        });
    }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <IconContext.Provider value={{ style: { verticalAlign: 'middle', marginBottom: "1px" } }}>
    <BrowserRouter>
      <App />
      </BrowserRouter>
    </IconContext.Provider>
  </React.StrictMode>,
)
