import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useAuth from 'auth/useAuth';
import { routes } from 'routes';
import Indicator from 'components/atoms/Indicator';
import { role } from 'auth/constans';

const HeaderMenu = () => {
  const { user } = useSelector(state => state.auth);
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async () => {
    setAnchorEl(null);
    logout();
  };

  const handleCloseMenu = async () => {
    setAnchorEl(null);
  };

  return (
    <>
      {!user ? (
        <Indicator />
      ) : (
        <div>
          <ArrowDropDownIcon
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
          />
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            style={{
              marginTop: '20px',
              marginLeft: '-50px',
            }}
          >
            <Link
              to={
                user?.role === role.user
                  ? routes.user.settings
                  : routes.admin.settings
              }
              style={{ textDecoration: 'none' }}
            >
              <MenuItem onClick={handleCloseMenu}>Ustawienia</MenuItem>
            </Link>
            <MenuItem onClick={handleClose}>Wyloguj się</MenuItem>
          </Menu>
        </div>
      )}
    </>
  );
};

export default HeaderMenu;
