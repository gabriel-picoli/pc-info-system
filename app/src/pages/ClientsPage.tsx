/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState, useEffect } from 'react'

import styled from 'styled-components'
import axios from 'axios'
import { useForm } from 'react-hook-form'

import Title from '../components/tipography/Title'
import Button from '../components/inputs/Button'
import Card from '../components/cards/Card'
import Modal from '../components/modal/Modal'
import Input from '../components/inputs/Input'

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

const Form = styled.form`
   display: flex;
   flex-direction: column;
   gap: 20px;
   margin-top: 20px;
`

const ButtonContainer = styled.div`
   display: flex;
   justify-content: flex-end;
   gap: 10px;
   margin-top: 20px;
`

interface Clients {
   nome: string
   telefone: string
   cpf: string
   endereco: string
   bairro: string
   numero: number
   complemento: string
}

export default function Clientes() {
   const [clients, setClients] = useState<Clients[]>([])
   const [showModal, setShowModal] = useState<boolean>()

   const { handleSubmit, control, reset } = useForm()

   const handleOpenModal = () => {
      setShowModal(true)
   }
   const handleCloseModal = () => {
      setShowModal(false)
      reset()
   }

   const fetchClients = async () => {
      try {
         const response = await axios.get('http://localhost:8080/cliente/listar')

         setClients(response.data)
      } catch (error) {
         console.error('erro ao buscar clientes:', error)
      }
   }

   const saveClients = async (data: any) => {
      try {
         const response = await axios.post('http://localhost:8080/cliente/cadastrar', data)
         fetchClients()
         handleCloseModal()
         console.log(response.data)
      } catch (error) {
         console.error('erro ao salvar cliente:', error)
      }
   }

   useEffect(() => {
      fetchClients()
   }, [])

   return (
      <>
         <Container>
            <Header>
               <Title>Clientes</Title>
            </Header>

            <Row>
               <Button type="button" onClick={handleOpenModal}>
                  Cadastrar novo
               </Button>
               <input type="text" placeholder="pesquisar" />
            </Row>
            <CardContainer>
               {clients.length > 0 ? (
                  clients.map((client, index) => (
                     <Card
                        key={index}
                        name={client.nome}
                        phone={client.telefone}
                        cpf={client.cpf}
                        address={`${client.endereco}, ${client.bairro} - ${client.numero}, ${client.complemento}`}
                     />
                  ))
               ) : (
                  <Alert>Nenhum cliente cadastrado.</Alert>
               )}
            </CardContainer>
            {showModal && (
               <Modal isOpen onClose={handleCloseModal} title="Cadastro de cliente" width="1000px">
                  <Form onSubmit={handleSubmit(saveClients)}>
                     <Row>
                        <Input name="nome" control={control} type="text" id="nome" placeholder="Nome do cliente" width="600px" />
                        <Input name="cpf" control={control} type="text" id="cpf" placeholder="CPF do cliente" width="300px" />
                     </Row>
                     <Row>
                        <Input
                           name="telefone"
                           control={control}
                           type="tel"
                           id="telefone"
                           placeholder="Telefone do cliente"
                           width="300px"
                        />
                        <Input
                           name="endereco"
                           control={control}
                           type="text"
                           id="endereco"
                           placeholder="Endereco do cliente"
                           width="600px"
                        />
                     </Row>
                     <Row>
                        <Input name="bairro" control={control} type="text" id="bairro" placeholder="Bairro" width="400px" />
                        <Input name="numero" control={control} type="number" id="numero" placeholder="Número" width="150px" />
                        <Input
                           name="complemento"
                           control={control}
                           type="text"
                           id="complemento"
                           placeholder="Complemento "
                           width="300px"
                        />
                     </Row>

                     <ButtonContainer>
                        <Button type="reset" cancel onClick={handleCloseModal}>
                           Cancelar
                        </Button>
                        <Button type="submit">Cadastrar</Button>
                     </ButtonContainer>
                  </Form>
               </Modal>
            )}
         </Container>
      </>
   )
}
