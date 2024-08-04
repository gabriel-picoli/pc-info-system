import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
    }

    body{
        width: 100wh;
        height: 100vh;
        background-color: ${(props) => props.theme.colors.white};

    }
`

export default GlobalStyle
