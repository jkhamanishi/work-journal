import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from './modules/app/components/App'

hydrateRoot(document.getElementById('root')!,
  <StrictMode>
    <App />
  </StrictMode>
);
