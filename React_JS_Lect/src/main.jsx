// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
// // import './index.css'
// import App from './App.jsx'
// import C,{ Context } from './Context.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Context>
//     <App/>
//     </Context>
    
//   </StrictMode>,
// )
// import { StrictMode } from 'react'
// import Context from './Context.jsx'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Context.Provider value="hello,">
//   <App/>
//   </Context.Provider>
    
//   </StrictMode>
// )
// lect_13
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ContextProvider } from './Context'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <ContextProvider>
<BrowserRouter>
<App />
</BrowserRouter>
  // </ContextProvider>
)

