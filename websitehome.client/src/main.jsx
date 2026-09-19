import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { getPageMetadata } from './content/seo.js'

const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
)

const root = document.getElementById('root')
// Unknown URLs share a generic 404 document; their nav state can differ from
// the build-time /404 location, so mount those instead of hydrating that tree.
if (root.hasChildNodes() && getPageMetadata(window.location.pathname).canonical) {
    hydrateRoot(root, app)
} else {
    createRoot(root).render(app)
}
