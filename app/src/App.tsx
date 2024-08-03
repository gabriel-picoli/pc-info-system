import { Routes, Route } from 'react-router-dom'

import { ThemeProvider } from 'styled-components'
import theme from './global/theme'

import GlobalStyle from './global/GlobalStyle'

import Home from './pages/Home'

export default function App() {
   return (
      <>
         <ThemeProvider theme={theme}>
            <Routes>
               <Route path="/" element={<Home />} />
            </Routes>

            <GlobalStyle />
         </ThemeProvider>
      </>
   )
}
