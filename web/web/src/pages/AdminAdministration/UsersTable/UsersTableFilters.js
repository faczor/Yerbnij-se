import { userRoles } from '../constantsAdministrations';

const statusOptions = Object.values(userRoles);

export const usersFilters = [
  {
    filterType: 'select',
    nameFilter: 'userRole',
    nameTable: 'adminUsers',
    label: 'Rola',
    placeholder: 'Wszystkie role',
    options: statusOptions,
  },
];
