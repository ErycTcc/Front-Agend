import {
    Box,
    Button,
    Container,
    Stack,
    SvgIcon,
    Typography
} from '@mui/material';
import CustomersTable from './table';
import React, {
    memo,
    useState,
    useCallback,
    useEffect,
    useMemo,
} from 'react';

import { applyPagination } from 'src/utils/apply-pagination';
import { useAuthContext } from 'src/contexts/auth-context';

import PlusIcon from '@heroicons/react/24/solid/PlusIcon';

import { useSelection } from 'src/hooks/use-selection';
import { DEFAULT } from 'src/libs/global/constants';
import { http } from 'src/utils/http';

import BasicModal from './modal';
import Head from 'next/head';

const useCustomers = (data, page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(data, page, rowsPerPage);
      },
      [data, page, rowsPerPage]
    );
  };
  
  const useCustomerIds = (customers) => {
    return useMemo(
      () => {
        return customers.map((customer) => customer.id);
      },
      [customers]
    );
  };

const TableContainer = memo((props) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isOpen, setOpen] = useState(false);
    const [isModalUpdate, setModalUpdate] = useState(false);
    const [actualRow, setActualRow] = useState(props.defaultRow);
    const [list, setList] = useState([]);
    const [isUpdate, requestTableUpdate] = useState(false);
    const { user: { cpf } } = useAuthContext();

    const handlePageChange = useCallback(
        (event, value) => {
        setPage(value);
        },
        []
    );

    const handleRowsPerPageChange = useCallback(
        (event) => {
        setRowsPerPage(event.target.value);
        },
        []
    );

    const fetchData = useCallback(async () => {
        const res = await http(props.endpoint, { method: DEFAULT.METHOD.GET });
        setList(res.filter(item => item.cpf_medico === cpf));
    }, [http, setList]);

    useEffect(() => {
        fetchData();
    }, [isUpdate]);

    const customers = useCustomers(list, page, rowsPerPage);
    const customersIds = useCustomerIds(customers);
    const customersSelection = useSelection(customersIds);

    return (
        <>
        <Head>
            <title>
                {props.title} | Agend Kit
            </title>
        </Head>
        <Box
            component="main"
            sx={{
            flexGrow: 1,
            py: 8
            }}
        >
            <Container maxWidth="xl">
            <Stack spacing={3}>
                <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
                >
                <Stack spacing={1}>
                    <Typography variant="h4">
                        {props.title}
                    </Typography>
                </Stack>
                </Stack>
                <CustomersTable
                    count={list.length}
                    items={list}
                    onDeselectAll={customersSelection.handleDeselectAll}
                    onDeselectOne={customersSelection.handleDeselectOne}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    onSelectAll={customersSelection.handleSelectAll}
                    onSelectOne={customersSelection.handleSelectOne}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    selected={customersSelection.selected}
                    setModal={setOpen}
                    isActiveModal={isOpen}
                    onClickRow={setActualRow}
                    setUpdate={setModalUpdate}
                />
            </Stack>
            {
                isOpen &&
                <BasicModal
                    row={actualRow}
                    isActiveModal={isOpen}
                    setModal={setOpen}
                    isUpdate={isModalUpdate}
                    setUpdate={setModalUpdate}
                    endpoint={props.endpoint}
                    tableState={isUpdate}
                    tableAtt={requestTableUpdate}
                />
            }
            </Container>
        </Box>
        </>
    );
});

export default TableContainer;
