import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { DEFAULT } from 'src/libs/global/constants';
import TableContainer from 'src/components/containers/pacientes/container';

const Page = () => (
  <TableContainer
    defaultRow={{ cpf: '', nome: '', telefone: '', genero: '', idade: '', peso: 0.0, altura: 0.0, cod_sus: 0, prontuario_id: 0, usuario_sistema_id: 0, created_at: '', updated_at: '' }}
    endpoint={DEFAULT.ENDPOINT.PACIENTE}
    title="Pacientes"
    isFilter={false}
  />
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
