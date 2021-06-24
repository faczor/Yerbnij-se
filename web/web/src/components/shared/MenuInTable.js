import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export const Button = styled.button`
  color: ${({ theme }) => theme.primary};
  display: flex;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: 0.3s;

  :hover {
    transform: scale(1.05);
  }

  svg {
    margin-right: 10px;
  }
`;

export const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 5px 20px;
  color: ${({ theme }) => theme.primary};

  svg {
    margin-right: 10px;
  }
`;

const MenuCell = ({ menuItems, rowId }) => {
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
            <MenuLink to={`${el.to}/${rowId}`}>
              {el.icon}
              {el.label}
            </MenuLink>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MenuCell;
