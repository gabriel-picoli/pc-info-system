/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useForm } from 'react-hook-form'

import Title from '../components/tipography/Title'
import Button from '../components/inputs/Button'
import Modal from '../components/modal/Modal'
import Input from '../components/inputs/Input'
import Table from '../components/table/Table'

import { insertMaskInCpf } from '../functions/cpf'
import { insertMaskInPhone } from '../functions/phone'

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

const Alert = styled.p`
   font-size: 23px;
   margin-top: 80px;
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
   const [showModal, setShowModal] = useState<boolean>(false)
   const [searchTerm, setSearchTerm] = useState<string>('')
   const [selectedClient, setSelectedClient] = useState<Clients | null>(null)

   const { handleSubmit, control, reset } = useForm()

   const handleOpenModal = () => {
      setShowModal(true)
   }

   const handleCloseModal = () => {
      setShowModal(false)
      reset()
   }

   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value)
   }

   const handleRowClick = (client: Clients) => {
      setSelectedClient(client)
      setShowModal(true)
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

   const filteredClients = clients.filter((client) => {
      const searchTermLower = searchTerm.toLowerCase()
      return (
         client.nome.toLowerCase().includes(searchTermLower) ||
         client.telefone.toLowerCase().includes(searchTermLower) ||
         client.cpf.toLowerCase().includes(searchTermLower)
      )
   })
   const columns = [
      { header: 'Nome', accessor: 'nome' as keyof Clients },
      {
         header: 'Telefone',
         accessor: 'telefone' as keyof Clients,
         format: (value: any) => `${insertMaskInPhone(value)}`,
      },
      {
         header: 'CPF',
         accessor: 'cpf' as keyof Clients,
         format: (value: any) => `${insertMaskInCpf(value)}`,
      },
      { header: 'Endereço', accessor: 'endereco' as keyof Clients },
      { header: 'Bairro', accessor: 'bairro' as keyof Clients },
      { header: 'Número', accessor: 'numero' as keyof Clients },
      { header: 'Complemento', accessor: 'complemento' as keyof Clients },
   ]

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
               <Input
                  name="search"
                  id="search"
                  type="text"
                  control={control}
                  placeholder="Pesquisar"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  width="400px"
               />
            </Row>

            {filteredClients.length > 0 ? (
               <Table<Clients> columns={columns} data={filteredClients} onRowClick={handleRowClick} />
            ) : (
               <Alert>Nenhum cliente cadastrado.</Alert>
            )}

            {showModal && (
               <Modal isOpen onClose={handleCloseModal} title="Cadastrar cliente" width="1000px">
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
                           placeholder="Endereço do cliente"
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
                           placeholder="Complemento"
                           width="300px"
                        />
                     </Row>

                     <ButtonContainer>
                        <Button type="reset" cancel onClick={handleCloseModal} width="150px">
                           Cancelar
                        </Button>
                        <Button type="submit" width="150px">
                           Cadastrar
                        </Button>
                     </ButtonContainer>
                  </Form>
               </Modal>
            )}
         </Container>
      </>
   )
}
