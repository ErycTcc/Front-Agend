import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Produtividade',
    path: '/admin',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Médicos',
    path: '/admin/medicos',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Pacientes',
    path: '/admin/pacientes',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Endereços',
    path: '/admin/enderecos',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Especializações',
    path: '/admin/especializacoes',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Prontuários',
    path: '/admin/prontuarios',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Funções',
    path: '/admin/funcoes',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Consultas',
    path: '/personal',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Minha agenda',
    path: '/colab',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  },
  // {
  //   title: 'Login',
  //   path: '/auth/login',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <LockClosedIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Register',
  //   path: '/auth/register',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserPlusIcon />
  //     </SvgIcon>
  //   )
  // },
  {
    title: 'Sair',
    path: '/auth/login',
    icon: (
      <SvgIcon fontSize="small">
        <XCircleIcon />
      </SvgIcon>
    )
  }
];
