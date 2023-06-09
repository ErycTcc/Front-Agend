import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { DEFAULT } from 'src/libs/global/constants';
import TableContainer from 'src/components/tableContainer';

const Page = () => (
  <TableContainer
    defaultRow={{ id: 0, email: '', senha: '', cpf: '', tipo_usuarios_id: '', created_at: '', updated_at: '' }}
    endpoint={DEFAULT.ENDPOINT.USUARIO}
    title="Usuários"
    isFilter={false}
  />
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
