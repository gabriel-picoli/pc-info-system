import { Controller, Control, FieldValues } from 'react-hook-form'
import styled from 'styled-components'

const StyledInput = styled.input<{ $width?: string; $marginRight?: string }>`
   width: ${(props) => props.$width || '100%'};
   height: 45px;
   background-color: transparent;
   border: 2px solid #c1e3e3;
   border-radius: 5px;
   padding: 10px;
   font-size: 14px;
   color: ${(props) => props.theme.colors.black};
   margin-right: ${(props) => props.$marginRight || '0px'};
   outline: none;

   &::placeholder {
      color: #999;
   }
`

interface InputProps {
   name: string
   control: Control<FieldValues>
   defaultValue?: string
   width?: string
   marginRight?: string
   placeholder?: string
   value?: string
   type: string
   id: string
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({
   name,
   control,
   defaultValue = '',
   width,
   marginRight,
   placeholder,
   value,
   type,
   id,
   onChange,
}: InputProps) {
   return (
      <Controller
         name={name}
         control={control}
         defaultValue={defaultValue}
         render={({ field }) => (
            <StyledInput
               {...field}
               $width={width}
               $marginRight={marginRight}
               value={value}
               type={type}
               id={id}
               placeholder={placeholder}
               onChange={(e) => {
                  field.onChange(e)
                  if (onChange) {
                     onChange(e)
                  }
               }}
            />
         )}
      />
   )
}
