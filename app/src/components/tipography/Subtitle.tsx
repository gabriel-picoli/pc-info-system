import styled from 'styled-components'

const StyledTitle = styled.h1`
   font-size: 35px;
   font-weight: bold;
   color: #333;
`

interface SubtitleProps {
   children: string
}

export default function Subtitle({ children }: SubtitleProps) {
   return <StyledTitle>{children}</StyledTitle>
}
