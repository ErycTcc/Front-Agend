import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { DEFAULT } from 'src/libs/global/constants';
import TableContainer from 'src/components/tableContainer';

const Page = () => (
  <TableContainer
    defaultRow={{ id: 0, data: '', hora_inicio: '', hora_termino: '', cpf: '', agenda_id: 0 }}
    endpoint={DEFAULT.ENDPOINT.AGENDA_MEDICO}
    title="Agenda"
    isFilter={false}
  />
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
