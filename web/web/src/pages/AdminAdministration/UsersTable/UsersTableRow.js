import React from 'react';
import { Td, Tr } from 'react-super-responsive-table';

import { userRoles, menuItems } from '../constantsAdministrations';
import MenuCell from './MenuCell';

const UsersTableRow = ({ row, cols, handleOpenModal }) => {
  const cells = Object.entries(row).map(([, cell], idx) => (
    <Td >
      {cols[idx]?.fieldName !== 'role' && cell}
      {cols[idx]?.fieldName === 'role' && userRoles[cell]?.label}
    </Td>
  ));

  return (
    <Tr>
      {cells}
      <Td>
        <MenuCell
          row={row}
          menuItems={menuItems.filter(
            el => el.notVisible === row.role || el.always
          )}
          handleOpenModal={handleOpenModal}
        />
      </Td>
    </Tr>
  );
};

export default UsersTableRow;
