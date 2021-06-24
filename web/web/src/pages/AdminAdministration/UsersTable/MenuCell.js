import React, { useState } from 'react';
import styled from 'styled-components';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { Button } from 'components/shared/MenuInTable';

export const MenuButton = styled.button`
  display: flex;
  align-items: center;
  font-family: 'Open Sans', sans-serif;
  width: 100%;
  height: 100%;
  padding: 5px 20px;
  color: ${({ theme }) => theme.primary};
  background: none;
  border: none;

  svg {
    margin-right: 10px;
  }

  :hover {
    color: ${({ theme }) => theme.secondary};
  }
`;

const MenuCell = ({ row, menuItems, handleOpenModal }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Button
        type='button'
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={e => setAnchorEl(e.currentTarget)}
      >
        <MoreVertIcon style={{ color: '#888794' }} />
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuItems.map(el => (
          <MenuItem key={el.label} style={{ padding: 0 }}>
            <MenuButton onClick={() => handleOpenModal(row, el.function)}>
              {el.icon}
              {el.label}
            </MenuButton>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MenuCell;
