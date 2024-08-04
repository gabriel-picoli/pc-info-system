/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState, useEffect } from 'react'

import styled from 'styled-components'
import axios from 'axios'

import Title from '../components/tipography/Title'
import Button from '../components/inputs/Button'
import Card from '../components/cards/Card'

const Container = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   padding: 50px 150px;
`

const Header = styled.div`
   display: flex;
   justify-content: space-between;
   margin-bottom: 60px;
`

const Row = styled.div`
   display: flex;
   justify-content: space-between;
`

const CardContainer = styled.div`
   display: flex;
   flex-wrap: wrap;
   margin-top: 60px;
   gap: 30px;
`

const Alert = styled.p`
   font-size: 23px;
`

interface Clientes {
   nome: string
   telefone: string
   cpf: string
   endereco: string
   bairro: string
   numero: number
   complemento: string
}

export default function Clientes() {
   const [clientes, setClientes] = useState<Clientes[]>([])

   const listarClientes = async () => {
      try {
         const response = await axios.get('http://localhost:8080/cliente/listar')

         setClientes(response.data)
      } catch (error) {
         console.error('erro ao buscar clientes:', error)
      }
   }

   useEffect(() => {
      listarClientes()
   }, [])

   return (
      <>
         <Container>
            <Header>
               <Title>Clientes</Title>
            </Header>

            <Row>
               <Button type="button">Cadastrar novo</Button>
               <input type="text" placeholder="pesquisar" />
            </Row>
            <CardContainer>
               {clientes.length > 0 ? (
                  clientes.map((cliente, index) => (
                     <Card
                        key={index}
                        name={cliente.nome}
                        phone={cliente.telefone}
                        cpf={cliente.cpf}
                        address={`${cliente.endereco}, ${cliente.bairro} - ${cliente.numero}, (${cliente.complemento})`}
                     />
                  ))
               ) : (
                  <Alert>Nenhum cliente cadastrado.</Alert>
               )}
            </CardContainer>
         </Container>
      </>
   )
}
