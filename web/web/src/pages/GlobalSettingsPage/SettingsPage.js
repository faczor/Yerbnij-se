import React from 'react';

import MainWrapper from 'components/atoms/MainWrapper';
import Title from 'components/atoms/Title';
import Settings from './Settings';

const SettingsPage = () => {

  return (
    <MainWrapper>
      <Title>Ustawienia</Title>
      <Settings />
    </MainWrapper>
  );
};

export default SettingsPage;
