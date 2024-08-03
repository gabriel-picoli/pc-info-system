import styled from 'styled-components'

const StyledTitle = styled.h1`
   font-size: 60px;
   font-weight: bold;
   color: #333;
`

interface TitleProps {
   children: string
}

export default function Title({ children }: TitleProps) {
   return <StyledTitle>{children}</StyledTitle>
}
