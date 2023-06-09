import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { DEFAULT } from 'src/libs/global/constants';
import TableContainer from 'src/components/tableContainer';

const Page = () => (
  <TableContainer
    defaultRow={{ id: 0, descricao: '' }}
    endpoint={DEFAULT.ENDPOINT.AGENDA}
    title="Agendas"
    isFilter={false}
  />
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
