import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { SearchProvider } from "./SearchContext";


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <SearchProvider>
    <App />
  </SearchProvider>
  </BrowserRouter >
)