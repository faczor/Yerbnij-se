import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { api } from 'API';
import { toast } from 'react-toastify';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export const Button = styled.button`
  color: ${({ theme }) => theme.primaryLight};
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

const MenuCell = ({ row, menuItems, setMenuFunctions }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => setAnchorEl(null);

  const handleAddComment = () => {
    setMenuFunctions(prev => ({
      ...prev,
      addComment: true,
      currentRow: [row.id],
    }));
    setAnchorEl(null);
  };

  const handleRate = () => {
    setMenuFunctions(prev => ({
      ...prev,
      rate: true,
      currentRow: [row.id],
    }));
    setAnchorEl(null);
  };

  const handleAddFavourite = async () => {
    try {
      console.log(row.id)
      await api.changeFavourite(row.id);
      toast.success('Dodano do ulubionych');
    } catch (e) {
      toast.error('Wystąpił problem przy dodawaniu do ulubionych. Spróbuj później');
    }
    setAnchorEl(null);
  };

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
            {el.function === 'addComment' ? (
              <MenuButton onClick={handleAddComment}>
                {el.icon}
                {el.label}
              </MenuButton>
            ) : el.function === 'showOnPortal' ? (
              <MenuButton
                onClick={() => (window.location.href = row.offer.link)}
              >
                {el.icon}
                {el.label}
              </MenuButton>
            ) : el.function === 'addFavourite' ? (
              <MenuButton onClick={handleAddFavourite}>
                {el.icon}
                {el.label}
              </MenuButton>
            ) : el.function === 'details' ? (
              <MenuLink to={`/user/offer/${row.offer.id}`}>
                {el.icon}
                {el.label}
              </MenuLink>
            ) : (
              <MenuButton onClick={handleRate}>
                {el.icon}
                {el.label}
              </MenuButton>
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MenuCell;
