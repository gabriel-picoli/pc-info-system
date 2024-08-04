import styled from 'styled-components'

const StyledSubtitle = styled.h1<{ $fontSize?: string }>`
   font-size: ${(props) => props.$fontSize || '40px'};
   font-weight: bold;
   color: ${(props) => props.theme.colors.black};
`

interface SubtitleProps {
   children: string
   $fontSize?: string
}

export default function Subtitle({ children, $fontSize }: SubtitleProps) {
   return <StyledSubtitle $fontSize={$fontSize}>{children}</StyledSubtitle>
}
