/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from 'react'

import styled from 'styled-components'
import { useForm } from 'react-hook-form'

import Title from '../components/tipography/Title'
import Button from '../components/inputs/Button'
import Modal from '../components/modal/Modal'
import Input from '../components/inputs/Input'
import Table from '../components/table/Table' // Importe o componente Table

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
   description: string
   date: string // Alterado para string, já que a data será formatada
}

export default function Servicos() {
   const [services, setServices] = useState<Service[]>([])
   const [showModal, setShowModal] = useState<boolean>(false)
   const [searchTerm, setSearchTerm] = useState<string>('')
   const [selectedService, setSelectedService] = useState<Service | null>(null)

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

   const handleRowClick = (service: Service) => {
      setSelectedService(service)
      setShowModal(true)
   }

   const saveService = (data: any) => {
      // Simulando a adição de um novo serviço
      setServices((prevServices) => [...prevServices, data])
      handleCloseModal()
   }

   const filteredServices = services.filter((service) => service.description.toLowerCase().includes(searchTerm.toLowerCase()))

   const columns = [
      { header: 'Descrição', accessor: 'description' as keyof Service },
      { header: 'Data', accessor: 'date' as keyof Service, format: (value: string) => new Date(value).toLocaleDateString() },
      { header: 'Valor', accessor: 'value' as keyof Service },
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
                           name="description"
                           control={control}
                           type="text"
                           id="description"
                           placeholder="Descrição do serviço"
                           width="600px"
                        />
                        <Input name="date" control={control} type="date" id="date" placeholder="Data do serviço" width="300px" />
                        <Input name="value" control={control} type="number" id="value" placeholder="Valor" width="300px" />
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
