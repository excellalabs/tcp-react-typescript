import { TableCell, TableHead, TableRow, TableSortLabel, Theme, createStyles, makeStyles } from '@material-ui/core';

import { DataColumn } from './DataColumn.model';
import React from 'react';

type Order = 'asc' | 'desc';

const useStyles = makeStyles((theme: Theme) => {
    createStyles({
      visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
      }
    })
})

export const DataTableHeader: React.FC<{
  columns: DataColumn<any>[],
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  order: Order;
  orderBy: string;
}> = (columns, classes, onRequestSort, order, orderBy) => {

    return (
      <TableHead>
        <TableRow>
          {columns.map((column: DataColumn<any>) => (
            <TableCell
              key={column.id}
              align={column.numeric ? 'right' : 'left'}
              padding={column.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === column.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : 'asc'}
                onClick={createSortHandler(column.id)}
                >
                  {column.label}
                  {orderBy === column.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
}

export default DataTableHeader;
