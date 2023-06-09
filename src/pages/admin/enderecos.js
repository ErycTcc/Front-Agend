import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { DEFAULT } from 'src/libs/global/constants';
import TableContainer from 'src/components/tableContainer';

const Page = () => (
  <TableContainer
    defaultRow={{ id: 0, pais: '', estado: '', cidade: '', bairro: '', rua: '', numero: 0, created_at: '', updated_at: '' }}
    endpoint={DEFAULT.ENDPOINT.ENDERECO}
    title="Endereços"
    isFilter={false}
  />
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
