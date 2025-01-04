import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './modules/app/components/App'

export function render() {
  const html = renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
  return { html }
}
