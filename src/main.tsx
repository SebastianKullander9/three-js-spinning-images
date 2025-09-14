import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Canvas3d from './3d/canvas/Canvas3d'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Canvas3d />
  </StrictMode>,
)
