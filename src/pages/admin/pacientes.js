import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { applyPagination } from 'src/utils/apply-pagination';
import BasicModal from 'src/components/modal';
import { DEFAULT } from 'src/libs/global/constants';
import { http } from 'src/utils/http';

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

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isOpen, setOpen] = useState(false);
  const [isModalUpdate, setModalUpdate] = useState(false);
  const defaultRow = { cpf: 0, nome: '', telefone: '', genero: '', idade: '', peso: 0.0, altura: 0.0, cod_sus: 0, prontuario_id: 0, endereco_id: 0, usuario_sistema_id: 0, created_at: '', updated_at: '' };
  const [actualRow, setActualRow] = useState(defaultRow);
  const [list, setList] = useState([]);
  const [isUpdate, requestTableUpdate] = useState(false);

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
    setList(await http(DEFAULT.ENDPOINT.PACIENTE, { method: DEFAULT.METHOD.GET }));
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
          Pacientes | Agend Kit
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
                  Pacientes
                </Typography>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  onClick={() => {
                    setOpen(!isOpen);
                    setActualRow(defaultRow);
                    setModalUpdate(false);
                  }}
                  variant="contained"
                >
                  Cadastrar
                </Button>
              </div>
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
              endpoint={DEFAULT.ENDPOINT.PACIENTE}
              tableState={isUpdate}
              tableAtt={requestTableUpdate}
            />
          }
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
