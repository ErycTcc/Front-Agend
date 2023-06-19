import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { DEFAULT } from 'src/libs/global/constants';
import TableContainer from 'src/components/containers/consultas_agendadas/container';

const Page = () => (
  <TableContainer
    defaultRow={{ id: 0, agendamento: '', descricao: '', status: '', cpf_paciente: '', cpf_medico: 0, created_at: '', updated_at: '' }}
    endpoint={DEFAULT.ENDPOINT.CONSULTA}
    title="Consultas"
    isFilter={false}
  />
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
