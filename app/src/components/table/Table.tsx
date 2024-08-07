import styled from 'styled-components'

const TableContainer = styled.div`
   margin-top: 80px;
   border: 1px solid #ddd;
   border-radius: 4px;
   overflow: hidden;
`

const TableElement = styled.table`
   width: 100%;
   border-collapse: collapse;
`

const TableHeader = styled.thead`
   background-color: #f8f8f8;
   text-align: left;
`

const TableHeaderCell = styled.th`
   padding: 15px 10px;
   border-bottom: 1px solid #ddd;
`

const TableBody = styled.tbody``

const TableRow = styled.tr`
   &:nth-child(even) {
      background-color: #f2f2f2;
   }

   cursor: pointer;

   &:hover {
      background-color: #ddd;
   }
`

const TableCell = styled.td`
   padding: 15px 10px;
   border-bottom: 1px solid #ddd;
`

interface Column<T> {
   header: string
   accessor: keyof T
   format?: (value: T[keyof T]) => React.ReactNode
}

interface TableProps<T> {
   columns: Column<T>[]
   data: T[]
   onRowClick?: (row: T) => void
}

export default function Table<T>({ columns, data, onRowClick }: TableProps<T>) {
   return (
      <TableContainer>
         <TableElement>
            <TableHeader>
               <tr>
                  {columns.map((column, index) => (
                     <TableHeaderCell key={index}>{column.header}</TableHeaderCell>
                  ))}
               </tr>
            </TableHeader>
            <TableBody>
               {data.map((row, rowIndex) => (
                  <TableRow key={rowIndex} onClick={() => onRowClick && onRowClick(row)}>
                     {columns.map((column, colIndex) => (
                        <TableCell key={colIndex}>
                           {column.format ? column.format(row[column.accessor]) : String(row[column.accessor])}
                        </TableCell>
                     ))}
                  </TableRow>
               ))}
            </TableBody>
         </TableElement>
      </TableContainer>
   )
}
