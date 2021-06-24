import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import CreateAccount from 'pages/AdminAdministration/CreateAccount/CreateAccount';
import UsersTable from './UsersTable/UsersTable';
import MainWrapper from 'components/atoms/MainWrapper';
import TableMenu from 'components/tables/TableMenu';
import Title from 'components/atoms/Title';
import Scraper from 'pages/AdminAdministration/ScraperTable/Scraper';

import {
  menuSwitches,
  menuSwitchesValues,
} from './constantsAdministrations';
import { role } from 'auth/constans';

const AdministrationPage = () => {
  const auth = useSelector(state => state.auth);
  const [currentBookmark, setCurrentBookmark] = useState(
    menuSwitches.CREATE,
  );

  const horizontalMenu = {
    currentType: currentBookmark,
    onClick: value => setCurrentBookmark(value),
    buttons: menuSwitchesValues,
  };

  const renderBookmark = () => {
    // eslint-disable-next-line default-case
    switch (currentBookmark) {
      case menuSwitches.CREATE:
        if (auth?.user?.role === role.admin) return <CreateAccount />;
        break;
      case menuSwitches.USERS:
        if (auth?.user?.role === role.admin) return <UsersTable />;
        break;
      case menuSwitches.SCRAPPER:
        if (auth?.user?.role === role.admin) return <Scraper />;
        break;
    }
  };

  return (
    <MainWrapper>
      <Title>Administracja</Title>
      <TableMenu {...horizontalMenu} staticPos />
      {renderBookmark()}
    </MainWrapper>
  );
};

export default AdministrationPage;
