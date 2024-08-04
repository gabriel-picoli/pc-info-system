import styled from 'styled-components'

import Subtitle from '../tipography/Subtitle'

const CardContainer = styled.div`
   display: flex;
   flex-direction: column;
   box-shadow: 2px 8px 23px -3px rgba(0, 0, 0, 0.29);
   width: 340px;
   height: 260px;
   border-radius: 10px;
   padding: 15px;
   margin-bottom: 40px;
`
const Cpf = styled.p`
   font-size: 18px;
   margin-top: 10px;
`

const Phone = styled.p`
   font-size: 18px;
   margin-bottom: 30px;
`

const Address = styled.p`
   font-size: 18px;
`

interface CardProps {
   name: string
   phone: string
   cpf: string
   address: string
}

export default function Card({ name, phone, cpf, address }: CardProps) {
   return (
      <CardContainer>
         <Subtitle $fontSize="25px">{name}</Subtitle>
         <Cpf>{cpf}</Cpf>
         <Phone>{phone}</Phone>
         <Address>{address}</Address>
      </CardContainer>
   )
}
