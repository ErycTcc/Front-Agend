import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Box,
  Button,
  Card,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { formatarCPF } from 'src/libs/global/formatCPF';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import { Columns } from './columns';

const CustomersTable = ({
  count,
  items,
  onDeselectAll,
  onDeselectOne,
  onPageChange,
  onRowsPerPageChange,
  onSelectAll,
  onSelectOne,
  onClickRow,
  setModal,
  isActiveModal,
  page,
  rowsPerPage,
  selected,
  setUpdate,
}) => {
  const [keys, setRowKeys] = useState([]);

  useEffect(() => {
    if (items?.length > 0) setRowKeys(Object.keys(items[0]));
  }, [items]);

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <Columns />
            <TableBody>
              {items?.map((customer, index) => {
                const isSelected = selected.includes(customer[keys[0]]);
                return (
                  <TableRow
                    hover
                    key={index}
                    selected={isSelected}
                  >
                    <TableCell align='center'>{customer.agendas.descricao}</TableCell>
                    <TableCell align='center'>{formatarCPF(customer.cpf)}</TableCell>
                    <TableCell align='center'>{customer.data}</TableCell>
                    <TableCell align='center'>{customer.hora_inicio}</TableCell>
                    <TableCell align='center'>{customer.hora_termino}</TableCell>
                    <TableCell align='center'>
                      <Button
                        color="inherit"
                        startIcon={(
                          <SvgIcon fontSize="small">
                            <ArrowDownOnSquareIcon />
                          </SvgIcon>
                        )}
                        onClick={() => {
                          onClickRow(customer);
                          setModal(!isActiveModal);
                          setUpdate(true);
                        }}
                      >
                        Ver informações
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};

export default CustomersTable;
