import { Routes, Route } from 'react-router-dom'

import { ThemeProvider } from 'styled-components'
import theme from './global/theme'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import GlobalStyle from './global/GlobalStyle'

import Home from './pages/HomePage'
import Clientes from './pages/ClientsPage'
import Servicos from './pages/ServicesPage'

export default function App() {
   return (
      <>
         <ThemeProvider theme={theme}>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/clientes" element={<Clientes />} />
               <Route path="/servicos" element={<Servicos />} />
            </Routes>

            <ToastContainer position="bottom-left" autoClose={3000} newestOnTop={false} closeOnClick pauseOnHover />
            <GlobalStyle />
         </ThemeProvider>
      </>
   )
}
