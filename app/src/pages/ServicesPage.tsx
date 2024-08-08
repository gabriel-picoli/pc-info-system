/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { format } from 'date-fns'

import Title from '../components/tipography/Title'
import Button from '../components/inputs/Button'
import Modal from '../components/modal/Modal'
import Input from '../components/inputs/Input'
import Table from '../components/table/Table'

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

interface Service {
   descricao: string
   data: string
   valor: number
   clienteId: number
}

interface Client {
   id: number
   nome: string
}

export default function Servicos() {
   const [services, setServices] = useState<Service[]>([])
   const [clients, setClients] = useState<Client[]>([])
   const [showModal, setShowModal] = useState<boolean>(false)
   const [searchTerm, setSearchTerm] = useState<string>('')
   const [selectedService, setSelectedService] = useState<Service | null>(null)

   const { handleSubmit, control, reset, register } = useForm()

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

   const handleRowClick = (service: Service) => {
      setSelectedService(service)
      setShowModal(true)
   }

   const fetchServices = async () => {
      try {
         const response = await axios.get('http://localhost:8080/servico/listar')
         console.log('Dados recebidos da API:', response.data)
         setServices(response.data)
      } catch (error) {
         console.error('Erro ao buscar serviços:', error)
      }
   }

   const fetchClients = async () => {
      try {
         const response = await axios.get('http://localhost:8080/cliente/listar')
         setClients(response.data)
      } catch (error) {
         console.error('erro ao buscar clientes:', error)
      }
   }

   const saveService = async (data: any) => {
      try {
         const response = await axios.post('http://localhost:8080/servico/cadastrar', data)
         fetchServices()
         handleCloseModal()
         console.log(response.data)
      } catch (error) {
         console.error('erro ao salvar serviço:', error)
      }
   }

   function formatDate(date: Date | string): string {
      const d = typeof date === 'string' ? new Date(date) : date

      if (isNaN(d.getTime())) {
         return ''
      }

      return format(d, 'dd/MM/yyyy')
   }

   useEffect(() => {
      fetchServices()
      fetchClients()
   }, [])

   const filteredServices = services.filter((service) => {
      const searchTermLower = searchTerm.toLowerCase()
      return (
         service.descricao.toLowerCase().includes(searchTermLower) ||
         service.data.toLowerCase().includes(searchTermLower) ||
         service.clienteId
      )
   })

   const columns = [
      { header: 'Descrição', accessor: 'descricao' as keyof Service },
      { header: 'Data', accessor: 'data' as keyof Service, format: (value: any) => formatDate(value) },
      { header: 'Valor', accessor: 'valor' as keyof Service, format: (value: any) => `R$ ${value.toFixed(2)}` },
   ]

   return (
      <>
         <Container>
            <Header>
               <Title>Serviços</Title>
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
                  placeholder="Pesquisar serviços"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  width="400px"
               />
            </Row>

            {filteredServices.length > 0 ? (
               <Table columns={columns} data={filteredServices} onRowClick={handleRowClick} />
            ) : (
               <Alert>Nenhum serviço cadastrado.</Alert>
            )}

            {showModal && (
               <Modal isOpen onClose={handleCloseModal} title="Cadastrar serviço" width="1000px">
                  <Form onSubmit={handleSubmit(saveService)}>
                     <Row>
                        <Input
                           name="descricao"
                           control={control}
                           type="text"
                           id="descricao"
                           placeholder="Descrição do serviço"
                           width="600px"
                        />
                        <Input name="data" control={control} type="date" id="data" placeholder="Data do serviço" width="300px" />
                        <Input name="valor" control={control} type="number" id="valor" placeholder="Valor" width="300px" />
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
