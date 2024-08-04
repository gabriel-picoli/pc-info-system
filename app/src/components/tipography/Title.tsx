import styled from 'styled-components'

const StyledTitle = styled.h1<{ $fontSize?: string }>`
   font-size: 60px;
   font-weight: bold;
   color: #333;
`

interface TitleProps {
   children: string
   $fontSize?: string
}

export default function Title({ children, $fontSize }: TitleProps) {
   return <StyledTitle $fontSize={$fontSize}>{children}</StyledTitle>
}
