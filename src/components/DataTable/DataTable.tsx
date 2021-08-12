import { Order, getComparator, stableSort } from './SortHelpers'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@material-ui/core'
import React, { ReactNode } from 'react'

import DataTableHeader from './DataTableHeader'
import { IBaseItem } from '../../models/BaseItem.interface'
import { useStyles } from './DataTable.styles'

export interface DataColumn<T extends IBaseItem> {
  propertyName: keyof T // must be the key on the data object
  headerLabel: string
  isNumeric: boolean // uses right justification for data when true
  renderer: (data: T) => string | number | JSX.Element | ReactNode
}

export type DataTableProps<T extends IBaseItem> = {
  columns: DataColumn<T>[]
  rows: T[]
  initialSortProperty: keyof T
}

/* eslint-disable max-lines-per-function */
export const DataTable = <T extends IBaseItem>(
  props: DataTableProps<T> & { children?: ReactNode }
): React.ReactElement => {
  const { columns, rows, initialSortProperty } = props

  const classes = useStyles()
  const [order, setOrder] = React.useState<Order>(Order.ASCENDING)
  const [orderBy, setOrderBy] = React.useState<keyof T>(initialSortProperty)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof T
  ) => {
    const isAsc = orderBy === property && order === Order.ASCENDING
    setOrder(isAsc ? Order.DESCENDING : Order.ASCENDING)
    setOrderBy(property)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <DataTableHeader<T>
              columns={columns}
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort<T>(rows, getComparator<T>(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: T) => (
                  <TableRow hover tabIndex={-1} key={row.id}>
                    {columns.map((column: DataColumn<T>, index: number) =>
                      index === 0 ? (
                        <TableCell
                          key={(column.propertyName as string) + index}
                          component="th"
                          id={`table-row-${row.id}`}
                          scope="row"
                          align="left"
                        >
                          {column.renderer(row)}
                        </TableCell>
                      ) : (
                        <TableCell
                          align={column.isNumeric ? 'right' : 'left'}
                          key={(column.propertyName as string) + index}
                        >
                          {column.renderer(row)}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}
/* eslint-enable max-lines-per-function */
