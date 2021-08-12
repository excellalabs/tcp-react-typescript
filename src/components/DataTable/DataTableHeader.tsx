import React, { ReactNode } from 'react'
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core'

import { DataColumn } from './DataTable'
import { IBaseItem } from '../../models/BaseItem.interface'
import { Order } from './SortHelpers'
import { useStyles } from './DataTable.styles'

type DataTableHeaderProps<T> = {
  columns: DataColumn<any>[]
  classes: ReturnType<typeof useStyles>
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void
  order: Order
  orderBy: keyof T
}

export function DataTableHeader<T extends IBaseItem>(
  props: DataTableHeaderProps<T> & { children?: ReactNode }
) {
  const { columns, classes, onRequestSort, order, orderBy } = props

  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHead>
      <TableRow>
        {columns.map((column: DataColumn<T>, idx) => (
          <TableCell
            key={(column.propertyName as string) + idx}
            align={column.isNumeric ? 'right' : 'left'}
            // padding={column.disablePadding ? "none" : "default"}
            sortDirection={orderBy === column.propertyName ? order : false}
          >
            <TableSortLabel
              active={orderBy === column.propertyName}
              direction={
                orderBy === column.propertyName ? order : Order.ASCENDING
              }
              onClick={createSortHandler(column.propertyName as keyof T)}
            >
              {column.headerLabel}
              {orderBy === column.propertyName ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default DataTableHeader
