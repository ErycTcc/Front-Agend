import React, { useEffect, useState, useCallback } from 'react';
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
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import { Columns } from './columns';
import { DEFAULT } from 'src/libs/global/constants';
import { http } from 'src/utils/http';

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
  const [getEspecialidades, setEspecialidades] = useState({});
  
  const fetchEspecialidade = useCallback(async () => {
    const res = await http(DEFAULT.ENDPOINT.FUNCOES, { method: DEFAULT.METHOD.GET });
    let obj = {};
    res?.forEach(item => {
      obj[item.id] = item.descricao;
    });
    if (res?.length > 0) setEspecialidades(obj);
  }, [setEspecialidades]);
  
  useEffect(() => {
    if (items?.length > 0) setRowKeys(Object.keys(items[0]));
    fetchEspecialidade().catch(() => console.log('Erro ao buscar especialidades.'));
  }, [items, fetchEspecialidade]);

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
                    <TableCell align='center'>{customer.email}</TableCell>
                    <TableCell align='center'>{customer.cpf}</TableCell>
                    <TableCell align='center'>
                      {getEspecialidades[customer.tipo_usuarios_id] || 'Carregando...'}
                    </TableCell>
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
