import { scan } from 'react-scan'
/* import { StrictMode } from 'react' */
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'



scan({ enabled: false })

createRoot(document.getElementById('root')!).render(
  /* <StrictMode> */

  <App />
  /* </StrictMode>, */
)
