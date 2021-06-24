import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import CreateIcon from '@material-ui/icons/Create';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

export const menuSwitches = {
  CREATE: 'CREATE',
  USERS: 'USERS',
  SCRAPPER: 'SCRAPPER'
};

export const menuSwitchesValues = [
  { type: 'CREATE', label: 'Stwórz nowe konto' },
  { type: 'USERS', label: 'Zarządządzaj użytkownikami' },
  { type: 'SCRAPPER', label: 'Wymuś uruchomienie scrapera'}
];

export const userRoles = {
  ADMIN: {
    label: 'Administrator',
    value: 'ADMIN',
  },
  USER: {
    label: 'Użytkownik',
    value: 'USER',
  },
  NOT_VERIFIED: {
    label: 'Niezweryfikowany',
    value: 'NOT_VERIFIED',
  },
};

export const menuItems = [
  {
    icon: <CheckIcon />,
    label: 'Aktywuj użytkownika',
    function: 'activateUser',
    notVisible: 'NOT_VERIFIED',
  },
  {
    icon: <CreateIcon />,
    label: 'Zmień adres email',
    function: 'emailChange',
    always: true,
  },
  {
    icon: <CreateIcon />,
    label: 'Zmień hasło',
    function: 'passwordChange',
    always: true,
  },
  {
    icon: <RotateLeftIcon />,
    label: 'Zresetuj hasło',
    function: 'resetPassword',
    always: true,
  },
  {
    icon: <SupervisorAccountIcon />,
    label: 'Zmień rolę',
    function: 'roleChange',
    always: true,
  },
  {
    icon: <CancelIcon />,
    label: 'Usuń użytkownika',
    function: 'deleteUser',
    always: true,
  },
];

export const userRolesSelect = [
  {
    label: 'Administrator',
    value: 'ADMIN',
  },
  {
    label: 'Użytkownik',
    value: 'USER',
  },
];
