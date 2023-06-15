import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { DEFAULT } from 'src/libs/global/constants';
import TableContainer from 'src/components/containers/especializacao/container';

const Page = () => (
  <TableContainer
    defaultRow={{ id: 0, descricao: '', created_at: '', updated_at: '' }}
    endpoint={DEFAULT.ENDPOINT.ESPECIALIZACAO}
    title="Especializações"
    isFilter={false}
  />
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
