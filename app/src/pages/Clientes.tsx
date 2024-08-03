/* eslint-disable @typescript-eslint/no-unused-vars */

import styled from 'styled-components'
import axios from 'axios'

import Title from '../components/tipography/Title'

const Body = styled.div`
   width: 100%;
   height: 100vh;
   background-color: rebeccapurple;
`

const Header = styled.div`
   display: flex;
   justify-content: space-between;
   padding: 30px 50px;
`

export default function Clientes() {
   return (
      <>
         <Header>
            <Title>Clientes</Title>
         </Header>
         <Body>
            
         </Body>
      </>
   )
}
