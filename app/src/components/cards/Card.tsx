import styled from 'styled-components'

import Subtitle from '../tipography/Subtitle'

import { insertMaskInCpf } from '../../functions/cpf'
import { insertMaskInPhone } from '../../functions/phone'

const CardContainer = styled.div`
   display: flex;
   flex-direction: column;
   box-shadow: 2px 8px 23px -3px rgba(0, 0, 0, 0.29);
   width: 340px;
   height: 260px;
   border-radius: 10px;
   padding: 20px;
   margin-bottom: 40px;
   transition: transform 0.3s ease, box-shadow 0.3s ease;
   cursor: pointer;

   &:hover {
      transform: translateY(-10px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
   }
`

const Phone = styled.p`
   margin-top: 10px;
   font-size: 18px;
`

const Cpf = styled.p`
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
   onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

export default function Card({ name, phone, cpf, address, onClick }: CardProps) {
   return (
      <CardContainer onClick={onClick}>
         <Subtitle $fontSize="25px">{name}</Subtitle>
         <Phone>{insertMaskInPhone(phone)}</Phone>
         <Cpf>{insertMaskInCpf(cpf)}</Cpf>
         <Address>{address}</Address>
      </CardContainer>
   )
}
