import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { DEFAULT } from 'src/libs/global/constants';
import TableContainer from 'src/components/containers/medicos/container';

const Page = () => (
  <TableContainer
    defaultRow={{ cpf: '', nome: '', telefone: '', genero: '', crm: '', tipo_consulta_id: 0, usuario_sistema_id: 0, created_at: '', updated_at: '' }}
    endpoint={DEFAULT.ENDPOINT.MEDICO}
    title="Médicos"
    isFilter={false}
  />
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
