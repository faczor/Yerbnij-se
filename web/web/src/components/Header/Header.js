import React, { useEffect, useState } from 'react';

import ImgLogo from 'assets/logo.png';
import useWindowSize from 'hooks/useWindowSize';
import { device } from '../../styles/device';

import * as S from './Header.css';
import { Link, NavLink } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { role } from 'auth/constans';
import { routes } from '../../routes';
import useAuth from '../../auth/useAuth';
import theme from '../../styles/theme';

import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import SettingsIcon from '@material-ui/icons/Settings';
import LockIcon from '@material-ui/icons/Lock';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GavelIcon from '@material-ui/icons/Gavel';

const iconColors = theme.navActive;

const menuItemsListAdmin = [
  {
    label: 'Dashboard',
    to: routes.admin.home,
    icon: <DashboardIcon style={{ color: iconColors }} />,

  },
  {
    label: 'Administracja',
    to: routes.admin.administration,
    icon: <GavelIcon style={{ color: iconColors }} />,

  },
  {
    label: 'Ustawienia',
    to: '/admin/settings',
    icon: <SettingsIcon style={{ color: iconColors }} />,
  },
];

const menuItemsListUser = [
  {
    label: 'Produkty',
    to: routes.user.home,
    icon: <ShoppingBasketIcon style={{ color: iconColors }} />,
  },
  {
    label: 'Ustawienia',
    to: routes.user.settings,
    icon: <SettingsIcon style={{ color: iconColors }} />,
  },
];

const Header = () => {
  const { logout } = useAuth();
  const [items, setItems] = useState();
  const { user } = useSelector(state => state.auth);
  const [width] = useWindowSize();
  useEffect(() => {
    if (user?.role === role.admin) {
      setItems(menuItemsListAdmin);
    } else {
      setItems(menuItemsListUser);
    }
  }, [user]);

  const menuItems = items?.map(item => (
    <S.NavList key={item.to}>
      <NavLink to={item.to} exact>
        {width > device.mobileM && (
          <>
            {item.icon}
          </>
        )}
        {item.label}

      </NavLink>
    </S.NavList>
  ));

  const logOutClick = () => {
    logout();
  };

  return (
    <S.Wrapper>
      {width > device.mobileL && (
        <Link to='/'>
          <img src={ImgLogo} alt='Logo' />
        </Link>
      )}
      <S.Items>
        {menuItems}
      </S.Items>
      <S.Logout onClick={logOutClick}>
        {width > device.mobileM && (
          <LockIcon style={{ color: iconColors }} />
        )}
        <a>Wyloguj się</a>
      </S.Logout>
    </S.Wrapper>
  );
};

export default Header;
